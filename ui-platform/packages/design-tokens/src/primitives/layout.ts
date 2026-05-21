/**
 * Layout dimension primitives
 */

export const breakpoints = {
  /** Mobile - 640px */
  sm: '640px',
  /** Tablet - 768px */
  md: '768px',
  /** Desktop - 1024px */
  lg: '1024px',
  /** Large desktop - 1280px */
  xl: '1280px',
  /** Extra large - 1536px */
  '2xl': '1536px',
} as const;

export const containerWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
} as const;

export const zIndices = {
  /** Below normal content */
  behind: -1,
  /** Normal stacking */
  base: 0,
  /** Dropdowns */
  dropdown: 1000,
  /** Sticky headers */
  sticky: 1100,
  /** Fixed elements */
  fixed: 1200,
  /** Drawer/Sidebar overlays */
  drawer: 1300,
  /** Modal backdrops */
  modalBackdrop: 1400,
  /** Modal content */
  modal: 1500,
  /** Popovers */
  popover: 1600,
  /** Tooltips */
  tooltip: 1700,
  /** Toast notifications */
  toast: 1800,
  /** Maximum - for critical overlays */
  max: 9999,
} as const;

export type Breakpoints = typeof breakpoints;
export type ContainerWidths = typeof containerWidths;
export type ZIndices = typeof zIndices;
