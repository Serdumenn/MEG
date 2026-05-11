import { useCallback } from 'react';
import {
  doc, getDoc, setDoc, updateDoc, addDoc, deleteDoc,
  collection, query, orderBy, limit, getDocs,
  serverTimestamp, increment,
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from './useAuth';

export function useFirestore() {
  const { user } = useAuth();
  const uid = user?.uid;

  // ── User Profile ──────────────────────────────────────────

  const getUserProfile = useCallback(async () => {
    if (!uid) return null;
    try {
      const snap = await getDoc(doc(db, 'users', uid));
      return snap.exists() ? snap.data() : null;
    } catch (err) {
      console.error('getUserProfile failed:', err);
      return null;
    }
  }, [uid]);

  const setUserLevel = useCallback(async (level) => {
    if (!uid) return;
    try {
      await updateDoc(doc(db, 'users', uid), { level });
    } catch (err) {
      console.error('setUserLevel failed:', err);
      throw err;
    }
  }, [uid]);

  // ── Progress ──────────────────────────────────────────────

  const getProgress = useCallback(async (topicId) => {
    if (!uid) return null;
    try {
      const snap = await getDoc(doc(db, 'users', uid, 'progress', topicId));
      return snap.exists() ? snap.data() : null;
    } catch (err) {
      console.error('getProgress failed:', err);
      return null;
    }
  }, [uid]);

  const getAllProgress = useCallback(async () => {
    if (!uid) return [];
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'progress'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('getAllProgress failed:', err);
      return [];
    }
  }, [uid]);

  const updateProgress = useCallback(async ({ topicId, topicName, sessionErrors, messageCount }) => {
    if (!uid) return;
    try {
      const ref = doc(db, 'users', uid, 'progress', topicId);
      const snap = await getDoc(ref);

      const sessionAccuracy = messageCount > 0
        ? Math.round((1 - sessionErrors / messageCount) * 100)
        : 100;

      if (snap.exists()) {
        const data = snap.data();
        // Running average of accuracy across sessions
        const newAccuracy = Math.round(
          (data.accuracyRate * data.practiceCount + sessionAccuracy) / (data.practiceCount + 1)
        );
        await updateDoc(ref, {
          practiceCount: increment(1),
          lastPracticed: serverTimestamp(),
          accuracyRate: newAccuracy,
          errorCount: increment(sessionErrors),
        });
      } else {
        await setDoc(ref, {
          topicId,
          topicName,
          practiceCount: 1,
          lastPracticed: serverTimestamp(),
          accuracyRate: sessionAccuracy,
          errorCount: sessionErrors,
        });
      }
    } catch (err) {
      console.error('updateProgress failed:', err);
    }
  }, [uid]);

  // ── Errors ────────────────────────────────────────────────

  const addError = useCallback(async ({ wrong, correct, rule, topicId, tense }) => {
    if (!uid) return;
    try {
      await addDoc(collection(db, 'users', uid, 'errors'), {
        wrong, correct, rule,
        topicId, tense: tense || '',
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error('addError failed:', err);
    }
  }, [uid]);

  const getRecentErrors = useCallback(async (n = 10) => {
    if (!uid) return [];
    try {
      const q = query(
        collection(db, 'users', uid, 'errors'),
        orderBy('createdAt', 'desc'),
        limit(n),
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('getRecentErrors failed:', err);
      return [];
    }
  }, [uid]);

  const getAllErrors = useCallback(async () => {
    if (!uid) return [];
    try {
      const q = query(
        collection(db, 'users', uid, 'errors'),
        orderBy('createdAt', 'desc'),
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('getAllErrors failed:', err);
      return [];
    }
  }, [uid]);

  // ── Verb Errors ───────────────────────────────────────────

  const getVerbError = useCallback(async (verbId) => {
    if (!uid) return null;
    try {
      const snap = await getDoc(doc(db, 'users', uid, 'verbErrors', verbId));
      return snap.exists() ? snap.data() : null;
    } catch (err) {
      console.error('getVerbError failed:', err);
      return null;
    }
  }, [uid]);

  const getAllVerbErrors = useCallback(async () => {
    if (!uid) return [];
    try {
      const snap = await getDocs(collection(db, 'users', uid, 'verbErrors'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('getAllVerbErrors failed:', err);
      return [];
    }
  }, [uid]);

  const recordVerbError = useCallback(async ({ verb, v2, v3 }) => {
    if (!uid) return;
    try {
      const id = verb.toLowerCase();
      const ref = doc(db, 'users', uid, 'verbErrors', id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        await updateDoc(ref, {
          wrongAttempts: increment(1),
          lastAttempted: serverTimestamp(),
        });
      } else {
        await setDoc(ref, {
          verb, v2, v3,
          wrongAttempts: 1,
          lastAttempted: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('recordVerbError failed:', err);
    }
  }, [uid]);

  const markVerbCorrect = useCallback(async (verbId) => {
    if (!uid) return;
    try {
      const ref = doc(db, 'users', uid, 'verbErrors', verbId);
      const snap = await getDoc(ref);
      if (snap.exists() && snap.data().wrongAttempts > 0) {
        await updateDoc(ref, {
          wrongAttempts: increment(-1),
          lastAttempted: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error('markVerbCorrect failed:', err);
    }
  }, [uid]);

  // ── Sessions ──────────────────────────────────────────────

  const startSession = useCallback(async (topicId) => {
    if (!uid) return null;
    try {
      const docRef = await addDoc(collection(db, 'users', uid, 'sessions'), {
        startTime: serverTimestamp(),
        endTime: null,
        topicId: topicId || 'freetalk',
        messageCount: 0,
        errorCount: 0,
      });
      return docRef.id;
    } catch (err) {
      console.error('startSession failed:', err);
      return null;
    }
  }, [uid]);

  const endSession = useCallback(async (sessionId, { messageCount, errorCount, durationMin }) => {
    if (!uid || !sessionId) return;
    try {
      await updateDoc(doc(db, 'users', uid, 'sessions', sessionId), {
        endTime: serverTimestamp(),
        messageCount: messageCount || 0,
        errorCount: errorCount || 0,
      });
      // Update user totals
      await updateDoc(doc(db, 'users', uid), {
        totalMinutes: increment(durationMin || 0),
        totalSessions: increment(1),
      });
    } catch (err) {
      console.error('endSession failed:', err);
    }
  }, [uid]);

  const getRecentSessions = useCallback(async (n = 10) => {
    if (!uid) return [];
    try {
      const q = query(
        collection(db, 'users', uid, 'sessions'),
        orderBy('startTime', 'desc'),
        limit(n),
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('getRecentSessions failed:', err);
      return [];
    }
  }, [uid]);

  // ── Prompt Data (parallel fetch) ──────────────────────────

  const getPromptData = useCallback(async () => {
    if (!uid) return null;
    try {
      const [profile, progressList, recentErrors, verbErrors] = await Promise.all([
        getUserProfile(),
        getAllProgress(),
        getRecentErrors(10),
        getAllVerbErrors(),
      ]);
      return {
        displayName: user?.displayName || '',
        level: profile?.level || 'A1',
        totalMinutes: profile?.totalMinutes || 0,
        totalSessions: profile?.totalSessions || 0,
        progressList,
        recentErrors,
        verbErrors,
      };
    } catch (err) {
      console.error('getPromptData failed:', err);
      return null;
    }
  }, [uid, user, getUserProfile, getAllProgress, getRecentErrors, getAllVerbErrors]);

  // ── Danger Zone ───────────────────────────────────────────

  const resetProgress = useCallback(async () => {
    if (!uid) return;
    try {
      for (const sub of ['progress', 'errors', 'verbErrors', 'sessions']) {
        const snap = await getDocs(collection(db, 'users', uid, sub));
        await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
      }
      await updateDoc(doc(db, 'users', uid), {
        totalMinutes: 0,
        totalSessions: 0,
      });
    } catch (err) {
      console.error('resetProgress failed:', err);
      throw err;
    }
  }, [uid]);

  const resetEverything = useCallback(async () => {
    if (!uid) return;
    try {
      await resetProgress();
      await deleteDoc(doc(db, 'users', uid));
    } catch (err) {
      console.error('resetEverything failed:', err);
      throw err;
    }
  }, [uid, resetProgress]);

  return {
    getUserProfile, setUserLevel,
    getProgress, getAllProgress, updateProgress,
    addError, getRecentErrors, getAllErrors,
    getVerbError, getAllVerbErrors, recordVerbError, markVerbCorrect,
    startSession, endSession, getRecentSessions,
    getPromptData,
    resetProgress, resetEverything,
  };
}
