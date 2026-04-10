import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { showToast } from '../components/Toast';
import VoiceSettings from '../components/VoiceSettings';
import './Settings.css';

const LEVELS = [
  { value: 'A1', label: 'A1', desc: 'Başlangıç' },
  { value: 'A2', label: 'A2', desc: 'Temel' },
  { value: 'B1', label: 'B1', desc: 'Orta Seviye' },
  { value: 'B2', label: 'B2', desc: 'Orta-Üst Seviye' },
];

export default function Settings() {
  const navigate  = useNavigate();
  const { user, signOut } = useAuth();
  const firestore = useFirestore();

  const [level, setLevel]             = useState('A1');
  const [showConfirm, setShowConfirm] = useState(false);
  const [signingOut, setSigningOut]   = useState(false);

  // Load current level from Firestore on mount
  useEffect(() => {
    firestore.getUserProfile().then(p => { if (p?.level) setLevel(p.level); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLevelChange(lv) {
    setLevel(lv);
    await firestore.setUserLevel(lv);
    showToast(`Seviye ${lv} olarak ayarlandı`, 'success', 2000);
    // Reload so App.jsx re-fetches the profile with new level
    setTimeout(() => window.location.reload(), 600);
  }

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      navigate('/');
    } catch {
      showToast('Çıkış yapılamadı. Tekrar deneyin.', 'error');
      setSigningOut(false);
    }
  }

  async function handleResetProgress() {
    try {
      await firestore.resetProgress();
      setShowConfirm(false);
      showToast('İlerleme sıfırlandı.', 'warning', 3000);
    } catch {
      showToast('Sıfırlama başarısız.', 'error');
    }
  }

  async function handleResetAll() {
    try {
      await firestore.resetEverything();
      setShowConfirm(false);
      showToast('Tüm veriler silindi.', 'warning');
      await signOut();
    } catch {
      showToast('Sıfırlama başarısız.', 'error');
    }
  }

  return (
    <div className="settings animate-fade-in">
      <h1 className="section-title" style={{ marginBottom: 'var(--sp-2)' }}>Ayarlar</h1>

      {/* ── Profile ── */}
      <section className="card settings-section">
        <h2 className="settings-section-title">Profil</h2>
        <div className="profile-row">
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="profile-avatar"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="profile-info">
            <span className="profile-name">{user?.displayName || '—'}</span>
            <span className="profile-email text-muted">{user?.email || '—'}</span>
          </div>
        </div>
        <button
          className="btn btn-secondary btn-sm"
          onClick={handleSignOut}
          disabled={signingOut}
          style={{ marginTop: 'var(--sp-4)' }}
        >
          {signingOut ? 'Çıkılıyor…' : 'Çıkış Yap'}
        </button>
      </section>

      {/* ── Level ── */}
      <section className="card settings-section">
        <h2 className="settings-section-title">Seviyeniz</h2>
        <p className="text-muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-4)' }}>
          Bu ayar yapay zekanın dil ve beklentilerini belirler.
        </p>
        <div className="level-selector">
          {LEVELS.map(lv => (
            <button
              key={lv.value}
              className={`level-option ${level === lv.value ? 'active' : ''}`}
              onClick={() => handleLevelChange(lv.value)}
            >
              <span className={`badge badge-${lv.value.toLowerCase()} level-option-badge`}>{lv.label}</span>
              <span className="level-option-desc">{lv.desc}</span>
              {level === lv.value && <span className="level-option-check">✓</span>}
            </button>
          ))}
        </div>
      </section>

      {/* ── Voice Settings ── */}
      <section className="card settings-section">
        <h2 className="settings-section-title">Ses Ayarları</h2>
        <p className="text-muted" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--sp-4)' }}>
          MEG'in size konuşma biçimini özelleştirin.
        </p>
        <VoiceSettings />
      </section>

      {/* ── About ── */}
      <section className="card settings-section">
        <h2 className="settings-section-title">MEG Hakkında</h2>
        <div className="about-grid">
          <div className="about-item">
            <span className="text-muted" style={{ fontSize: 'var(--text-xs)' }}>Sürüm</span>
            <span>3.0.0</span>
          </div>
          <div className="about-item">
            <span className="text-muted" style={{ fontSize: 'var(--text-xs)' }}>Yapay Zeka</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}>gemini-2.0-flash-lite</span>
          </div>
          <div className="about-item">
            <span className="text-muted" style={{ fontSize: 'var(--text-xs)' }}>Hedef Kitle</span>
            <span>Türk İngilizce Öğrencileri</span>
          </div>
          <div className="about-item">
            <span className="text-muted" style={{ fontSize: 'var(--text-xs)' }}>Teknoloji</span>
            <span>React + Firebase</span>
          </div>
        </div>
      </section>

      {/* ── Danger Zone ── */}
      <section className="card settings-section danger-zone">
        <h2 className="settings-section-title" style={{ color: 'var(--error)' }}>Tehlikeli Bölge</h2>

        {!showConfirm ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            <button className="btn btn-danger" onClick={() => setShowConfirm('progress')}>
              İlerlemeyi Sıfırla (hesap korunur)
            </button>
            <button className="btn btn-danger" onClick={() => setShowConfirm('all')}>
              Her Şeyi Sıfırla (çıkış yapılır)
            </button>
          </div>
        ) : (
          <div className="confirm-box">
            <p style={{ color: 'var(--error)', fontWeight: 600, marginBottom: 'var(--sp-3)', fontSize: 'var(--text-sm)' }}>
              {showConfirm === 'all'
                ? 'Tüm verileriniz Firestore\'dan silinecek ve çıkış yapılacak. Emin misiniz?'
                : 'Tüm ilerlemeniz, hatalarınız ve oturumlarınız silinecek. Emin misiniz?'}
            </p>
            <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
              <button className="btn btn-danger" onClick={showConfirm === 'all' ? handleResetAll : handleResetProgress}>
                Evet, Sıfırla
              </button>
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>
                İptal
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
