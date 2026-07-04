import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { createShortUrl, deactivateShortUrl, getAnalytics, getShortUrlDetails } from '../api';
import type { AnalyticsResponse, UrlResponse } from '../types';
import { validateShortCode } from '../validation';

export function useUrlShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [lookupCode, setLookupCode] = useState('');
  const [created, setCreated] = useState<UrlResponse | null>(null);
  const [lookupDetails, setLookupDetails] = useState<UrlResponse | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [liveUpdatesOn, setLiveUpdatesOn] = useState(false);
  const expirationInputRef = useRef<HTMLInputElement | null>(null);

  const loadAnalytics = useCallback(async (code = lookupCode) => {
    const validationError = validateShortCode(code);
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const response = await getAnalytics(code);
      setAnalytics(response);
      setLookupCode(code.trim());
      setLiveUpdatesOn(true);
      setMessage('Analytics refreshed.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }, [lookupCode]);

  async function createUrl(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setAnalytics(null);
    try {
      const response = await createShortUrl({
        originalUrl,
        customAlias: customAlias || null,
        expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null
      });
      setCreated(response);
      setLookupCode(response.shortCode);
      setMessage(`Short link created. Share ${response.shortUrl} with your audience.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  async function loadShortUrlDetails(code = lookupCode) {
    const validationError = validateShortCode(code);
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      const details = await getShortUrlDetails(code);
      setLookupDetails(details);
      setCreated(details);
      setAnalytics(null);
      setLookupCode(code.trim());
      setLiveUpdatesOn(false);
      setMessage('Short link details loaded.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  async function deactivateCurrentShortUrl(code = lookupCode) {
    const validationError = validateShortCode(code);
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await deactivateShortUrl(code);
      setMessage(`Short link ${code.trim()} is now inactive.`);
      setCreated((current) => current?.shortCode === code.trim() ? { ...current, active: false } : current);
      setLookupDetails((current) => current?.shortCode === code.trim() ? { ...current, active: false } : current);
      setAnalytics(null);
      setLookupCode(code.trim());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  }

  async function copyShortUrl() {
    if (!created) return;
    try {
      await navigator.clipboard.writeText(created.shortUrl);
      setMessage('Short link copied to your clipboard.');
    } catch {
      setMessage('Copy failed. Please copy the link manually.');
    }
  }

  function resetForm() {
    setOriginalUrl('');
    setCustomAlias('');
    setExpiresAt('');
    setLookupCode('');
    setCreated(null);
    setLookupDetails(null);
    setAnalytics(null);
    setMessage('');
    setLiveUpdatesOn(false);
  }

  function resetLookup() {
    setLookupCode('');
    setLookupDetails(null);
    setAnalytics(null);
    setMessage('');
    setLiveUpdatesOn(false);
  }

  function openExpirationPicker() {
    const input = expirationInputRef.current;
    if (!input) return;

    if (typeof input.showPicker === 'function') {
      input.showPicker();
    } else {
      input.focus();
    }
  }

  useEffect(() => {
    if (!analytics || !lookupCode || !liveUpdatesOn) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void loadAnalytics(lookupCode);
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, [analytics, lookupCode, liveUpdatesOn, loadAnalytics]);

  return {
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
    openExpirationPicker,
    setMessage
  };
}
