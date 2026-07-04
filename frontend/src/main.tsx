import React, { FormEvent, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BarChart3, Copy, ExternalLink, Link2, RotateCcw } from 'lucide-react';
import './styles.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

type UrlResponse = {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  customAlias: boolean;
  active: boolean;
  clickCount: number;
  createdAt: string;
  expiresAt?: string;
};

type AnalyticsResponse = {
  shortCode: string;
  originalUrl: string;
  totalClicks: number;
  clicksLast24Hours: number;
  recentClicks: { clickedAt: string }[];
};

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [lookupCode, setLookupCode] = useState('');
  const [created, setCreated] = useState<UrlResponse | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function createUrl(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setAnalytics(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/urls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalUrl,
          customAlias: customAlias || null,
          expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null
        })
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.message ?? 'Unable to create short URL');
      }
      setCreated(body);
      setLookupCode(body.shortCode);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  async function loadAnalytics(code = lookupCode) {
    if (!code) {
      setMessage('Enter a short code first.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/urls/${code}/analytics`);
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.message ?? 'Unable to load analytics');
      }
      setAnalytics(body);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  async function copyShortUrl() {
    if (!created) return;
    await navigator.clipboard.writeText(created.shortUrl);
    setMessage('Short URL copied.');
  }

  function resetForm() {
    setOriginalUrl('');
    setCustomAlias('');
    setExpiresAt('');
    setCreated(null);
    setAnalytics(null);
    setMessage('');
  }

  return (
    <main className="min-h-screen bg-mist p-5 text-ink md:p-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-1 text-sm uppercase text-slate-500">AI-assisted engineering prototype</p>
            <h1 className="text-4xl font-bold">URL Shortener</h1>
          </div>
          <a className="btn-primary" href={`${API_BASE_URL}/swagger-ui.html`} target="_blank" rel="noreferrer">
            API Docs <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <form className="panel" onSubmit={createUrl}>
            <div className="mb-5 flex items-center gap-3 text-pine">
              <Link2 size={20} />
              <h2 className="text-lg font-bold">Create Short URL</h2>
            </div>

            <label className="field-label">
              Original HTTPS URL
              <input
                className="field-input"
                value={originalUrl}
                onChange={(event) => setOriginalUrl(event.target.value)}
                placeholder="https://example.com/long/path"
                required
              />
            </label>

            <label className="field-label">
              Custom alias
              <input
                className="field-input"
                value={customAlias}
                onChange={(event) => setCustomAlias(event.target.value)}
                placeholder="optional, 4-32 chars"
              />
            </label>

            <label className="field-label">
              Expiration
              <input
                className="field-input"
                type="datetime-local"
                value={expiresAt}
                onChange={(event) => setExpiresAt(event.target.value)}
              />
            </label>

            <div className="flex items-center gap-3">
              <button className="btn-primary disabled:cursor-wait disabled:opacity-70" type="submit" disabled={loading}>
                {loading ? 'Working...' : 'Create'}
              </button>
              <button type="button" className="btn-secondary" onClick={resetForm} title="Reset form">
                <RotateCcw size={16} />
              </button>
            </div>
          </form>

          <section className="panel">
            <div className="mb-5 flex items-center gap-3 text-pine">
              <BarChart3 size={20} />
              <h2 className="text-lg font-bold">Result & Analytics</h2>
            </div>

            {created ? (
              <div className="mb-4 overflow-hidden rounded-lg border border-slate-200 p-4">
                <span className="mb-1 block text-sm text-slate-500">Short URL</span>
                <a className="break-all font-bold text-pine" href={created.shortUrl} target="_blank" rel="noreferrer">{created.shortUrl}</a>
                <div className="mt-3 flex items-center gap-3">
                  <button type="button" className="btn-secondary" onClick={copyShortUrl} title="Copy short URL">
                    <Copy size={16} />
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => loadAnalytics(created.shortCode)}>
                    Analytics
                  </button>
                </div>
              </div>
            ) : (
              <p className="mb-4 text-slate-500">Create a short URL to see the generated link and analytics.</p>
            )}

            <label className="field-label">
              Lookup short code
              <input
                className="field-input"
                value={lookupCode}
                onChange={(event) => setLookupCode(event.target.value)}
                placeholder="eng-docs"
              />
            </label>
            <button className="btn-primary" type="button" onClick={() => loadAnalytics()}>Load Analytics</button>

            {analytics && (
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-200 p-4">
                  <span className="mb-1 block text-sm text-slate-500">Total clicks</span>
                  <strong className="text-3xl">{analytics.totalClicks}</strong>
                </div>
                <div className="rounded-lg border border-slate-200 p-4">
                  <span className="mb-1 block text-sm text-slate-500">Last 24 hours</span>
                  <strong className="text-3xl">{analytics.clicksLast24Hours}</strong>
                </div>
              </div>
            )}

            {message && <p className="mt-4 font-semibold text-orange-800">{message}</p>}
          </section>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
