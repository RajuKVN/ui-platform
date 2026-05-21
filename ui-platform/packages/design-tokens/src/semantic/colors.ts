/**
 * Semantic color tokens
 * These map to CSS variables and are used throughout the UI
 */

export interface SemanticColorTokens {
  // Background colors
  background: {
    /** Main app background */
    DEFAULT: string;
    /** Subtle background for sections */
    subtle: string;
    /** Muted background for disabled states */
    muted: string;
    /** Emphasized background */
    emphasized: string;
    /** Inverse background for high contrast */
    inverse: string;
  };

  // Foreground/text colors
  foreground: {
    /** Primary text color */
    DEFAULT: string;
    /** Secondary/muted text */
    muted: string;
    /** Subtle text for placeholders */
    subtle: string;
    /** Inverse text on dark backgrounds */
    inverse: string;
  };

  // Surface colors (cards, modals, etc.)
  surface: {
    /** Default surface */
    DEFAULT: string;
    /** Raised surface (cards) */
    raised: string;
    /** Overlay surface (modals) */
    overlay: string;
    /** Sunken surface (inset areas) */
    sunken: string;
  };

  // Border colors
  border: {
    /** Default border */
    DEFAULT: string;
    /** Subtle border */
    subtle: string;
    /** Strong border for emphasis */
    strong: string;
    /** Focus ring color */
    focus: string;
  };

  // Primary brand colors
  primary: {
    DEFAULT: string;
    foreground: string;
    hover: string;
    active: string;
    subtle: string;
    muted: string;
  };

  // Secondary colors
  secondary: {
    DEFAULT: string;
    foreground: string;
    hover: string;
    active: string;
    subtle: string;
    muted: string;
  };

  // Accent colors
  accent: {
    DEFAULT: string;
    foreground: string;
    hover: string;
    active: string;
    subtle: string;
    muted: string;
  };

  // Semantic status colors
  success: {
    DEFAULT: string;
    foreground: string;
    subtle: string;
    muted: string;
  };

  warning: {
    DEFAULT: string;
    foreground: string;
    subtle: string;
    muted: string;
  };

  error: {
    DEFAULT: string;
    foreground: string;
    subtle: string;
    muted: string;
  };

  info: {
    DEFAULT: string;
    foreground: string;
    subtle: string;
    muted: string;
  };
}

/**
 * Light theme color mappings
 */
export const lightColors: SemanticColorTokens = {
  background: {
    DEFAULT: 'var(--color-background)',
    subtle: 'var(--color-background-subtle)',
    muted: 'var(--color-background-muted)',
    emphasized: 'var(--color-background-emphasized)',
    inverse: 'var(--color-background-inverse)',
  },
  foreground: {
    DEFAULT: 'var(--color-foreground)',
    muted: 'var(--color-foreground-muted)',
    subtle: 'var(--color-foreground-subtle)',
    inverse: 'var(--color-foreground-inverse)',
  },
  surface: {
    DEFAULT: 'var(--color-surface)',
    raised: 'var(--color-surface-raised)',
    overlay: 'var(--color-surface-overlay)',
    sunken: 'var(--color-surface-sunken)',
  },
  border: {
    DEFAULT: 'var(--color-border)',
    subtle: 'var(--color-border-subtle)',
    strong: 'var(--color-border-strong)',
    focus: 'var(--color-border-focus)',
  },
  primary: {
    DEFAULT: 'var(--color-primary)',
    foreground: 'var(--color-primary-foreground)',
    hover: 'var(--color-primary-hover)',
    active: 'var(--color-primary-active)',
    subtle: 'var(--color-primary-subtle)',
    muted: 'var(--color-primary-muted)',
  },
  secondary: {
    DEFAULT: 'var(--color-secondary)',
    foreground: 'var(--color-secondary-foreground)',
    hover: 'var(--color-secondary-hover)',
    active: 'var(--color-secondary-active)',
    subtle: 'var(--color-secondary-subtle)',
    muted: 'var(--color-secondary-muted)',
  },
  accent: {
    DEFAULT: 'var(--color-accent)',
    foreground: 'var(--color-accent-foreground)',
    hover: 'var(--color-accent-hover)',
    active: 'var(--color-accent-active)',
    subtle: 'var(--color-accent-subtle)',
    muted: 'var(--color-accent-muted)',
  },
  success: {
    DEFAULT: 'var(--color-success)',
    foreground: 'var(--color-success-foreground)',
    subtle: 'var(--color-success-subtle)',
    muted: 'var(--color-success-muted)',
  },
  warning: {
    DEFAULT: 'var(--color-warning)',
    foreground: 'var(--color-warning-foreground)',
    subtle: 'var(--color-warning-subtle)',
    muted: 'var(--color-warning-muted)',
  },
  error: {
    DEFAULT: 'var(--color-error)',
    foreground: 'var(--color-error-foreground)',
    subtle: 'var(--color-error-subtle)',
    muted: 'var(--color-error-muted)',
  },
  info: {
    DEFAULT: 'var(--color-info)',
    foreground: 'var(--color-info-foreground)',
    subtle: 'var(--color-info-subtle)',
    muted: 'var(--color-info-muted)',
  },
};
