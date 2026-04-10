import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { getTopicById } from '../data/topics';
import { Skeleton } from '../components/Skeleton';
import './Progress.css';

export default function Progress() {
  const firestore = useFirestore();

  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [profile, progress, errors, verbErrors] = await Promise.all([
        firestore.getUserProfile(),
        firestore.getAllProgress(),
        firestore.getAllErrors(),
        firestore.getAllVerbErrors(),
      ]);
      if (cancelled) return;
      setData({ profile, progress, errors, verbErrors });
      setLoading(false);
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="progress-page animate-fade-in">
        <h1 className="section-title">İlerleme</h1>
        <div className="progress-stats">
          {[1,2,3,4].map(i => <Skeleton key={i} height="72px" radius="12px" />)}
        </div>
        <Skeleton height="200px" radius="12px" style={{ marginTop: 'var(--sp-4)' }} />
        <Skeleton height="200px" radius="12px" style={{ marginTop: 'var(--sp-4)' }} />
      </div>
    );
  }

  const { profile, progress, errors, verbErrors } = data;

  // Sort topics by practice count desc
  const topicStats = progress
    .map(p => ({ ...p, topic: getTopicById(p.id) }))
    .filter(p => p.topic)
    .sort((a, b) => b.practiceCount - a.practiceCount);

  // Weak topics (lowest accuracy, at least 1 session)
  const weakTopics = [...topicStats]
    .filter(p => p.accuracyRate !== undefined)
    .sort((a, b) => (a.accuracyRate || 100) - (b.accuracyRate || 100))
    .slice(0, 5);

  // Recent errors (most recent first, deduplicated by wrong+correct)
  const recentErrors = errors.slice(0, 10);

  // Verb stats
  const weakVerbs  = verbErrors.filter(v => v.wrongAttempts > 0).sort((a, b) => b.wrongAttempts - a.wrongAttempts);
  const verbLearned = verbErrors.filter(v => v.wrongAttempts === 0).length;

  const hasData = (profile?.totalSessions || 0) > 0;

  return (
    <div className="progress-page animate-fade-in">
      <h1 className="section-title">İlerleme</h1>

      {/* Stats row */}
      <div className="progress-stats">
        <div className="progress-stat-card">
          <span className="progress-stat-value">{profile?.totalMinutes || 0}</span>
          <span className="progress-stat-label">toplam dakika</span>
        </div>
        <div className="progress-stat-card">
          <span className="progress-stat-value">{progress.length}</span>
          <span className="progress-stat-label">konu çalışıldı</span>
        </div>
        <div className="progress-stat-card">
          <span className="progress-stat-value">{profile?.totalSessions || 0}</span>
          <span className="progress-stat-label">oturum</span>
        </div>
        <div className="progress-stat-card">
          <span className="progress-stat-value">{errors.length}</span>
          <span className="progress-stat-label">hata</span>
        </div>
      </div>

      {/* Topics practiced */}
      {topicStats.length > 0 && (
        <div className="progress-section">
          <h2 className="progress-section-title">Çalışılan Konular</h2>
          <div className="topic-bars">
            {topicStats.map(({ id, topic, practiceCount, accuracyRate }) => (
              <Link key={id} to={`/lesson/${id}`} className="topic-bar-row">
                <div className="topic-bar-info">
                  <span className="topic-bar-name">{topic.name}</span>
                  <div className="topic-bar-meta">
                    <span className={`badge badge-${topic.level.toLowerCase()}`}>{topic.level}</span>
                    <span className="topic-bar-sessions">{practiceCount} oturum</span>
                    {accuracyRate !== undefined && (
                      <span className={`topic-bar-accuracy ${accuracyRate < 60 ? 'low' : accuracyRate < 80 ? 'mid' : 'high'}`}>
                        {accuracyRate}%
                      </span>
                    )}
                  </div>
                </div>
                {accuracyRate !== undefined && (
                  <div className="progress-bar topic-bar-progress">
                    <div className="progress-bar-fill" style={{ width: `${accuracyRate}%` }} />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Weak points */}
      {weakTopics.length > 0 && (
        <div className="progress-section">
          <h2 className="progress-section-title">Geliştirilmesi Gereken</h2>
          <div className="weak-topics">
            {weakTopics.map(({ id, topic, accuracyRate }) => (
              <Link key={id} to={`/practice/${id}`} className="weak-topic-card">
                <div className="weak-topic-info">
                  <span className="weak-topic-name">{topic.name}</span>
                  <span className={`badge badge-${topic.level.toLowerCase()}`}>{topic.level}</span>
                </div>
                <span className="weak-topic-accuracy">{accuracyRate}%</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Verb mastery */}
      {verbErrors.length > 0 && (
        <div className="progress-section">
          <h2 className="progress-section-title">Fiil Çalışması</h2>
          <div className="verb-stats-row">
            <div className="verb-stat">
              <span className="verb-stat-value text-success">{verbLearned}</span>
              <span className="verb-stat-label">öğrenildi</span>
            </div>
            <div className="verb-stat">
              <span className="verb-stat-value text-error">{weakVerbs.length}</span>
              <span className="verb-stat-label">zayıf</span>
            </div>
          </div>
          {weakVerbs.length > 0 && (
            <div className="weak-verbs">
              {weakVerbs.slice(0, 8).map(v => (
                <Link key={v.id} to="/verbs" className="weak-verb-pill">
                  {v.verb || v.id} ({v.v2}/{v.v3})
                  <span className="weak-verb-count">{v.wrongAttempts}×</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Error list */}
      <div className="progress-section">
        <h2 className="progress-section-title">Son Hatalar</h2>
        {recentErrors.length === 0 ? (
          <div className="progress-empty">
            <p className="text-muted" style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>
              Henüz hata kaydedilmedi. Düzeltmeleri görmek için çalışmaya başlayın.
            </p>
            <Link to="/topics" className="btn btn-secondary" style={{ marginTop: 'var(--sp-3)' }}>
              Konulara Git
            </Link>
          </div>
        ) : (
          <div className="errors-list">
            {recentErrors.map((err, i) => {
              const errTopic = getTopicById(err.topicId);
              return (
                <div key={i} className="error-card">
                  {errTopic && (
                    <div className="error-header">
                      <span className={`badge badge-${errTopic.level.toLowerCase()}`}>{errTopic.name}</span>
                    </div>
                  )}
                  <div className="error-pair">
                    <span className="error-wrong">✗ "{err.wrong}"</span>
                    <span className="error-arrow">→</span>
                    <span className="error-correct">✓ "{err.correct}"</span>
                  </div>
                  <p className="error-rule">💡 {err.rule}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Empty state */}
      {!hasData && (
        <div className="progress-start">
          <p className="text-muted" style={{ textAlign: 'center', fontSize: 'var(--text-sm)' }}>
            İlerlemenizi görmek için konu çalışmaya başlayın.
          </p>
          <Link to="/topics" className="btn btn-primary" style={{ marginTop: 'var(--sp-3)' }}>
            Çalışmaya Başla
          </Link>
        </div>
      )}
    </div>
  );
}
