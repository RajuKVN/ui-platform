/**
 * Format a number as currency
 */
export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions & { locale?: string } = {}
): string {
  const { locale = 'en-US', ...formatOptions } = options;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    ...formatOptions,
  }).format(value);
}

/**
 * Format a number with commas
 */
export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions & { locale?: string } = {}
): string {
  const { locale = 'en-US', ...formatOptions } = options;
  return new Intl.NumberFormat(locale, formatOptions).format(value);
}

/**
 * Format a number as percentage
 */
export function formatPercent(
  value: number,
  options: Intl.NumberFormatOptions & { locale?: string } = {}
): string {
  const { locale = 'en-US', ...formatOptions } = options;
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    ...formatOptions,
  }).format(value);
}

/**
 * Format a date
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions & { locale?: string } = {}
): string {
  const { locale = 'en-US', ...formatOptions } = options;
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, formatOptions).format(d);
}

/**
 * Format a relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(
  date: Date | string | number,
  options: { locale?: string } = {}
): string {
  const { locale = 'en-US' } = options;
  const d = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second');
  }
  if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  }
  if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  }
  if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  }
  if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
  }
  return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
}

/**
 * Format bytes to human-readable size
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
