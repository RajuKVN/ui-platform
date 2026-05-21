/**
 * Generates CSS file with all design token variables
 */

const fs = require('fs');
const path = require('path');

const css = `/**
 * @ui-platform/design-tokens
 * Auto-generated CSS variables - DO NOT EDIT
 */

@layer base {
  :root {
    /* ============================================
       SPACING TOKENS
       ============================================ */
    --spacing-none: 0px;
    --spacing-2xs: 0.125rem;  /* 2px */
    --spacing-xs: 0.25rem;    /* 4px */
    --spacing-sm: 0.5rem;     /* 8px */
    --spacing-md: 0.75rem;    /* 12px */
    --spacing-lg: 1rem;       /* 16px */
    --spacing-xl: 1.5rem;     /* 24px */
    --spacing-2xl: 2rem;      /* 32px */
    --spacing-3xl: 3rem;      /* 48px */
    --spacing-4xl: 4rem;      /* 64px */

    /* Component spacing */
    --spacing-inline-xs: 0.5rem;
    --spacing-inline-sm: 0.75rem;
    --spacing-inline-md: 1rem;
    --spacing-inline-lg: 1.25rem;
    --spacing-inline-xl: 1.5rem;
    
    --spacing-block-xs: 0.25rem;
    --spacing-block-sm: 0.5rem;
    --spacing-block-md: 0.75rem;
    --spacing-block-lg: 1rem;
    --spacing-block-xl: 1.25rem;
    
    --spacing-gap-xs: 0.25rem;
    --spacing-gap-sm: 0.5rem;
    --spacing-gap-md: 0.75rem;
    --spacing-gap-lg: 1rem;
    --spacing-gap-xl: 1.5rem;

    /* ============================================
       TYPOGRAPHY TOKENS
       ============================================ */
    --font-sans: "Plus Jakarta Sans", system-ui, -apple-system, sans-serif;
    --font-mono: "JetBrains Mono", "Fira Code", monospace;
    --font-display: "Clash Display", "Plus Jakarta Sans", system-ui, sans-serif;
    
    --font-size-2xs: 0.625rem;   /* 10px */
    --font-size-xs: 0.75rem;     /* 12px */
    --font-size-sm: 0.875rem;    /* 14px */
    --font-size-base: 1rem;      /* 16px */
    --font-size-lg: 1.125rem;    /* 18px */
    --font-size-xl: 1.25rem;     /* 20px */
    --font-size-2xl: 1.5rem;     /* 24px */
    --font-size-3xl: 1.875rem;   /* 30px */
    --font-size-4xl: 2.25rem;    /* 36px */
    --font-size-5xl: 3rem;       /* 48px */
    --font-size-6xl: 3.75rem;    /* 60px */
    --font-size-7xl: 4.5rem;     /* 72px */

    --font-weight-thin: 100;
    --font-weight-extralight: 200;
    --font-weight-light: 300;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    --font-weight-black: 900;

    --line-height-none: 1;
    --line-height-tight: 1.25;
    --line-height-snug: 1.375;
    --line-height-normal: 1.5;
    --line-height-relaxed: 1.625;
    --line-height-loose: 2;

    --letter-spacing-tighter: -0.05em;
    --letter-spacing-tight: -0.025em;
    --letter-spacing-normal: 0em;
    --letter-spacing-wide: 0.025em;
    --letter-spacing-wider: 0.05em;
    --letter-spacing-widest: 0.1em;

    /* ============================================
       RADIUS TOKENS
       ============================================ */
    --radius-none: 0px;
    --radius-sm: 0.125rem;     /* 2px */
    --radius-default: 0.25rem; /* 4px */
    --radius-md: 0.375rem;     /* 6px */
    --radius-lg: 0.5rem;       /* 8px */
    --radius-xl: 0.75rem;      /* 12px */
    --radius-2xl: 1rem;        /* 16px */
    --radius-3xl: 1.5rem;      /* 24px */
    --radius-full: 9999px;

    /* ============================================
       ELEVATION/SHADOW TOKENS
       ============================================ */
    --shadow-none: none;
    --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

    /* ============================================
       MOTION TOKENS
       ============================================ */
    --duration-0: 0ms;
    --duration-75: 75ms;
    --duration-100: 100ms;
    --duration-150: 150ms;
    --duration-200: 200ms;
    --duration-300: 300ms;
    --duration-500: 500ms;
    --duration-700: 700ms;
    --duration-1000: 1000ms;

    --easing-linear: linear;
    --easing-in: cubic-bezier(0.4, 0, 1, 1);
    --easing-out: cubic-bezier(0, 0, 0.2, 1);
    --easing-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --easing-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275);
    --easing-sharp: cubic-bezier(0.4, 0, 0.6, 1);

    /* ============================================
       LIGHT THEME COLOR TOKENS (Default)
       ============================================ */
    /* Background */
    --color-background: #ffffff;
    --color-background-subtle: #f8fafc;
    --color-background-muted: #f1f5f9;
    --color-background-emphasized: #e2e8f0;
    --color-background-inverse: #0f172a;

    /* Foreground */
    --color-foreground: #0f172a;
    --color-foreground-muted: #475569;
    --color-foreground-subtle: #94a3b8;
    --color-foreground-inverse: #ffffff;

    /* Surface */
    --color-surface: #ffffff;
    --color-surface-raised: #ffffff;
    --color-surface-overlay: #ffffff;
    --color-surface-sunken: #f1f5f9;

    /* Border */
    --color-border: #e2e8f0;
    --color-border-subtle: #f1f5f9;
    --color-border-strong: #cbd5e1;
    --color-border-focus: #6366f1;

    /* Primary */
    --color-primary: #4f46e5;
    --color-primary-foreground: #ffffff;
    --color-primary-hover: #4338ca;
    --color-primary-active: #3730a3;
    --color-primary-subtle: #e0e7ff;
    --color-primary-muted: #eef2ff;

    /* Secondary */
    --color-secondary: #0d9488;
    --color-secondary-foreground: #ffffff;
    --color-secondary-hover: #0f766e;
    --color-secondary-active: #115e59;
    --color-secondary-subtle: #ccfbf1;
    --color-secondary-muted: #f0fdfa;

    /* Accent */
    --color-accent: #f59e0b;
    --color-accent-foreground: #0f172a;
    --color-accent-hover: #d97706;
    --color-accent-active: #b45309;
    --color-accent-subtle: #fef3c7;
    --color-accent-muted: #fffbeb;

    /* Success */
    --color-success: #16a34a;
    --color-success-foreground: #ffffff;
    --color-success-subtle: #dcfce7;
    --color-success-muted: #f0fdf4;

    /* Warning */
    --color-warning: #f59e0b;
    --color-warning-foreground: #0f172a;
    --color-warning-subtle: #fef3c7;
    --color-warning-muted: #fffbeb;

    /* Error */
    --color-error: #dc2626;
    --color-error-foreground: #ffffff;
    --color-error-subtle: #fee2e2;
    --color-error-muted: #fef2f2;

    /* Info */
    --color-info: #2563eb;
    --color-info-foreground: #ffffff;
    --color-info-subtle: #dbeafe;
    --color-info-muted: #eff6ff;

    /* ============================================
       COMPONENT SIZE TOKENS
       ============================================ */
    --size-xs: 1.5rem;    /* 24px */
    --size-sm: 2rem;      /* 32px */
    --size-md: 2.5rem;    /* 40px */
    --size-lg: 3rem;      /* 48px */
    --size-xl: 3.5rem;    /* 56px */

    /* ============================================
       LAYOUT TOKENS
       ============================================ */
    --sidebar-width: 16rem;      /* 256px */
    --sidebar-collapsed: 4rem;   /* 64px */
    --header-height: 4rem;       /* 64px */
    --footer-height: 3rem;       /* 48px */
    --container-padding: 1.5rem; /* 24px */
  }

  /* ============================================
     DARK THEME
     ============================================ */
  .dark,
  [data-theme="dark"] {
    --color-background: #020617;
    --color-background-subtle: #0f172a;
    --color-background-muted: #1e293b;
    --color-background-emphasized: #334155;
    --color-background-inverse: #f8fafc;

    --color-foreground: #f8fafc;
    --color-foreground-muted: #94a3b8;
    --color-foreground-subtle: #64748b;
    --color-foreground-inverse: #0f172a;

    --color-surface: #0f172a;
    --color-surface-raised: #1e293b;
    --color-surface-overlay: #1e293b;
    --color-surface-sunken: #020617;

    --color-border: #334155;
    --color-border-subtle: #1e293b;
    --color-border-strong: #475569;
    --color-border-focus: #818cf8;

    --color-primary: #6366f1;
    --color-primary-foreground: #ffffff;
    --color-primary-hover: #818cf8;
    --color-primary-active: #a5b4fc;
    --color-primary-subtle: #1e1b4b;
    --color-primary-muted: #312e81;

    --color-secondary: #14b8a6;
    --color-secondary-foreground: #ffffff;
    --color-secondary-hover: #2dd4bf;
    --color-secondary-active: #5eead4;
    --color-secondary-subtle: #042f2e;
    --color-secondary-muted: #134e4a;

    --color-accent: #fbbf24;
    --color-accent-foreground: #0f172a;
    --color-accent-hover: #fcd34d;
    --color-accent-active: #fde68a;
    --color-accent-subtle: #451a03;
    --color-accent-muted: #78350f;

    --color-success: #22c55e;
    --color-success-foreground: #ffffff;
    --color-success-subtle: #052e16;
    --color-success-muted: #14532d;

    --color-warning: #fbbf24;
    --color-warning-foreground: #0f172a;
    --color-warning-subtle: #451a03;
    --color-warning-muted: #78350f;

    --color-error: #ef4444;
    --color-error-foreground: #ffffff;
    --color-error-subtle: #450a0a;
    --color-error-muted: #7f1d1d;

    --color-info: #3b82f6;
    --color-info-foreground: #ffffff;
    --color-info-subtle: #172554;
    --color-info-muted: #1e3a8a;

    /* Adjust shadows for dark mode */
    --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.3);
    --shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.4), 0 1px 2px -1px rgb(0 0 0 / 0.3);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3);
    --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.4);
    --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.6);
  }

  /* ============================================
     DENSITY MODES
     ============================================ */
  [data-density="compact"] {
    --spacing-2xs: 0.0625rem;
    --spacing-xs: 0.125rem;
    --spacing-sm: 0.375rem;
    --spacing-md: 0.5rem;
    --spacing-lg: 0.75rem;
    --spacing-xl: 1rem;
    --spacing-2xl: 1.5rem;
    --spacing-3xl: 2.25rem;
    --spacing-4xl: 3rem;

    --spacing-inline-xs: 0.375rem;
    --spacing-inline-sm: 0.5rem;
    --spacing-inline-md: 0.75rem;
    --spacing-inline-lg: 1rem;
    --spacing-inline-xl: 1.25rem;

    --spacing-block-xs: 0.125rem;
    --spacing-block-sm: 0.375rem;
    --spacing-block-md: 0.5rem;
    --spacing-block-lg: 0.75rem;
    --spacing-block-xl: 1rem;

    --size-xs: 1.25rem;
    --size-sm: 1.75rem;
    --size-md: 2rem;
    --size-lg: 2.5rem;
    --size-xl: 3rem;
  }

  [data-density="spacious"] {
    --spacing-2xs: 0.25rem;
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
    --spacing-4xl: 5rem;

    --spacing-inline-xs: 0.75rem;
    --spacing-inline-sm: 1rem;
    --spacing-inline-md: 1.5rem;
    --spacing-inline-lg: 2rem;
    --spacing-inline-xl: 2.5rem;

    --spacing-block-xs: 0.5rem;
    --spacing-block-sm: 0.75rem;
    --spacing-block-md: 1rem;
    --spacing-block-lg: 1.5rem;
    --spacing-block-xl: 2rem;

    --size-xs: 2rem;
    --size-sm: 2.5rem;
    --size-md: 3rem;
    --size-lg: 3.5rem;
    --size-xl: 4rem;
  }
}
`;

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, 'tokens.css'), css);
console.log('✓ Generated tokens.css');
