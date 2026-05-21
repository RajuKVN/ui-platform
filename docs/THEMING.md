# Theming Guide

## Overview

The UI Platform uses a layered theming system:

1. **Design Tokens** - Primitive values (colors, spacing, typography)
2. **CSS Variables** - Runtime-configurable semantic tokens
3. **Theme Context** - React context for theme management
4. **Theme Provider** - Applies theme to the DOM

## Quick Start

### Basic Setup

```tsx
import { ThemeProvider, createTheme } from '@ui-platform/theme-engine';

const theme = createTheme({
  defaultColorMode: 'system', // 'light' | 'dark' | 'system'
  defaultDensity: 'comfortable', // 'compact' | 'comfortable' | 'spacious'
});

function App() {
  return (
    <ThemeProvider defaultTheme={theme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

## Color Modes

### Supported Modes

- `light` - Light theme
- `dark` - Dark theme
- `system` - Follows system preference

### Switching Modes

```tsx
import { useTheme } from '@ui-platform/theme-engine';

function ColorModeToggle() {
  const { theme, setColorMode } = useTheme();

  return (
    <button onClick={() => setColorMode('dark')}>
      Current: {theme.colorMode}
    </button>
  );
}
```

### Toggle Function

```tsx
const { toggleColorMode } = useTheme();

// Toggles between light and dark
<button onClick={toggleColorMode}>Toggle</button>
```

## Density Modes

Density affects spacing, component sizes, and padding:

| Mode | Description |
|------|-------------|
| `compact` | 75% spacing, smaller components |
| `comfortable` | Default (100%) |
| `spacious` | 125% spacing, larger components |

### Switching Density

```tsx
const { setDensity } = useTheme();

setDensity('compact');
setDensity('comfortable');
setDensity('spacious');
```

## Custom Brand Themes

### Creating a Brand Theme

```tsx
import { createTheme } from '@ui-platform/theme-engine';

const theme = createTheme({
  defaultColorMode: 'light',
  brand: {
    name: 'Acme Corp',
    colors: {
      primary: '#0ea5e9',      // Sky blue
      secondary: '#8b5cf6',    // Purple
      accent: '#f97316',       // Orange
      background: {
        light: '#fafafa',
        dark: '#0a0a0a',
      },
    },
    fonts: {
      sans: '"Inter", system-ui, sans-serif',
      mono: '"Fira Code", monospace',
    },
    radius: 'medium', // 'none' | 'small' | 'medium' | 'large' | 'full'
  },
});
```

### Preset Themes

```tsx
import { presetThemes } from '@ui-platform/theme-engine';

// Available presets: indigo, ocean, forest, rose, slate
const theme = createTheme({
  brand: presetThemes.ocean,
});
```

## Runtime Theme Customization

### Updating Colors

```tsx
const { setColors } = useTheme();

setColors({
  primary: '#e11d48',
  secondary: '#0d9488',
});
```

### Updating Radius Scale

```tsx
const { setRadiusScale } = useTheme();

setRadiusScale(0);   // Sharp corners
setRadiusScale(1);   // Default
setRadiusScale(2);   // Extra rounded
```

## Reduced Motion

### Respecting User Preferences

The theme engine automatically detects `prefers-reduced-motion`:

```tsx
const { theme } = useTheme();

console.log(theme.reducedMotion); // true if user prefers reduced motion
```

### Manual Control

```tsx
const { setReducedMotion } = useTheme();

setReducedMotion(true);  // Disable animations
setReducedMotion(false); // Enable animations
```

## Persistence

Theme preferences are automatically persisted to localStorage:

```tsx
<ThemeProvider 
  defaultTheme={theme}
  storageKey="my-app-theme" // Custom storage key
>
```

## CSS Variables Reference

### Background

```css
--color-background          /* Main background */
--color-background-subtle   /* Slightly different */
--color-background-muted    /* Disabled states */
--color-background-emphasized /* Highlighted areas */
--color-background-inverse  /* Inverted for contrast */
```

### Foreground (Text)

```css
--color-foreground          /* Primary text */
--color-foreground-muted    /* Secondary text */
--color-foreground-subtle   /* Placeholder text */
--color-foreground-inverse  /* Text on inverse backgrounds */
```

### Surfaces

```css
--color-surface             /* Default surface */
--color-surface-raised      /* Cards */
--color-surface-overlay     /* Modals, dropdowns */
--color-surface-sunken      /* Inset areas */
```

### Borders

```css
--color-border              /* Default borders */
--color-border-subtle       /* Subtle separators */
--color-border-strong       /* Emphasized borders */
--color-border-focus        /* Focus rings */
```

### Brand Colors

```css
--color-primary             /* Primary brand color */
--color-primary-foreground  /* Text on primary */
--color-primary-hover       /* Hover state */
--color-primary-active      /* Active/pressed state */
--color-primary-subtle      /* Light tint */
--color-primary-muted       /* Very light tint */
```

Same pattern for `secondary`, `accent`.

### Semantic Colors

```css
--color-success, --color-success-foreground, --color-success-subtle
--color-warning, --color-warning-foreground, --color-warning-subtle
--color-error, --color-error-foreground, --color-error-subtle
--color-info, --color-info-foreground, --color-info-subtle
```

### Spacing

```css
--spacing-none   /* 0 */
--spacing-2xs    /* 2px */
--spacing-xs     /* 4px */
--spacing-sm     /* 8px */
--spacing-md     /* 12px */
--spacing-lg     /* 16px */
--spacing-xl     /* 24px */
--spacing-2xl    /* 32px */
--spacing-3xl    /* 48px */
--spacing-4xl    /* 64px */
```

### Typography

```css
--font-sans      /* Primary font family */
--font-mono      /* Monospace font */
--font-display   /* Display/heading font */

--font-size-2xs through --font-size-7xl
--font-weight-normal through --font-weight-bold
--line-height-none through --line-height-loose
```

### Radius

```css
--radius-none    /* 0 */
--radius-sm      /* 2px */
--radius-default /* 4px */
--radius-md      /* 6px */
--radius-lg      /* 8px */
--radius-xl      /* 12px */
--radius-2xl     /* 16px */
--radius-full    /* 9999px */
```

### Shadows

```css
--shadow-none
--shadow-xs      /* Subtle lift */
--shadow-sm      /* Cards */
--shadow-md      /* Dropdowns */
--shadow-lg      /* Modals */
--shadow-xl      /* High emphasis */
--shadow-2xl     /* Maximum */
--shadow-inner   /* Inset */
```

### Layout

```css
--sidebar-width     /* 256px */
--sidebar-collapsed /* 64px */
--header-height     /* 64px */
--footer-height     /* 48px */
```

## SSR Considerations

### Preventing Flash

Add the theme class to your HTML:

```html
<html class="light">
<!-- or -->
<html data-theme="dark">
```

### Script for Initial Theme

```html
<script>
  const theme = localStorage.getItem('ui-platform-theme');
  if (theme) {
    const { colorMode } = JSON.parse(theme);
    document.documentElement.classList.add(colorMode === 'dark' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', colorMode);
  }
</script>
```
