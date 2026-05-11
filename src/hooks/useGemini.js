import { useState, useCallback, useRef } from 'react';

const GEMINI_MODEL = 'gemini-2.5-flash';
const WORKER_URL   = import.meta.env.VITE_WORKER_URL;
const WORKER_TOKEN = import.meta.env.VITE_WORKER_TOKEN;

const MAX_RETRIES   = 2;
const RETRY_DELAYS  = [1000, 3000]; // ms between retries

export function useGemini() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError]             = useState(null);
  const abortRef                      = useRef(null);

  const sendMessage = useCallback(async ({
    messages,
    systemPrompt,
    onDelta,
    onDone,
    onError,
    onRetry,
  }) => {
    if (!WORKER_URL) {
      const err = { type: 'no_key', message: 'Proxy URL yapılandırılmamış.' };
      setError(err);
      onError?.(err);
      return;
    }

    setIsStreaming(true);
    setError(null);
    abortRef.current = new AbortController();

    const contents = messages.slice(-40).map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const requestBody = JSON.stringify({
      model: GEMINI_MODEL,
      contents,
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
    });

    const headers = { 'content-type': 'application/json' };
    if (WORKER_TOKEN) headers['X-Worker-Token'] = WORKER_TOKEN;

    let attempt = 0;

    while (attempt <= MAX_RETRIES) {
      try {
        const response = await fetch(WORKER_URL, {
          method: 'POST',
          signal: abortRef.current.signal,
          headers,
          body: requestBody,
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          const apiErr  = errBody.error || {};
          let type = 'api_error';

          if (response.status === 400 || response.status === 403) type = 'invalid_key';
          if (response.status === 401) type = 'unauthorized';
          if (response.status === 429) {
            type = (apiErr.message || '').toLowerCase().includes('quota')
              ? 'quota_exceeded' : 'rate_limit';
          }
          if (response.status === 502 || response.status === 503) {
            type = 'service_unavailable';
          }

          // Retry on transient server errors (502/503)
          if (type === 'service_unavailable' && attempt < MAX_RETRIES) {
            attempt++;
            onRetry?.(attempt);
            await new Promise(r => setTimeout(r, RETRY_DELAYS[attempt - 1]));
            continue;
          }

          const err = { type, message: apiErr.message || `HTTP ${response.status}`, status: response.status };
          setError(err);
          onError?.(err);
          setIsStreaming(false);
          return;
        }

        // Successful response — stream it
        const reader  = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer    = '';
        let fullText  = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split('\n\n');
          buffer = events.pop();

          for (const event of events) {
            const dataLine = event.split('\n').find(l => l.startsWith('data: '));
            if (!dataLine) continue;
            const raw = dataLine.slice(6).trim();
            if (raw === '[DONE]') continue;

            try {
              const data  = JSON.parse(raw);
              const parts = data?.candidates?.[0]?.content?.parts;
              if (parts && parts.length > 0) {
                const chunk = parts[0].text || '';
                if (chunk) { fullText += chunk; onDelta?.(chunk); }
              }
            } catch { /* skip malformed chunk */ }
          }
        }

        onDone?.(fullText);
        return; // success — exit loop

      } catch (err) {
        if (err.name === 'AbortError') {
          setIsStreaming(false);
          return;
        }
        // Network failure — retry if attempts remain
        if (attempt < MAX_RETRIES) {
          attempt++;
          onRetry?.(attempt);
          await new Promise(r => setTimeout(r, RETRY_DELAYS[attempt - 1]));
          continue;
        }
        const wrapped = { type: 'network_error', message: err.message };
        setError(wrapped);
        onError?.(wrapped);
        break;
      }
    }

    setIsStreaming(false);
  }, []);

  const abort = useCallback(() => {
    abortRef.current?.abort();
    setIsStreaming(false);
  }, []);

  return { sendMessage, isStreaming, error, abort };
}
