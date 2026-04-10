import { useState, useCallback, useEffect, useRef } from 'react';

// ── Inline localStorage pref (device-specific, not in Firestore) ──
function useLocalPref(key, initial) {
  const [val, setVal] = useState(() => {
    try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : initial; }
    catch { return initial; }
  });
  const set = useCallback((v) => {
    const next = typeof v === 'function' ? v(val) : v;
    setVal(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* ignore */ }
  }, [key, val]);
  return [val, set];
}

// ── Strip markdown / corrections for natural speech ──
function cleanForSpeech(text) {
  return text
    .replace(
      /\[CORRECTION:\s*"([^"]+)"\s*→\s*"([^"]+)"\s*\|\s*Rule:\s*([^\]]+)\]/gi,
      (_, wrong, correct, rule) =>
        `I noticed a mistake. You said "${wrong}". The correct form is: "${correct}". ${rule.trim()}.`
    )
    .replace(/\[PROGRESS NOTE:[^\]]+\]/gi, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
    .replace(/[\u2600-\u27BF]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Pick best voice ──
function getBestVoice(accent) {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  const lang = accent || 'en-US';
  return (
    voices.find(v => v.lang === lang && /google|microsoft/i.test(v.name) && !v.localService) ||
    voices.find(v => v.lang === lang && !v.localService) ||
    voices.find(v => v.lang === lang) ||
    voices.find(v => v.lang.startsWith('en')) ||
    null
  );
}

/**
 * useVoice — TTS with configurable accent + speed.
 * Settings stored in localStorage (device-specific).
 */
export function useVoice() {
  const [isMuted, setIsMuted] = useLocalPref('meg_voice_muted', false);
  const [accent]              = useLocalPref('meg_voice_accent', 'en-US');
  const [speed]               = useLocalPref('meg_voice_speed', 0.88);
  const [volume]              = useLocalPref('meg_voice_volume', 0.9);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const isMutedRef = useRef(isMuted);
  useEffect(() => { isMutedRef.current = isMuted; }, [isMuted]);

  // Pre-load voices
  useEffect(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.getVoices();
    const handler = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.addEventListener('voiceschanged', handler);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', handler);
  }, []);

  useEffect(() => {
    return () => { window.speechSynthesis?.cancel(); };
  }, []);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (isMutedRef.current) return;

    const cleaned = cleanForSpeech(text);
    if (!cleaned) return;

    const utter  = new SpeechSynthesisUtterance(cleaned);
    utter.lang   = accent || 'en-US';
    utter.rate   = typeof speed === 'number' ? speed : 0.88;
    utter.pitch  = 1.05;
    utter.volume = typeof volume === 'number' ? Math.min(1, Math.max(0, volume)) : 0.9;

    const voice = getBestVoice(accent);
    if (voice) utter.voice = voice;

    utter.onstart = () => setIsSpeaking(true);
    utter.onend   = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utter);
  }, [accent, speed, volume]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleMute = useCallback(() => {
    const next = !isMutedRef.current;
    setIsMuted(next);
    if (next) { window.speechSynthesis?.cancel(); setIsSpeaking(false); }
  }, [setIsMuted]);

  return { speak, stop, isSpeaking, isMuted, toggleMute };
}
