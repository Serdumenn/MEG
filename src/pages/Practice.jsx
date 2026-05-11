import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTopicById } from '../data/topics';
import { buildPracticePrompt } from '../data/prompts';
import { useFirestore } from '../hooks/useFirestore';
import ChatInterface from '../components/ChatInterface';
import { Skeleton } from '../components/Skeleton';
import './Practice.css';

export default function Practice() {
  const { topicId } = useParams();
  const navigate    = useNavigate();
  const firestore   = useFirestore();
  const topic       = getTopicById(topicId);

  const [systemPrompt, setSystemPrompt] = useState(null);
  const [loading, setLoading]           = useState(true);

  const sessionIdRef    = useRef(null);
  const startTimeRef    = useRef(Date.now());
  const messageCountRef = useRef(0);
  const errorCountRef   = useRef(0);
  const hiddenAtRef     = useRef(null);   // timestamp when tab was hidden
  const pausedMsRef     = useRef(0);      // total ms spent hidden

  // Load user data and build prompt
  useEffect(() => {
    if (!topic) { setLoading(false); return; }
    let cancelled = false;

    (async () => {
      const userData = await firestore.getPromptData();
      if (cancelled) return;

      setSystemPrompt(buildPracticePrompt({ level: userData?.level || 'A1', topic, userData }));

      const sid = await firestore.startSession(topic.id);
      if (!cancelled) sessionIdRef.current = sid;
      setLoading(false);
    })();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  // Pause timer when tab is hidden
  useEffect(() => {
    function onVisibilityChange() {
      if (document.hidden) {
        hiddenAtRef.current = Date.now();
      } else if (hiddenAtRef.current) {
        pausedMsRef.current += Date.now() - hiddenAtRef.current;
        hiddenAtRef.current = null;
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // End session + update progress on unmount
  useEffect(() => {
    return () => {
      if (!topic) return;
      const totalMs     = Date.now() - startTimeRef.current;
      const activeMs    = totalMs - pausedMsRef.current;
      const durationMin = Math.round(activeMs / 60000);
      if (sessionIdRef.current && (durationMin > 0 || messageCountRef.current > 0)) {
        firestore.endSession(sessionIdRef.current, {
          messageCount: messageCountRef.current,
          errorCount: errorCountRef.current,
          durationMin,
        });
        firestore.updateProgress({
          topicId: topic.id,
          topicName: topic.name,
          sessionErrors: errorCountRef.current,
          messageCount: messageCountRef.current,
        });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  function handleErrorExtracted(errors) {
    errorCountRef.current += errors.length;
    errors.forEach(err => firestore.addError({ ...err, topicId: topic.id, tense: topic.name }));
  }

  function handleMessageSent() {
    messageCountRef.current += 1;
  }

  if (!topic) {
    return (
      <div className="practice-not-found animate-fade-in">
        <p className="text-muted">Konu bulunamadı.</p>
        <Link to="/topics" className="btn btn-secondary">Konulara Dön</Link>
      </div>
    );
  }

  if (loading || !systemPrompt) {
    return (
      <div style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        <Skeleton height="48px" radius="12px" />
        <Skeleton height="300px" radius="12px" />
      </div>
    );
  }

  const header = (
    <div className="practice-header-content">
      <button className="btn btn-ghost practice-back" onClick={() => navigate(-1)}>←</button>
      <div className="practice-topic-info">
        <span className="practice-topic-name">{topic.name}</span>
        <span className={`badge badge-${topic.level.toLowerCase()}`}>{topic.level}</span>
      </div>
    </div>
  );

  const empty = (
    <div className="practice-empty-content">
      {topic.formula?.affirmative && (
        <code className="formula-code">{topic.formula.affirmative}</code>
      )}
      <p className="text-muted" style={{ fontSize: 'var(--text-sm)', textAlign: 'center' }}>
        {topic.name} konusunu çalışın. MEG hatalarınızı düzeltecek.
      </p>
    </div>
  );

  return (
    <ChatInterface
      systemPrompt={systemPrompt}
      topicId={topic.id}
      headerContent={header}
      emptyContent={empty}
      suggestedPrompts={topic.practicePrompts || []}
      onErrorExtracted={handleErrorExtracted}
      onMessageSent={handleMessageSent}
    />
  );
}
