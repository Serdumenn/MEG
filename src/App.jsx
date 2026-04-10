import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { useAuth } from './hooks/useAuth';
import { useFirestore } from './hooks/useFirestore';
import ErrorBoundary from './components/ErrorBoundary';
import Nav            from './components/Nav';
import ToastContainer from './components/Toast';
import LevelSelect    from './components/LevelSelect';
import Login          from './pages/Login';
import Home           from './pages/Home';
import TopicsLibrary  from './pages/TopicsLibrary';
import TopicLesson    from './pages/TopicLesson';
import Practice       from './pages/Practice';
import FreeTalk       from './pages/FreeTalk';
import Progress       from './pages/Progress';
import Settings       from './pages/Settings';
import Verbs          from './pages/Verbs';

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const { getUserProfile, setUserLevel } = useFirestore();
  const [level, setLevel]               = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [isOffline, setIsOffline]       = useState(!navigator.onLine);

  useEffect(() => {
    const goOnline  = () => setIsOffline(false);
    const goOffline = () => setIsOffline(true);
    window.addEventListener('online',  goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online',  goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  // Fetch user profile once authenticated
  useEffect(() => {
    if (!user) { setProfileLoading(false); return; }
    let cancelled = false;
    (async () => {
      const profile = await getUserProfile();
      if (!cancelled) {
        setLevel(profile?.level || null);
        setProfileLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user, getUserProfile]);

  // Loading spinner while auth initializes
  if (authLoading || (user && profileLoading)) {
    return (
      <div className="app-loading">
        <div className="app-loading-spinner" />
        <span className="app-loading-text">MEG</span>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }

  // Logged in but no level selected
  if (!level) {
    return (
      <>
        <LevelSelect onSelect={async (lv) => {
          await setUserLevel(lv);
          setLevel(lv);
        }} />
        <ToastContainer />
      </>
    );
  }

  // Full app shell
  return (
    <HashRouter>
      <div className="app-shell">
        {isOffline && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
            background: '#333', color: '#ececec', textAlign: 'center',
            padding: '8px 16px', fontSize: '0.8rem', fontWeight: 500,
          }}>
            Çevrimdışı — internet bağlantınızı kontrol edin
          </div>
        )}
        <Nav />
        <main className="main-content">
          <ErrorBoundary>
            <Routes>
              <Route path="/"                  element={<Home />} />
              <Route path="/topics"            element={<TopicsLibrary />} />
              <Route path="/lesson/:topicId"   element={<TopicLesson />} />
              <Route path="/practice/:topicId" element={<Practice />} />
              <Route path="/freetalk"          element={<FreeTalk />} />
              <Route path="/progress"          element={<Progress />} />
              <Route path="/settings"          element={<Settings />} />
              <Route path="/verbs"             element={<Verbs />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <ToastContainer />
      </div>
    </HashRouter>
  );
}

