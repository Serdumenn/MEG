import { useGemini } from './useGemini';

/**
 * AI provider abstraction — now Gemini-only.
 * Kept as a thin wrapper for ChatInterface compatibility.
 */
export function useAI() {
  const gemini = useGemini();

  return {
    ...gemini,
    provider: 'gemini',
    providerName: 'Gemini',
  };
}
