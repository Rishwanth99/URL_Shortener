import { BarChart3, Copy } from 'lucide-react';
import type { AnalyticsResponse, UrlResponse } from '../types';
import { MetricCard } from './MetricCard';

type LookupPanelProps = {
  created: UrlResponse | null;
  lookupCode: string;
  setLookupCode: (value: string) => void;
  lookupDetails: UrlResponse | null;
  analytics: AnalyticsResponse | null;
  loading: boolean;
  liveUpdatesOn: boolean;
  onCopy: () => void;
  onLoadAnalytics: (code?: string) => void;
  onViewDetails: () => void;
  onDeactivate: () => void;
  onReset: () => void;
  onRefreshAnalytics: () => void;
};

export function LookupPanel({
  created,
  lookupCode,
  setLookupCode,
  lookupDetails,
  analytics,
  loading,
  liveUpdatesOn,
  onCopy,
  onLoadAnalytics,
  onViewDetails,
  onDeactivate,
  onReset,
  onRefreshAnalytics
}: LookupPanelProps) {
  return (
    <section className="panel">
      <div className="mb-5 flex items-center gap-3 text-pine">
        <BarChart3 size={20} />
        <h2 className="text-lg font-bold">Results & live analytics</h2>
      </div>

      {created ? (
        <div className="mb-4 overflow-hidden rounded-lg border border-slate-200 p-4">
          <span className="mb-1 block text-sm text-slate-500">Your short link</span>
          <a className="break-all font-bold text-pine" href={created.shortUrl} target="_blank" rel="noreferrer">
            {created.shortUrl}
          </a>
          <div className="mt-3 flex items-center gap-3">
            <button type="button" className="btn-secondary" onClick={onCopy} title="Copy short URL">
              <Copy size={16} />
            </button>
            <button type="button" className="btn-secondary" onClick={() => onLoadAnalytics(created.shortCode)}>
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
          placeholder="demo-link"
        />
        <span className="mt-1 text-sm text-slate-500">Enter the short code to view details, analytics, or deactivate the link.</span>
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button className="btn-primary" type="button" onClick={onViewDetails} disabled={loading}>
          {loading ? 'Working...' : 'View Details'}
        </button>
        <button className="btn-secondary" type="button" onClick={() => onLoadAnalytics()} disabled={loading}>
          Load Analytics
        </button>
        <button className="btn-secondary" type="button" onClick={onDeactivate} disabled={loading}>
          Deactivate
        </button>
        <button type="button" className="btn-secondary" onClick={onReset} title="Clear lookup code">
          Reset
        </button>
      </div>

      {lookupDetails && (
        <div className="mt-4 rounded-lg border border-slate-200 p-4">
          <span className="mb-1 block text-sm text-slate-500">Short URL details</span>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="font-semibold text-slate-600">Code</dt>
              <dd>{lookupDetails.shortCode}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="font-semibold text-slate-600">Active</dt>
              <dd>{lookupDetails.active ? 'Yes' : 'No'}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="font-semibold text-slate-600">Original URL</dt>
              <dd className="break-all text-right">{lookupDetails.originalUrl}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="font-semibold text-slate-600">Clicks</dt>
              <dd>{lookupDetails.clickCount}</dd>
            </div>
          </dl>
        </div>
      )}

      {analytics && (
        <>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <MetricCard label="Total clicks" value={analytics.totalClicks} />
            <MetricCard label="Last 24 hours" value={analytics.clicksLast24Hours} />
            <MetricCard label="Last hour" value={analytics.clicksLastHour} />
            <MetricCard label="Today" value={analytics.clicksToday} />
            <MetricCard label="Unique visitors" value={analytics.uniqueVisitors} fullWidth />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-500">{liveUpdatesOn ? 'Live updates are on and refresh every 15 seconds.' : 'Enable live updates by loading analytics.'}</p>
            <button type="button" className="btn-secondary" onClick={onRefreshAnalytics} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
