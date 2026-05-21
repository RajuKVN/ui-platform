/**
 * Border radius primitives
 */
export const primitiveRadius = {
  /** 0px */
  none: '0px',
  /** 2px */
  sm: '0.125rem',
  /** 4px */
  DEFAULT: '0.25rem',
  /** 6px */
  md: '0.375rem',
  /** 8px */
  lg: '0.5rem',
  /** 12px */
  xl: '0.75rem',
  /** 16px */
  '2xl': '1rem',
  /** 24px */
  '3xl': '1.5rem',
  /** 9999px */
  full: '9999px',
} as const;

export type PrimitiveRadius = typeof primitiveRadius;
