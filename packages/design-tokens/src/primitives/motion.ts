/**
 * Motion primitives for animations and transitions
 */

export const durations = {
  /** 0ms - instant */
  0: '0ms',
  /** 75ms - micro interactions */
  75: '75ms',
  /** 100ms - quick feedback */
  100: '100ms',
  /** 150ms - fast transitions */
  150: '150ms',
  /** 200ms - standard transitions */
  200: '200ms',
  /** 300ms - medium transitions */
  300: '300ms',
  /** 500ms - slow transitions */
  500: '500ms',
  /** 700ms - very slow */
  700: '700ms',
  /** 1000ms - dramatic */
  1000: '1000ms',
} as const;

export const easings = {
  /** No easing */
  linear: 'linear',
  /** Standard ease-in */
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  /** Standard ease-out */
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  /** Standard ease-in-out */
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** Bouncy - for playful interactions */
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  /** Elastic - for spring-like motion */
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  /** Sharp - for snappy transitions */
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

export type Durations = typeof durations;
export type Easings = typeof easings;
