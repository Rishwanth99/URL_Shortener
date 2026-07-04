import type { FormEvent, RefObject } from 'react';
import { Link2, RotateCcw } from 'lucide-react';

type CreateUrlFormProps = {
  originalUrl: string;
  setOriginalUrl: (value: string) => void;
  customAlias: string;
  setCustomAlias: (value: string) => void;
  expiresAt: string;
  setExpiresAt: (value: string) => void;
  loading: boolean;
  expirationInputRef: RefObject<HTMLInputElement | null>;
  onSubmit: (event: FormEvent) => void;
  onReset: () => void;
  onOpenExpirationPicker: () => void;
};

export function CreateUrlForm({
  originalUrl,
  setOriginalUrl,
  customAlias,
  setCustomAlias,
  expiresAt,
  setExpiresAt,
  loading,
  expirationInputRef,
  onSubmit,
  onReset,
  onOpenExpirationPicker
}: CreateUrlFormProps) {
  return (
    <form className="panel" onSubmit={onSubmit}>
      <div className="mb-5 flex items-center gap-3 text-pine">
        <Link2 size={20} />
        <h2 className="text-lg font-bold">Create a short link</h2>
      </div>

      <label className="field-label">
        Destination URL
        <input
          className="field-input"
          value={originalUrl}
          onChange={(event) => setOriginalUrl(event.target.value)}
          placeholder="https://example.com/long/path"
          required
        />
        <span className="mt-1 text-sm text-slate-500">Paste the full website address you want to shorten.</span>
      </label>

      <label className="field-label">
        Custom short name
        <input
          className="field-input"
          value={customAlias}
          onChange={(event) => setCustomAlias(event.target.value)}
          placeholder="optional, 4-32 chars"
        />
        <span className="mt-1 text-sm text-slate-500">Optional. Use letters, numbers, hyphens, or underscores.</span>
      </label>

      <label className="field-label">
        Expiration date (optional)
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={expirationInputRef}
            className="field-input flex-1"
            type="datetime-local"
            value={expiresAt}
            onChange={(event) => setExpiresAt(event.target.value)}
          />
          <button type="button" className="btn-secondary" onClick={onOpenExpirationPicker} title="Select a date and time">
            Select
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setExpiresAt('')}
            title="Clear expiration date"
          >
            Reset
          </button>
        </div>
        <span className="mt-1 text-sm text-slate-500">Choose a date and time when the link should stop working.</span>
      </label>

      <div className="flex items-center gap-3">
        <button className="btn-primary disabled:cursor-wait disabled:opacity-70" type="submit" disabled={loading}>
          {loading ? 'Working...' : 'Create'}
        </button>
        <button type="button" className="btn-secondary" onClick={onReset} title="Reset form">
          <RotateCcw size={16} />
        </button>
      </div>
    </form>
  );
}
