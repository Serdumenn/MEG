import { useState, useCallback, useEffect } from 'react';
import './Toast.css';

let toastIdCounter = 0;
let globalShowToast = null;

export function showToast(message, type = 'info', duration = 3500) {
  if (globalShowToast) globalShowToast({ id: ++toastIdCounter, message, type, duration });
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const show = useCallback(({ id, message, type, duration }) => {
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  useEffect(() => {
    globalShowToast = show;
    return () => { globalShowToast = null; };
  }, [show]);

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type} animate-slide-down`}>
          <span className="toast-icon">{ICONS[toast.type] || ICONS.info}</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

const ICONS = {
  success: '✓',
  error:   '✕',
  warning: '!',
  info:    'i',
};
