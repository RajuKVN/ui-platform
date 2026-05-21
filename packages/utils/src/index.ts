/**
 * @ui-platform/utils
 * Utility functions for the UI Platform
 */

export {
  formatCurrency,
  formatNumber,
  formatPercent,
  formatDate,
  formatRelativeTime,
  formatBytes,
} from './format';

export {
  capitalize,
  toTitleCase,
  toKebabCase,
  toCamelCase,
  truncate,
  getInitials,
  slugify,
} from './string';

export { deepMerge, isPlainObject, pick, omit, deepClone } from './object';

export { groupBy, unique, uniqueBy, chunk, sortBy, shuffle } from './array';
