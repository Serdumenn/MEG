import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { getTopicById } from '../data/topics';
import { Skeleton } from '../components/Skeleton';
import './Home.css';

export default function Home() {
  const { user } = useAuth();
  const firestore = useFirestore();

  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [profile, sessions, progress, verbErrors] = await Promise.all([
        firestore.getUserProfile(),
        firestore.getRecentSessions(5),
        firestore.getAllProgress(),
        firestore.getAllVerbErrors(),
      ]);
      if (cancelled) return;
      setData({ profile, sessions, progress, verbErrors });
      setLoading(false);
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const level = data?.profile?.level || 'A1';

  // Last session
  const lastSession = data?.sessions?.[0];
  const lastTopic   = lastSession?.topicId && lastSession.topicId !== 'freetalk'
    ? getTopicById(lastSession.topicId) : null;

  // Suggested topic (lowest accuracy among practiced)
  const suggestedProgress = data?.progress?.length
    ? [...data.progress].sort((a, b) => (a.accuracyRate || 100) - (b.accuracyRate || 100))[0]
    : null;
  const suggestedTopic = suggestedProgress ? getTopicById(suggestedProgress.id) : null;

  // Verb stats
  const weakVerbCount = data?.verbErrors?.filter(v => v.wrongAttempts > 0).length || 0;

  const displayName = user?.displayName?.split(' ')[0] || 'Merhaba';

  return (
    <div className="home-page animate-fade-in">

      {/* Header */}
      <div className="home-header">
        <div>
          <h1 className="home-title">Merhaba, {displayName}!</h1>
          <p className="text-muted" style={{ marginTop: 'var(--sp-1)' }}>
            İngilizce çalışmaya devam edin.
          </p>
        </div>
        <span className={`badge badge-${level.toLowerCase()} home-level-badge`}>{level}</span>
      </div>

      {/* Stats */}
      <div className="home-stats">
        {loading ? (
          <>
            <Skeleton height="72px" radius="12px" />
            <Skeleton height="72px" radius="12px" />
            <Skeleton height="72px" radius="12px" />
          </>
        ) : (
          <>
            <div className="stat-card">
              <span className="stat-value">{data?.profile?.totalMinutes || 0}</span>
              <span className="stat-label">toplam dakika</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{data?.progress?.length || 0}</span>
              <span className="stat-label">konu çalışıldı</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{data?.profile?.totalSessions || 0}</span>
              <span className="stat-label">oturum</span>
            </div>
          </>
        )}
      </div>

      {/* Quick actions */}
      <div className="home-actions">
        <Link to="/topics" className="action-card">
          <div className="action-icon"><BookIcon /></div>
          <div className="action-text">
            <span className="action-title">Konu Çalış</span>
            <span className="action-desc">Odaklanmak için dilbilgisi seçin</span>
          </div>
          <ChevronIcon />
        </Link>

        <Link to="/freetalk" className="action-card">
          <div className="action-icon"><ChatIcon /></div>
          <div className="action-text">
            <span className="action-title">Serbest Konuşma</span>
            <span className="action-desc">Açık sohbet, tüm dilbilgisi</span>
          </div>
          <ChevronIcon />
        </Link>
      </div>

      {/* Geçen Sefer card */}
      {!loading && lastTopic && (
        <div className="home-section">
          <h2 className="section-title">Geçen Sefer</h2>
          <Link to={`/practice/${lastTopic.id}`} className="highlight-card">
            <div className="highlight-card-left">
              <span className={`badge badge-${lastTopic.level.toLowerCase()}`}>{lastTopic.level}</span>
              <span className="highlight-card-name">{lastTopic.name}</span>
            </div>
            <span className="highlight-card-cta">Devam Et →</span>
          </Link>
        </div>
      )}

      {/* Önerilen card */}
      {!loading && suggestedTopic && (
        <div className="home-section">
          <h2 className="section-title">Önerilen</h2>
          <Link to={`/practice/${suggestedTopic.id}`} className="highlight-card">
            <div className="highlight-card-left">
              <span className={`badge badge-${suggestedTopic.level.toLowerCase()}`}>{suggestedTopic.level}</span>
              <span className="highlight-card-name">{suggestedTopic.name}</span>
              <span className="highlight-card-sub">
                {suggestedProgress.accuracyRate}% doğruluk — iyileştirme gerekiyor
              </span>
            </div>
            <span className="highlight-card-cta">Çalış →</span>
          </Link>
        </div>
      )}

      {/* Fiil Çalışması card */}
      {!loading && (
        <div className="home-section">
          <h2 className="section-title">Fiil Çalışması</h2>
          <Link to="/verbs" className="highlight-card">
            <div className="highlight-card-left">
              <span className="highlight-card-name">Düzensiz Fiiller</span>
              <span className="highlight-card-sub">
                {weakVerbCount > 0
                  ? `${weakVerbCount} zayıf fiil — çalışma gerekiyor`
                  : 'Kart çevirerek fiil öğren'}
              </span>
            </div>
            <span className="highlight-card-cta">Başla →</span>
          </Link>
        </div>
      )}

      {/* New user hint */}
      {!loading && !data?.profile?.totalSessions && (
        <div className="home-tip">
          <p className="text-muted" style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>
            Bir konuyu seç ve MEG ile konuşmaya başla. Hatalarını düzeltecek.
          </p>
        </div>
      )}
    </div>
  );
}

function BookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
}
