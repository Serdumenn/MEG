const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

const ALLOWED_ORIGINS = [
  'https://serdumenn.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

const ALLOWED_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash',
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Worker-Token',
  };
}

function jsonError(status, message, origin) {
  return new Response(
    JSON.stringify({ error: { code: status, message } }),
    { status, headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) } },
  );
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return jsonError(405, 'Method not allowed', origin);
    }

    // Verify shared secret to block non-browser direct calls
    const token = request.headers.get('X-Worker-Token');
    if (!env.WORKER_TOKEN || token !== env.WORKER_TOKEN) {
      return jsonError(401, 'Unauthorized', origin);
    }

    if (!env.GEMINI_API_KEY) {
      return jsonError(500, 'Server misconfigured', origin);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return jsonError(400, 'Invalid JSON body', origin);
    }

    // Validate model against whitelist
    const model = body.model || 'gemini-2.5-flash';
    if (!ALLOWED_MODELS.includes(model)) {
      return jsonError(400, `Model not allowed: ${model}`, origin);
    }

    const { model: _model, ...geminiBody } = body;
    const geminiUrl = `${GEMINI_BASE}/${model}:streamGenerateContent?alt=sse&key=${env.GEMINI_API_KEY}`;

    let geminiResponse;
    try {
      geminiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody),
      });
    } catch (err) {
      return jsonError(502, 'Gemini API unreachable', origin);
    }

    // Stream the Gemini response back to the frontend
    return new Response(geminiResponse.body, {
      status: geminiResponse.status,
      headers: {
        'Content-Type': geminiResponse.headers.get('Content-Type') ?? 'text/event-stream',
        'Cache-Control': 'no-store',
        ...corsHeaders(origin),
      },
    });
  },
};
