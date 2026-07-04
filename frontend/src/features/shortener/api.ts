import type { AnalyticsResponse, CreateUrlRequest, UrlResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);
  let payload: unknown = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const fallbackMessage = getFallbackMessage(path);
    const apiMessage = typeof payload === 'object' && payload !== null && 'message' in payload
      ? String((payload as { message?: string }).message ?? '')
      : '';
    throw new Error(apiMessage || fallbackMessage);
  }

  return payload as T;
}

function getFallbackMessage(path: string) {
  if (path.includes('/analytics')) {
    return 'Unable to load analytics';
  }
  if (path.includes('/urls/')) {
    return 'The requested short link could not be loaded';
  }
  return 'Unable to complete the request';
}

export async function createShortUrl(payload: CreateUrlRequest): Promise<UrlResponse> {
  return request<UrlResponse>('/api/v1/urls', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function getShortUrlDetails(code: string): Promise<UrlResponse> {
  return request<UrlResponse>(`/api/v1/urls/${encodeURIComponent(code)}`);
}

export async function getAnalytics(code: string): Promise<AnalyticsResponse> {
  return request<AnalyticsResponse>(`/api/v1/urls/${encodeURIComponent(code)}/analytics`);
}

export async function deactivateShortUrl(code: string): Promise<void> {
  await request(`/api/v1/urls/${encodeURIComponent(code)}`, { method: 'DELETE' });
}
