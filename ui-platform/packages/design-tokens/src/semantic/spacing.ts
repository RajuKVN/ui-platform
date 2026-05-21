/**
 * Semantic spacing tokens
 * Named for their purpose rather than raw values
 */

export interface SemanticSpacingTokens {
  /** No spacing */
  none: string;
  /** Extra extra small - 2px */
  '2xs': string;
  /** Extra small - 4px */
  xs: string;
  /** Small - 8px */
  sm: string;
  /** Medium - 12px */
  md: string;
  /** Large - 16px */
  lg: string;
  /** Extra large - 24px */
  xl: string;
  /** Extra extra large - 32px */
  '2xl': string;
  /** Extra extra extra large - 48px */
  '3xl': string;
  /** Huge - 64px */
  '4xl': string;
}

export const semanticSpacing: SemanticSpacingTokens = {
  none: 'var(--spacing-none)',
  '2xs': 'var(--spacing-2xs)',
  xs: 'var(--spacing-xs)',
  sm: 'var(--spacing-sm)',
  md: 'var(--spacing-md)',
  lg: 'var(--spacing-lg)',
  xl: 'var(--spacing-xl)',
  '2xl': 'var(--spacing-2xl)',
  '3xl': 'var(--spacing-3xl)',
  '4xl': 'var(--spacing-4xl)',
};

/**
 * Component-specific spacing
 */
export interface ComponentSpacingTokens {
  /** Inline padding for buttons, inputs */
  inlineXs: string;
  inlineSm: string;
  inlineMd: string;
  inlineLg: string;
  inlineXl: string;
  
  /** Block padding for containers */
  blockXs: string;
  blockSm: string;
  blockMd: string;
  blockLg: string;
  blockXl: string;
  
  /** Gap between items */
  gapXs: string;
  gapSm: string;
  gapMd: string;
  gapLg: string;
  gapXl: string;
}

export const componentSpacing: ComponentSpacingTokens = {
  inlineXs: 'var(--spacing-inline-xs)',
  inlineSm: 'var(--spacing-inline-sm)',
  inlineMd: 'var(--spacing-inline-md)',
  inlineLg: 'var(--spacing-inline-lg)',
  inlineXl: 'var(--spacing-inline-xl)',
  
  blockXs: 'var(--spacing-block-xs)',
  blockSm: 'var(--spacing-block-sm)',
  blockMd: 'var(--spacing-block-md)',
  blockLg: 'var(--spacing-block-lg)',
  blockXl: 'var(--spacing-block-xl)',
  
  gapXs: 'var(--spacing-gap-xs)',
  gapSm: 'var(--spacing-gap-sm)',
  gapMd: 'var(--spacing-gap-md)',
  gapLg: 'var(--spacing-gap-lg)',
  gapXl: 'var(--spacing-gap-xl)',
};
