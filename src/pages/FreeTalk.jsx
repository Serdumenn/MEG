import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { buildFreeTalkPrompt } from '../data/prompts';
import ChatInterface from '../components/ChatInterface';
import { Skeleton } from '../components/Skeleton';

const SUGGESTED_PROMPTS = [
  "Tell me about your daily routine.",
  "What did you do last weekend?",
  "Describe your favourite movie.",
  "What are your plans for the future?",
  "Talk about a place you would like to visit.",
];

export default function FreeTalk() {
  const { user } = useAuth();
  const firestore = useFirestore();

  const [systemPrompt, setSystemPrompt] = useState(null);
  const [level, setLevel] = useState('A1');
  const [loading, setLoading] = useState(true);

  const sessionIdRef     = useRef(null);
  const startTimeRef     = useRef(Date.now());
  const messageCountRef  = useRef(0);
  const errorCountRef    = useRef(0);
  const hiddenAtRef      = useRef(null);  // timestamp when tab was hidden
  const pausedMsRef      = useRef(0);     // total ms spent hidden

  // Load user data and build prompt
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const userData = await firestore.getPromptData();
      if (cancelled) return;

      const lvl = userData?.level || 'A1';
      setLevel(lvl);
      setSystemPrompt(buildFreeTalkPrompt({ level: lvl, userData }));

      // Start session
      const sid = await firestore.startSession('freetalk');
      if (!cancelled) sessionIdRef.current = sid;
      setLoading(false);
    })();

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // End session on unmount
  useEffect(() => {
    return () => {
      if (sessionIdRef.current) {
        const totalMs     = Date.now() - startTimeRef.current;
        const activeMs    = totalMs - pausedMsRef.current;
        const durationMin = Math.round(activeMs / 60000);
        if (durationMin > 0 || messageCountRef.current > 0) {
          firestore.endSession(sessionIdRef.current, {
            messageCount: messageCountRef.current,
            errorCount: errorCountRef.current,
            durationMin,
          });
        }
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleErrorExtracted(errors) {
    errorCountRef.current += errors.length;
    errors.forEach(err => firestore.addError({ ...err, topicId: 'freetalk', tense: '' }));
  }

  function handleMessageSent() {
    messageCountRef.current += 1;
  }

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
      <span style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-primary)' }}>
        Serbest Konuşma
      </span>
      <span className={`badge badge-${level.toLowerCase()}`}>{level}</span>
    </div>
  );

  const empty = (
    <div style={{ textAlign: 'center', maxWidth: 320 }}>
      <p className="text-muted" style={{ fontSize: 'var(--text-sm)' }}>
        İstediğiniz konuda konuşun. MEG tüm dilbilgisi hatalarınızı düzeltecek.
      </p>
    </div>
  );

  if (loading || !systemPrompt) {
    return (
      <div style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        <Skeleton height="48px" radius="12px" />
        <Skeleton height="300px" radius="12px" />
      </div>
    );
  }

  return (
    <ChatInterface
      systemPrompt={systemPrompt}
      topicId="freetalk"
      headerContent={header}
      emptyContent={empty}
      suggestedPrompts={SUGGESTED_PROMPTS}
      onErrorExtracted={handleErrorExtracted}
      onMessageSent={handleMessageSent}
    />
  );
}
