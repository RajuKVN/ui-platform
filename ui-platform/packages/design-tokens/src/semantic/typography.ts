/**
 * Semantic typography tokens
 */

export interface TypographyToken {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
}

export interface SemanticTypographyTokens {
  /** Display styles for hero sections */
  display: {
    '2xl': TypographyToken;
    xl: TypographyToken;
    lg: TypographyToken;
    md: TypographyToken;
    sm: TypographyToken;
  };

  /** Heading styles */
  heading: {
    h1: TypographyToken;
    h2: TypographyToken;
    h3: TypographyToken;
    h4: TypographyToken;
    h5: TypographyToken;
    h6: TypographyToken;
  };

  /** Body text styles */
  body: {
    lg: TypographyToken;
    md: TypographyToken;
    sm: TypographyToken;
    xs: TypographyToken;
  };

  /** Label styles */
  label: {
    lg: TypographyToken;
    md: TypographyToken;
    sm: TypographyToken;
  };

  /** Code/monospace styles */
  code: {
    lg: TypographyToken;
    md: TypographyToken;
    sm: TypographyToken;
  };
}

export const semanticTypography: SemanticTypographyTokens = {
  display: {
    '2xl': {
      fontSize: 'var(--font-size-7xl)',
      lineHeight: 'var(--line-height-tight)',
      fontWeight: 'var(--font-weight-bold)',
      letterSpacing: 'var(--letter-spacing-tight)',
    },
    xl: {
      fontSize: 'var(--font-size-6xl)',
      lineHeight: 'var(--line-height-tight)',
      fontWeight: 'var(--font-weight-bold)',
      letterSpacing: 'var(--letter-spacing-tight)',
    },
    lg: {
      fontSize: 'var(--font-size-5xl)',
      lineHeight: 'var(--line-height-tight)',
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: 'var(--letter-spacing-tight)',
    },
    md: {
      fontSize: 'var(--font-size-4xl)',
      lineHeight: 'var(--line-height-snug)',
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    sm: {
      fontSize: 'var(--font-size-3xl)',
      lineHeight: 'var(--line-height-snug)',
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
  },
  heading: {
    h1: {
      fontSize: 'var(--font-size-3xl)',
      lineHeight: 'var(--line-height-tight)',
      fontWeight: 'var(--font-weight-bold)',
      letterSpacing: 'var(--letter-spacing-tight)',
    },
    h2: {
      fontSize: 'var(--font-size-2xl)',
      lineHeight: 'var(--line-height-tight)',
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    h3: {
      fontSize: 'var(--font-size-xl)',
      lineHeight: 'var(--line-height-snug)',
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    h4: {
      fontSize: 'var(--font-size-lg)',
      lineHeight: 'var(--line-height-snug)',
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    h5: {
      fontSize: 'var(--font-size-base)',
      lineHeight: 'var(--line-height-normal)',
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    h6: {
      fontSize: 'var(--font-size-sm)',
      lineHeight: 'var(--line-height-normal)',
      fontWeight: 'var(--font-weight-semibold)',
      letterSpacing: 'var(--letter-spacing-wide)',
    },
  },
  body: {
    lg: {
      fontSize: 'var(--font-size-lg)',
      lineHeight: 'var(--line-height-relaxed)',
      fontWeight: 'var(--font-weight-normal)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    md: {
      fontSize: 'var(--font-size-base)',
      lineHeight: 'var(--line-height-normal)',
      fontWeight: 'var(--font-weight-normal)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    sm: {
      fontSize: 'var(--font-size-sm)',
      lineHeight: 'var(--line-height-normal)',
      fontWeight: 'var(--font-weight-normal)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    xs: {
      fontSize: 'var(--font-size-xs)',
      lineHeight: 'var(--line-height-normal)',
      fontWeight: 'var(--font-weight-normal)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
  },
  label: {
    lg: {
      fontSize: 'var(--font-size-base)',
      lineHeight: 'var(--line-height-tight)',
      fontWeight: 'var(--font-weight-medium)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    md: {
      fontSize: 'var(--font-size-sm)',
      lineHeight: 'var(--line-height-tight)',
      fontWeight: 'var(--font-weight-medium)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    sm: {
      fontSize: 'var(--font-size-xs)',
      lineHeight: 'var(--line-height-tight)',
      fontWeight: 'var(--font-weight-medium)',
      letterSpacing: 'var(--letter-spacing-wide)',
    },
  },
  code: {
    lg: {
      fontSize: 'var(--font-size-base)',
      lineHeight: 'var(--line-height-relaxed)',
      fontWeight: 'var(--font-weight-normal)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    md: {
      fontSize: 'var(--font-size-sm)',
      lineHeight: 'var(--line-height-relaxed)',
      fontWeight: 'var(--font-weight-normal)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
    sm: {
      fontSize: 'var(--font-size-xs)',
      lineHeight: 'var(--line-height-relaxed)',
      fontWeight: 'var(--font-weight-normal)',
      letterSpacing: 'var(--letter-spacing-normal)',
    },
  },
};
