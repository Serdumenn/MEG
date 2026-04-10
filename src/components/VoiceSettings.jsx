import { useState, useEffect, useCallback } from 'react';
import './VoiceSettings.css';

const ACCENT_OPTIONS = [
  { value: 'en-US', label: 'Amerikan İngilizcesi', flag: 'US' },
  { value: 'en-GB', label: 'İngiliz İngilizcesi',  flag: 'GB' },
  { value: 'en-AU', label: 'Avustralya İngilizcesi', flag: 'AU' },
];

// Inline pref — voice settings stay in localStorage (device-specific)
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

export default function VoiceSettings() {
  const [accent, setAccent] = useLocalPref('meg_voice_accent', 'en-US');
  const [speed,  setSpeed]  = useLocalPref('meg_voice_speed',  0.88);
  const [volume, setVolume] = useLocalPref('meg_voice_volume', 0.9);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (!window.speechSynthesis) return;
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('en')));
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
  }, []);

  function handlePreview() {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const samples = {
      'en-US': 'Hello! You are doing great with your English practice today.',
      'en-GB': 'Brilliant work! Your English is improving quite nicely.',
      'en-AU': "Good on ya! Your English practice is coming along really well.",
    };
    const utter     = new SpeechSynthesisUtterance(samples[accent] || samples['en-US']);
    utter.lang      = accent;
    utter.rate      = speed;
    utter.pitch     = 1.05;
    utter.volume    = typeof volume === 'number' ? Math.min(1, Math.max(0, volume)) : 0.9;
    const all       = window.speechSynthesis.getVoices();
    const voice     =
      all.find(v => v.lang === accent && /google|microsoft/i.test(v.name) && !v.localService) ||
      all.find(v => v.lang === accent && !v.localService) ||
      all.find(v => v.lang === accent) ||
      all.find(v => v.lang.startsWith('en'));
    if (voice) utter.voice = voice;
    window.speechSynthesis.speak(utter);
  }

  const voiceCount  = (lang) => voices.filter(v => v.lang === lang).length;
  const speedLabel  = speed  < 0.7 ? 'Yavaş' : speed  < 1.0 ? 'Normal' : speed  < 1.3 ? 'Hızlı' : 'Çok Hızlı';
  const volumeLabel = volume < 0.3 ? 'Sessiz' : volume < 0.7 ? 'Orta' : 'Yüksek';

  return (
    <div className="voice-settings">
      <div className="voice-field">
        <label className="voice-label">Aksan</label>
        <div className="accent-options">
          {ACCENT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`accent-btn ${accent === opt.value ? 'active' : ''}`}
              onClick={() => setAccent(opt.value)}
            >
              <span className="accent-flag">{opt.flag}</span>
              <span className="accent-name">{opt.label}</span>
              <span className="accent-count">{voiceCount(opt.value)} ses</span>
            </button>
          ))}
        </div>
      </div>

      <div className="voice-field">
        <label className="voice-label">
          Hız: <span className="slider-value">{speed.toFixed(2)}x</span>
          <span className="slider-tag">{speedLabel}</span>
        </label>
        <input type="range" className="voice-slider" min="0.5" max="1.5" step="0.05"
          value={speed} onChange={e => setSpeed(parseFloat(e.target.value))} />
        <div className="slider-labels"><span>0.5x</span><span>1.0x</span><span>1.5x</span></div>
      </div>

      <div className="voice-field">
        <label className="voice-label">
          Ses Düzeyi: <span className="slider-value">{Math.round(volume * 100)}%</span>
          <span className="slider-tag">{volumeLabel}</span>
        </label>
        <input type="range" className="voice-slider" min="0" max="1" step="0.05"
          value={volume} onChange={e => setVolume(parseFloat(e.target.value))} />
        <div className="slider-labels"><span>0%</span><span>50%</span><span>100%</span></div>
      </div>

      <button className="btn btn-secondary voice-preview-btn" onClick={handlePreview}>
        Sesi Test Et
      </button>

      {!window.speechSynthesis && (
        <p className="text-error" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--sp-2)' }}>
          Bu tarayıcıda ses sentezi desteklenmiyor.
        </p>
      )}
    </div>
  );
}
