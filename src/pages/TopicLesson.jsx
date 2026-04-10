import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTopicById } from '../data/topics';
import './TopicLesson.css';

export default function TopicLesson() {
  const { topicId } = useParams();
  const navigate    = useNavigate();
  const topic       = getTopicById(topicId);

  if (!topic) {
    return (
      <div className="lesson-not-found animate-fade-in">
        <p className="text-muted">Konu bulunamadı.</p>
        <Link to="/topics" className="btn btn-secondary">Konulara Dön</Link>
      </div>
    );
  }

  return (
    <div className="lesson-page animate-fade-in">

      {/* Back nav */}
      <button className="btn btn-ghost lesson-back" onClick={() => navigate(-1)}>
        ← Geri
      </button>

      {/* Title */}
      <div className="lesson-header">
        <div className="lesson-title-row">
          <h1 className="lesson-title">{topic.name}</h1>
          <div className="lesson-badges">
            <span className={`badge badge-${topic.level.toLowerCase()}`}>{topic.level}</span>
            {topic.critical && <span className="critical-pill">Kritik</span>}
          </div>
        </div>
        <p className="lesson-description text-muted">{topic.description}</p>
      </div>

      {/* Formula */}
      {topic.formula && (
        <div className="card lesson-card">
          <h2 className="lesson-card-title">Formül</h2>
          <div className="formula-grid">
            {topic.formula.affirmative && (
              <div className="formula-row">
                <span className="formula-type">+</span>
                <code className="formula-text">{topic.formula.affirmative}</code>
              </div>
            )}
            {topic.formula.negative && (
              <div className="formula-row">
                <span className="formula-type">−</span>
                <code className="formula-text">{topic.formula.negative}</code>
              </div>
            )}
            {topic.formula.question && (
              <div className="formula-row">
                <span className="formula-type">?</span>
                <code className="formula-text">{topic.formula.question}</code>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Examples */}
      {topic.examples && topic.examples.length > 0 && (
        <div className="card lesson-card">
          <h2 className="lesson-card-title">Örnekler</h2>
          <div className="examples-list">
            {topic.examples.map((ex, i) => (
              <div key={i} className="example-row">
                <span
                  className="example-en"
                  dangerouslySetInnerHTML={{
                    __html: ex.en.replace(/\{([^}]+)\}/g, '<strong class="verb-highlight">$1</strong>'),
                  }}
                />
                {ex.tr && <span className="example-tr">{ex.tr}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Signal words */}
      {topic.signalWords && topic.signalWords.length > 0 && (
        <div className="card lesson-card">
          <h2 className="lesson-card-title">Sinyal Kelimeler</h2>
          <div className="signal-pills">
            {topic.signalWords.map((word, i) => (
              <span key={i} className="signal-pill">{word}</span>
            ))}
          </div>
        </div>
      )}

      {/* Common mistakes */}
      {topic.commonMistakes && topic.commonMistakes.length > 0 && (
        <div className="card lesson-card">
          <h2 className="lesson-card-title">Sık Yapılan Hatalar</h2>
          <div className="mistakes-list">
            {topic.commonMistakes.map((m, i) => (
              <div key={i} className="mistake-row">
                <div className="mistake-pair">
                  <span className="mistake-wrong">✗ {m.wrong}</span>
                  <span className="mistake-arrow">→</span>
                  <span className="mistake-correct">✓ {m.correct}</span>
                </div>
                <span className="mistake-rule">💡 {m.rule}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Irregular verbs (past_simple) */}
      {topic.irregularVerbs && topic.irregularVerbs.length > 0 && (
        <div className="card lesson-card">
          <h2 className="lesson-card-title">Yaygın Düzensiz Fiiller</h2>
          <div className="irr-verbs-grid">
            <div className="irr-verbs-header">
              <span>Yalın</span><span>Geçmiş</span><span>Ortaç</span>
            </div>
            {topic.irregularVerbs.map((v, i) => (
              <div key={i} className="irr-verb-row">
                <span>{v.base}</span>
                <span>{v.past}</span>
                <span>{v.participle}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <Link to={`/practice/${topic.id}`} className="btn btn-primary lesson-cta">
        Bu Konuyu Çalış
      </Link>

    </div>
  );
}
