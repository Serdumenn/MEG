import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFirestore } from '../hooks/useFirestore';
import { getAllLevelsWithTopics, getCriticalTopics } from '../data/topics';
import { Skeleton } from '../components/Skeleton';
import './TopicsLibrary.css';

const LEVEL_LABELS = {
  A1: 'Başlangıç',
  A2: 'Temel',
  B1: 'Orta Seviye',
  B2: 'Orta-Üst Seviye',
};

export default function TopicsLibrary() {
  const firestore = useFirestore();
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading]         = useState(true);
  const [topicCount, setTopicCount]   = useState(0);

  const allLevels      = getAllLevelsWithTopics();
  const criticalTopics = getCriticalTopics();

  useEffect(() => {
    let cancelled = false;
    firestore.getAllProgress().then(list => {
      if (cancelled) return;
      const map = {};
      list.forEach(p => { map[p.id] = p; });
      setProgressMap(map);
      setTopicCount(list.length);
      setLoading(false);
    });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalTopics = allLevels.reduce((acc, { topics }) => acc + topics.length, 0);

  return (
    <div className="topics-page animate-fade-in">
      <div className="topics-header">
        <h1 className="section-title">Konular</h1>
        {loading
          ? <Skeleton width="160px" height="1rem" />
          : <p className="text-muted" style={{ fontSize: 'var(--text-sm)' }}>
              {totalTopics} konudan {topicCount} tanesi çalışıldı
            </p>
        }
      </div>

      {/* Critical for B1 */}
      <div className="topics-section">
        <div className="topics-section-header">
          <h2 className="topics-section-title">B1 İçin Kritik</h2>
          <span className="critical-count">{criticalTopics.length} konu</span>
        </div>
        <div className="topics-grid">
          {criticalTopics.map(topic => (
            <TopicCard key={topic.id} topic={topic} progress={progressMap[topic.id]} />
          ))}
        </div>
      </div>

      {/* All levels */}
      {allLevels.map(({ level, topics }) => (
        <div key={level} className="topics-section">
          <div className="topics-section-header">
            <h2 className="topics-section-title">
              <span className={`badge badge-${level.toLowerCase()}`}>{level}</span>
              {LEVEL_LABELS[level]}
            </h2>
            <span className="topics-section-count">
              {topics.filter(t => progressMap[t.id]).length}/{topics.length}
            </span>
          </div>
          <div className="topics-grid">
            {topics.map(topic => (
              <TopicCard key={topic.id} topic={topic} progress={progressMap[topic.id]} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TopicCard({ topic, progress }) {
  const studied = !!progress;
  return (
    <Link to={`/lesson/${topic.id}`} className={`topic-card ${studied ? 'studied' : ''}`}>
      <div className="topic-card-top">
        <span className={`badge badge-${topic.level.toLowerCase()}`}>{topic.level}</span>
        <div className="topic-card-badges">
          {topic.critical && <span className="critical-pill">Kritik</span>}
          {studied && <span className="studied-check" title="Çalışıldı">✓</span>}
        </div>
      </div>
      <span className="topic-card-name">{topic.name}</span>
      <span className="topic-card-desc">{topic.description.split('.')[0]}.</span>
      {studied && progress.accuracyRate !== undefined && (
        <div style={{ marginTop: 'var(--sp-2)' }}>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress.accuracyRate}%` }} />
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '2px', display: 'block' }}>
            {progress.accuracyRate}% doğruluk
          </span>
        </div>
      )}
    </Link>
  );
}
