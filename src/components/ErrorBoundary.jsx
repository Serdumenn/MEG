import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', height: '60vh', gap: '1rem', padding: '2rem',
          textAlign: 'center', color: 'var(--text-primary, #ececec)',
        }}>
          <div style={{ fontSize: '2.5rem' }}>!</div>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Bir hata olustu</h2>
          <p style={{ margin: 0, color: 'var(--text-muted, #8b8b8b)', fontSize: '0.875rem' }}>
            Beklenmeyen bir sorun olustu. Sayfayi yenilemeyi deneyin.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '0.5rem', padding: '0.625rem 1.5rem',
              background: 'var(--accent, #cc785c)', color: '#fff',
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontSize: '0.875rem', fontWeight: 500,
            }}
          >
            Sayfayi Yenile
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
