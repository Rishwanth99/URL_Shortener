import { ExternalLink } from 'lucide-react';
import { CreateUrlForm } from './components/CreateUrlForm';
import { LookupPanel } from './components/LookupPanel';
import { useUrlShortener } from './hooks/useUrlShortener';

export function ShortenerApp() {
  const {
    originalUrl,
    setOriginalUrl,
    customAlias,
    setCustomAlias,
    expiresAt,
    setExpiresAt,
    lookupCode,
    setLookupCode,
    created,
    lookupDetails,
    analytics,
    message,
    loading,
    liveUpdatesOn,
    expirationInputRef,
    createUrl,
    loadShortUrlDetails,
    loadAnalytics,
    deactivateCurrentShortUrl,
    copyShortUrl,
    resetForm,
    resetLookup,
    openExpirationPicker
  } = useUrlShortener();

  return (
    <main className="min-h-screen bg-mist p-5 text-ink md:p-8">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="mb-1 text-sm uppercase text-slate-500">AI-assisted engineering prototype</p>
            <h1 className="text-4xl font-bold">Short Link Studio</h1>
          </div>
          <a className="btn-primary" href={`${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080'}/swagger-ui.html`} target="_blank" rel="noreferrer">
            API Docs <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <CreateUrlForm
            originalUrl={originalUrl}
            setOriginalUrl={(value) => {
              setOriginalUrl(value);
            }}
            customAlias={customAlias}
            setCustomAlias={(value) => {
              setCustomAlias(value);
            }}
            expiresAt={expiresAt}
            setExpiresAt={(value) => {
              setExpiresAt(value);
            }}
            loading={loading}
            expirationInputRef={expirationInputRef}
            onSubmit={createUrl}
            onReset={resetForm}
            onOpenExpirationPicker={openExpirationPicker}
          />

          <LookupPanel
            created={created}
            lookupCode={lookupCode}
            setLookupCode={(value) => {
              setLookupCode(value);
            }}
            lookupDetails={lookupDetails}
            analytics={analytics}
            loading={loading}
            liveUpdatesOn={liveUpdatesOn}
            onCopy={copyShortUrl}
            onLoadAnalytics={(code) => void loadAnalytics(code)}
            onViewDetails={() => void loadShortUrlDetails()}
            onDeactivate={() => void deactivateCurrentShortUrl()}
            onReset={resetLookup}
            onRefreshAnalytics={() => void loadAnalytics(lookupCode)}
          />
        </div>

        {message && <p className="mt-4 font-semibold text-orange-800">{message}</p>}
      </section>
    </main>
  );
}
