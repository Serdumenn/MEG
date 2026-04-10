import { useState, useEffect, useCallback } from 'react';
import { useFirestore } from '../hooks/useFirestore';
import { useAuth } from '../hooks/useAuth';
import { getAllVerbs } from '../data/verbs';
import { buildVerbChatPrompt } from '../data/prompts';
import ChatInterface from '../components/ChatInterface';
import { Skeleton } from '../components/Skeleton';
import './Verbs.css';

const ALL_VERBS = getAllVerbs();

export default function Verbs() {
  const [tab, setTab] = useState('cards'); // 'cards' | 'chat'

  return (
    <div className="verbs-page animate-fade-in">
      <div className="verbs-header">
        <h1 className="section-title">Fiiller</h1>
        <div className="verbs-tab-switcher">
          <button
            className={`verbs-tab ${tab === 'cards' ? 'active' : ''}`}
            onClick={() => setTab('cards')}
          >
            Kartlar
          </button>
          <button
            className={`verbs-tab ${tab === 'chat' ? 'active' : ''}`}
            onClick={() => setTab('chat')}
          >
            Sohbet
          </button>
        </div>
      </div>

      {tab === 'cards' ? <FlashcardMode /> : <VerbChatMode />}
    </div>
  );
}

// ── Flashcard Mode ────────────────────────────────────────────

function FlashcardMode() {
  const firestore = useFirestore();
  const [verbErrors, setVerbErrors]   = useState({});
  const [loading, setLoading]         = useState(true);
  const [filter, setFilter]           = useState('all'); // all | weak | learned
  const [currentIdx, setCurrentIdx]   = useState(0);
  const [flipped, setFlipped]         = useState(false);

  useEffect(() => {
    let cancelled = false;
    firestore.getAllVerbErrors().then(list => {
      if (cancelled) return;
      const map = {};
      list.forEach(v => { map[v.id] = v; });
      setVerbErrors(map);
      setLoading(false);
    });
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sort: weak verbs first, then unstarted, then learned
  const sortedVerbs = [...ALL_VERBS].sort((a, b) => {
    const aErr = verbErrors[a.id]?.wrongAttempts || 0;
    const bErr = verbErrors[b.id]?.wrongAttempts || 0;
    return bErr - aErr;
  });

  const filteredVerbs = sortedVerbs.filter(v => {
    const err = verbErrors[v.id]?.wrongAttempts || 0;
    if (filter === 'weak')    return err > 0;
    if (filter === 'learned') return verbErrors[v.id] && err === 0;
    return true;
  });

  const total   = filteredVerbs.length;
  const learned = filteredVerbs.filter(v => verbErrors[v.id] && (verbErrors[v.id]?.wrongAttempts || 0) === 0).length;

  const safeIdx = Math.min(currentIdx, Math.max(0, total - 1));
  const verb    = filteredVerbs[safeIdx];

  const handleBildim = useCallback(async () => {
    if (!verb) return;
    await firestore.markVerbCorrect(verb.id);
    setVerbErrors(prev => {
      const old = prev[verb.id];
      const oldAttempts = old?.wrongAttempts || 0;
      return {
        ...prev,
        [verb.id]: { ...old, wrongAttempts: Math.max(0, oldAttempts - 1) },
      };
    });
    setFlipped(false);
    setCurrentIdx(i => (i + 1) % Math.max(1, total));
  }, [verb, total, firestore]);

  const handleBilmedim = useCallback(async () => {
    if (!verb) return;
    await firestore.recordVerbError({ verb: verb.v1, v2: verb.v2, v3: verb.v3 });
    setVerbErrors(prev => {
      const old = prev[verb.id];
      return {
        ...prev,
        [verb.id]: { ...old, wrongAttempts: (old?.wrongAttempts || 0) + 1 },
      };
    });
    setFlipped(false);
    setCurrentIdx(i => (i + 1) % Math.max(1, total));
  }, [verb, total, firestore]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        <Skeleton height="48px" radius="12px" />
        <Skeleton height="240px" radius="16px" />
      </div>
    );
  }

  return (
    <div className="flashcard-mode">
      {/* Filter pills */}
      <div className="verb-filters">
        {[['all','Tümü'], ['weak','Zayıf'], ['learned','Öğrenildi']].map(([val, label]) => (
          <button
            key={val}
            className={`verb-filter-pill ${filter === val ? 'active' : ''}`}
            onClick={() => { setFilter(val); setCurrentIdx(0); setFlipped(false); }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div>
        <div className="progress-bar" style={{ height: '6px' }}>
          <div className="progress-bar-fill" style={{ width: `${total > 0 ? (learned / total) * 100 : 0}%` }} />
        </div>
        <p className="text-muted" style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--sp-1)', textAlign: 'right' }}>
          {learned}/{total} öğrenildi
        </p>
      </div>

      {total === 0 ? (
        <div style={{ textAlign: 'center', padding: 'var(--sp-8)', color: 'var(--text-tertiary)' }}>
          {filter === 'weak' ? 'Zayıf fiil yok — harika!' : filter === 'learned' ? 'Henüz öğrenilen fiil yok.' : 'Fiil bulunamadı.'}
        </div>
      ) : (
        <>
          {/* Flip card */}
          <div
            className={`flip-card ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(f => !f)}
          >
            <div className="flip-card-inner">
              {/* Front: V1 */}
              <div className="flip-card-front">
                <span className="flip-card-label">V1 (Base Form)</span>
                <span className="flip-card-verb">{verb?.v1}</span>
                <span className="flip-card-hint">Dokunarak çevirin</span>
                {verbErrors[verb?.id]?.wrongAttempts > 0 && (
                  <span className="flip-card-badge weak">Zayıf ({verbErrors[verb?.id]?.wrongAttempts}×)</span>
                )}
              </div>
              {/* Back: V2, V3, TR */}
              <div className="flip-card-back">
                <div className="flip-back-row">
                  <span className="flip-back-label">V2</span>
                  <span className="flip-back-value">{verb?.v2}</span>
                </div>
                <div className="flip-back-row">
                  <span className="flip-back-label">V3</span>
                  <span className="flip-back-value">{verb?.v3}</span>
                </div>
                <div className="flip-back-divider" />
                <div className="flip-back-tr">{verb?.tr}</div>
              </div>
            </div>
          </div>

          {/* Counter */}
          <p className="text-muted" style={{ textAlign: 'center', fontSize: 'var(--text-xs)' }}>
            {safeIdx + 1} / {total}
          </p>

          {/* Buttons */}
          <div className="flashcard-buttons">
            <button
              className="btn btn-danger btn-lg flashcard-btn"
              onClick={handleBilmedim}
            >
              Bilmedim
            </button>
            <button
              className="btn btn-primary btn-lg flashcard-btn"
              onClick={handleBildim}
            >
              Bildim
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ── Verb Chat Mode ────────────────────────────────────────────

function VerbChatMode() {
  const { user } = useAuth();
  const firestore = useFirestore();
  const [systemPrompt, setSystemPrompt] = useState(null);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [userData, verbErrors] = await Promise.all([
        firestore.getPromptData(),
        firestore.getAllVerbErrors(),
      ]);
      if (cancelled) return;

      const weakVerbs = verbErrors
        .filter(v => v.wrongAttempts > 0)
        .sort((a, b) => b.wrongAttempts - a.wrongAttempts)
        .slice(0, 20);

      setSystemPrompt(buildVerbChatPrompt({
        level: userData?.level || 'A1',
        weakVerbs,
        userData,
      }));
      setLoading(false);
    })();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !systemPrompt) {
    return (
      <div style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        <Skeleton height="48px" radius="12px" />
        <Skeleton height="300px" radius="12px" />
      </div>
    );
  }

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
      <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)' }}>
        Fiil Sohbeti
      </span>
    </div>
  );

  const empty = (
    <div style={{ textAlign: 'center', maxWidth: 320 }}>
      <p className="text-muted" style={{ fontSize: 'var(--text-sm)' }}>
        MEG zayıf fiillerinizi sorarak pratik yapmanıza yardım edecek.
      </p>
    </div>
  );

  return (
    <ChatInterface
      systemPrompt={systemPrompt}
      topicId="verbs"
      headerContent={header}
      emptyContent={empty}
      suggestedPrompts={[
        "Quiz me on irregular verbs.",
        "Can you test me on go, come, and take?",
        "I want to practice past tense verbs.",
      ]}
    />
  );
}
