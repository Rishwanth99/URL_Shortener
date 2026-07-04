export type UrlResponse = {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  customAlias: boolean;
  active: boolean;
  clickCount: number;
  createdAt: string;
  expiresAt?: string;
};

export type AnalyticsResponse = {
  shortCode: string;
  originalUrl: string;
  totalClicks: number;
  clicksLast24Hours: number;
  clicksLastHour: number;
  clicksToday: number;
  uniqueVisitors: number;
  recentClicks: { clickedAt: string }[];
};

export type CreateUrlRequest = {
  originalUrl: string;
  customAlias: string | null;
  expiresAt: string | null;
};
