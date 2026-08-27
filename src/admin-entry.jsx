import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { WonderistsAdmin } from '../sanity/components/WonderistsAdmin';

const jsonRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    credentials: 'same-origin',
    ...options,
    headers: {
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'The request could not be completed.');
  return payload;
};

const createAdminClient = () => ({
  fetch: async () => jsonRequest('/api/admin-content'),
  createIfNotExists: async () => undefined,
  patch: (id) => ({
    set: (content) => ({
      commit: async () => jsonRequest('/api/admin-content', {
        method: 'POST',
        body: JSON.stringify({ id, content }),
      }),
    }),
  }),
  assets: {
    upload: async (_kind, file) => {
      const response = await fetch('/api/admin-upload', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'content-type': file.type || 'application/octet-stream',
          'x-file-name': encodeURIComponent(file.name),
        },
        body: file,
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.message || 'The image could not be uploaded.');
      return payload.asset;
    },
  },
});

function Login({ onLogin }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const password = new FormData(event.currentTarget).get('password');
      await jsonRequest('/api/admin-login', { method: 'POST', body: JSON.stringify({ password }) });
      onLogin();
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="wa-login">
      <div className="wa-login__card">
        <section className="wa-login__intro">
          <p className="wa-eyebrow">The Wonderists</p>
          <h1>Website control room.</h1>
          <p>A simpler place to update the website without digging through code or the advanced Sanity Studio.</p>
          <div className="wa-login__points">
            <span>Edit only what matters</span>
            <span>Replace images safely</span>
            <span>Preview and publish in one place</span>
          </div>
        </section>
        <form className="wa-login__form" onSubmit={submit}>
          <p className="wa-eyebrow">Admin login</p>
          <h2>Welcome back.</h2>
          <p>Enter the shared admin password to manage website content.</p>
          {error ? <p className="wa-login__error">{error}</p> : null}
          <label className="wa-field">
            <span>Admin password</span>
            <input name="password" type="password" autoComplete="current-password" required autoFocus />
          </label>
          <button className="wa-button" disabled={busy}>{busy ? 'Checking…' : 'Open dashboard'}</button>
        </form>
      </div>
    </main>
  );
}

function AdminApp() {
  const [session, setSession] = useState('loading');
  const client = useMemo(createAdminClient, []);

  useEffect(() => {
    jsonRequest('/api/admin-session')
      .then(() => setSession('authenticated'))
      .catch(() => setSession('guest'));
  }, []);

  const logout = async () => {
    await jsonRequest('/api/admin-logout', { method: 'POST', body: '{}' }).catch(() => undefined);
    setSession('guest');
  };

  if (session === 'loading') {
    return <div className="wa-session-loading"><div className="wa-loader" /><p>Opening the control room…</p></div>;
  }

  if (session === 'guest') return <Login onLogin={() => setSession('authenticated')} />;
  return <WonderistsAdmin client={client} onLogout={logout} />;
}

createRoot(document.querySelector('#admin-root')).render(<AdminApp />);
