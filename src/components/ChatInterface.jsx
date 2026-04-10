import { useState, useRef, useEffect, useCallback } from 'react';
import { useAI } from '../hooks/useAI';
import { useVoice } from '../hooks/useVoice';
import { showToast } from './Toast';
import './ChatInterface.css';

// ── Markdown + correction renderer ───────────────────────────
function renderMarkdown(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(
      /\[CORRECTION:\s*"([^"]+)"\s*→\s*"([^"]+)"\s*\|\s*Rule:\s*([^\]]+)\]/gi,
      (_, wrong, correct, rule) =>
        `<div class="correction-box">
          <div class="corr-row">
            <span class="corr-wrong">✗ "${wrong}"</span>
            <span class="corr-arrow">→</span>
            <span class="corr-correct">✓ "${correct}"</span>
          </div>
          <div class="corr-rule">💡 ${rule.trim()}</div>
        </div>`
    )
    .replace(/\n/g, '<br />');
}

// ── Parse [CORRECTION:...] blocks from AI text ────────────────
function extractCorrections(text) {
  const regex = /\[CORRECTION:\s*"([^"]+)"\s*→\s*"([^"]+)"\s*\|\s*Rule:\s*([^\]]+)\]/gi;
  const results = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    results.push({ wrong: match[1], correct: match[2], rule: match[3].trim() });
  }
  return results;
}

// ── Speech Recognition singleton ─────────────────────────────
const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

/**
 * ChatInterface — reusable AI chat component.
 *
 * Props:
 *   systemPrompt      string     — AI system prompt
 *   topicId           string?    — for error tracking context
 *   headerContent     node?      — content in header bar
 *   emptyContent      node?      — content when no messages
 *   suggestedPrompts  string[]   — starter chips shown when empty
 *   onErrorExtracted  function?  — called with array of errors on each response
 *   onMessageSent     function?  — called each time user sends a message
 */
export default function ChatInterface({
  systemPrompt,
  topicId,
  headerContent,
  emptyContent,
  suggestedPrompts = [],
  onErrorExtracted,
  onMessageSent,
}) {
  const [messages, setMessages] = useState([]);
  const { sendMessage, isStreaming } = useAI();
  const voice = useVoice();

  const [input, setInput]             = useState('');
  const [streamingText, setStream]    = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');

  const bottomRef      = useRef(null);
  const textareaRef    = useRef(null);
  const recognitionRef = useRef(null);
  const messagesRef    = useRef(messages);

  useEffect(() => { messagesRef.current = messages; }, [messages]);

  // Init SpeechRecognition
  useEffect(() => {
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.continuous      = false;
    rec.interimResults  = true;
    rec.lang            = 'en-US';
    rec.maxAlternatives = 1;

    rec.onresult = (event) => {
      const results    = Array.from(event.results);
      const transcript = results.map(r => r[0].transcript).join('');
      const isFinal    = results[results.length - 1].isFinal;
      if (isFinal) {
        setInterimText('');
        setIsListening(false);
        if (transcript.trim()) { setInput(''); doSend(transcript.trim()); }
      } else {
        setInterimText(transcript);
      }
    };

    rec.onspeechend = () => rec.stop();
    rec.onend  = () => { setIsListening(false); setInterimText(''); };
    rec.onerror = (e) => {
      setIsListening(false);
      setInterimText('');
      if (e.error === 'not-allowed') showToast('Mikrofon izni reddedildi.', 'error', 4000);
      else if (e.error !== 'aborted' && e.error !== 'no-speech') showToast(`Mikrofon hatası: ${e.error}`, 'warning');
    };

    recognitionRef.current = rec;
    return () => { try { rec.abort(); } catch { /* ignore */ } };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  // Stop speaking on unmount
  useEffect(() => {
    return () => { voice.stop(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doSend = useCallback((text) => {
    if (!text.trim() || isStreaming) return;
    voice.stop();

    const userMsg      = { role: 'user', content: text };
    const nextMessages = [...messagesRef.current, userMsg];
    setMessages(nextMessages);
    setStream('');
    onMessageSent?.();

    let accumulated = '';

    sendMessage({
      messages: nextMessages,
      systemPrompt,
      onDelta: (chunk) => {
        accumulated += chunk;
        setStream(accumulated);
      },
      onDone: (fullText) => {
        setStream('');
        setMessages(prev => [...prev, { role: 'assistant', content: fullText }]);
        voice.speak(fullText);

        // Extract errors and notify parent
        const corrections = extractCorrections(fullText);
        if (corrections.length > 0 && onErrorExtracted) {
          onErrorExtracted(corrections.map(c => ({ ...c, topicId })));
        }
      },
      onError: (err) => {
        setStream('');
        if (err.type === 'quota_exceeded') {
          showToast('Bugünlük limit doldu, yarın devam et 🌙', 'warning', 5000);
        } else if (err.type === 'rate_limit') {
          showToast('İstek limiti aşıldı. Biraz bekleyip tekrar deneyin.', 'warning');
        } else if (err.type === 'network_error') {
          showToast('Bağlantı hatası. İnternet bağlantınızı kontrol edin.', 'error');
        } else {
          showToast(`Hata: ${err.message}`, 'error');
        }
      },
    });
  }, [isStreaming, sendMessage, systemPrompt, topicId, voice, onErrorExtracted, onMessageSent]);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    doSend(text);
  }, [input, doSend]);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function toggleMic() {
    if (!SpeechRecognition) {
      showToast('Bu tarayıcıda konuşma tanıma desteklenmiyor.', 'warning', 4000);
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setInterimText('');
    } else {
      voice.stop();
      setInput('');
      setInterimText('');
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch {
        showToast('Mikrofon başlatılamadı. Tekrar deneyin.', 'error');
      }
    }
  }

  function toggleMute() {
    voice.toggleMute();
    showToast(voice.isMuted ? 'Ses açıldı' : 'Ses kapatıldı', 'info', 2000);
  }

  function handleNewChat() {
    voice.stop();
    setMessages([]);
    setStream('');
    setInput('');
    setInterimText('');
  }

  const voiceSupported = !!SpeechRecognition;

  return (
    <div className="chat-interface">
      {/* Header */}
      <div className="chat-header">
        <div className="chat-header-left">
          {headerContent}
        </div>
        <div className="chat-header-actions">
          {voice.isSpeaking && (
            <button className="btn btn-ghost btn-sm voice-indicator" onClick={voice.stop} title="Konuşmayı durdur">
              <span style={{ animation: 'pulse 0.8s ease infinite' }}>🔊</span>
              <span style={{ fontSize: 'var(--text-xs)' }}>Durdur</span>
            </button>
          )}
          <button
            className={`btn btn-ghost btn-sm mute-btn ${voice.isMuted ? 'muted' : ''}`}
            onClick={toggleMute}
            title={voice.isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
          >
            {voice.isMuted ? '🔇' : '🔊'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={handleNewChat} title="Yeni konuşma başlat">
            ↺
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {messages.length === 0 && !isStreaming && (
          <div className="chat-empty">
            {emptyContent || (
              <p className="text-muted" style={{ textAlign: 'center', fontSize: 'var(--text-sm)' }}>
                {voiceSupported
                  ? 'Yazın veya mikrofona dokunarak konuşun. MEG dilbilgisinizi düzeltecek.'
                  : 'İngilizce yazın. MEG dilbilgisinizi düzeltecek.'}
              </p>
            )}
            {suggestedPrompts.length > 0 && (
              <div className="suggested-prompts">
                {suggestedPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    className="suggested-chip"
                    onClick={() => { setInput(prompt); textareaRef.current?.focus(); }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            {msg.role === 'assistant' && <div className="msg-avatar">M</div>}
            <div
              className="msg-bubble"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }}
            />
            {msg.role === 'user' && <div className="msg-avatar user-avatar">Sen</div>}
          </div>
        ))}

        {isStreaming && (
          <div className="message assistant">
            <div className="msg-avatar">M</div>
            <div className="msg-bubble streaming">
              {streamingText
                ? <span dangerouslySetInnerHTML={{ __html: renderMarkdown(streamingText) }} />
                : <div className="typing-indicator">
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
              }
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Interim speech display */}
      {isListening && (
        <div className="interim-display">
          <span className="interim-pulse" />
          <span className="interim-text">{interimText || 'Dinleniyor…'}</span>
        </div>
      )}

      {/* Input area */}
      <div className="chat-input-area">
        <div className="chat-input-box">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            value={isListening ? interimText : input}
            onChange={e => !isListening && setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isListening ? 'Dinleniyor… konuşun'
              : voiceSupported ? 'Yazın veya mikrofona dokunun… (Göndermek için Enter)'
              : 'İngilizce yazın… (Göndermek için Enter)'
            }
            disabled={isStreaming || isListening}
            rows={1}
            readOnly={isListening}
          />
          {voiceSupported && (
            <button
              className={`mic-btn ${isListening ? 'listening' : ''}`}
              onClick={toggleMic}
              disabled={isStreaming}
              title={isListening ? 'Dinlemeyi durdur' : 'Cevabınızı söyleyin'}
            >
              {isListening ? <MicActiveIcon /> : <MicIcon />}
            </button>
          )}
          <button
            className={`send-btn ${isStreaming ? 'loading' : ''}`}
            onClick={handleSend}
            disabled={isStreaming || isListening || !input.trim()}
            title="Gönder"
          >
            {isStreaming ? '…' : '↑'}
          </button>
        </div>
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="8"  y1="22" x2="16" y2="22"/>
    </svg>
  );
}

function MicActiveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
      stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" strokeWidth="2"/>
      <line x1="12" y1="19" x2="12" y2="22" strokeWidth="2"/>
      <line x1="8"  y1="22" x2="16" y2="22" strokeWidth="2"/>
    </svg>
  );
}
