const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

// Allow requests from the deployed app and local dev
const ALLOWED_ORIGINS = [
  'https://serdumenn.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    if (!env.GEMINI_API_KEY) {
      return new Response('Worker secret GEMINI_API_KEY is not set', { status: 500 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response('Invalid JSON body', { status: 400 });
    }

    // Extract model from body (not a Gemini API field — used only to build the URL)
    const model = body.model || 'gemini-2.0-flash-lite';
    const { model: _model, ...geminiBody } = body;

    const geminiUrl = `${GEMINI_BASE}/${model}:streamGenerateContent?alt=sse&key=${env.GEMINI_API_KEY}`;

    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(geminiBody),
    });

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
