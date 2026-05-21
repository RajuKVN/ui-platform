/**
 * Elevation (shadow) primitives
 * Uses layered shadows for more realistic depth
 */
export const primitiveElevation = {
  none: 'none',
  
  /** Subtle lift - for hover states */
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  
  /** Cards and raised surfaces */
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  
  /** Dropdowns and popovers */
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  
  /** Modals and dialogs */
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  
  /** High emphasis elements */
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  
  /** Maximum elevation */
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  
  /** Inset shadow */
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} as const;

export type PrimitiveElevation = typeof primitiveElevation;
