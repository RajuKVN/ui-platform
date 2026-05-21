# Architecture Overview

## Design Philosophy

The UI Platform is built on several core principles that guide all architectural decisions:

### 1. Design System First

The design system is the foundation of everything. All components, layouts, and themes derive from the design tokens defined in `@ui-platform/design-tokens`.

```
Design Tokens → Theme Engine → Components → Layouts → Applications
```

### 2. Token-Driven Styling

Components use CSS custom properties (variables) instead of hardcoded values. This enables:

- **Runtime theming**: Change themes without rebuilding
- **Density modes**: Adjust spacing uniformly
- **Brand customization**: Override colors per-application

```tsx
// ❌ Bad - hardcoded values
<div className="p-4 bg-blue-500 text-white" />

// ✅ Good - token-driven
<div className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)]" />
```

### 3. Composition Over Inheritance

All layouts are built from composable primitives. There are no "fixed" layouts—only building blocks.

```tsx
<AppShell>
  <Header />
  <Sidebar />
  <Content>
    <Page>
      <Stack>
        <Card />
        <Grid columns={3}>
          <GridItem />
        </Grid>
      </Stack>
    </Page>
  </Content>
</AppShell>
```

## Package Dependencies

```
@ui-platform/design-tokens (foundation)
         ↓
@ui-platform/theme-engine (depends on design-tokens)
         ↓
@ui-platform/ui (depends on design-tokens, theme-engine)
         ↓
@ui-platform/layouts (depends on ui, state)
         ↓
@ui-platform/state (standalone Zustand stores)
         ↓
@ui-platform/hooks (React hooks)
         ↓
@ui-platform/utils (pure utilities)
```

## Token Categories

### Semantic vs Primitive Tokens

**Primitive tokens** are raw values:
```ts
neutral: {
  50: '#f8fafc',
  100: '#f1f5f9',
  // ...
}
```

**Semantic tokens** map to CSS variables:
```css
--color-background: #ffffff;       /* light */
--color-background: #020617;       /* dark */
```

### Token Layers

1. **Primitives**: Raw color palettes, spacing scales
2. **Semantic**: Purpose-driven tokens (background, foreground, border)
3. **Component**: Component-specific tokens (button-height, input-radius)

## State Management

### Separation of Concerns

| Store | Purpose |
|-------|---------|
| `useSidebarStore` | Sidebar collapse, width, mobile state |
| `usePreferencesStore` | Color mode, density, user preferences |
| `useToastStore` | Toast notifications |
| `useModalStore` | Modal open/close state |

### Rules

1. **Zustand for UI state only** - Never mix with server state
2. **TanStack Query for server state** - Caching, invalidation, mutations
3. **No mixing responsibilities** - Each store has a single purpose

## Theming Architecture

### Zero-Rerender Theme Switching

Theme changes are applied via CSS custom properties on the document root:

```tsx
// Theme switch updates CSS variables, not React state
document.documentElement.style.setProperty('--color-primary', '#4f46e5');
document.documentElement.setAttribute('data-theme', 'dark');
```

This means:
- No component re-renders on theme change
- Instant visual updates
- Works with SSR

### Theme Layers

1. **Base tokens** (CSS variables in `:root`)
2. **Theme overrides** (`.dark`, `[data-theme="dark"]`)
3. **Density overrides** (`[data-density="compact"]`)
4. **Custom overrides** (inline style properties)

## Component Architecture

### Headless + Styled

Components are built on Radix UI primitives (headless) with our token-driven styling:

```tsx
// Radix provides behavior
import * as DialogPrimitive from '@radix-ui/react-dialog';

// We add styling via CSS variables
<DialogPrimitive.Content className={cn(
  'bg-[var(--color-surface-overlay)]',
  'border border-[var(--color-border)]',
  'rounded-[var(--radius-xl)]',
  // ...
)} />
```

### Controlled & Uncontrolled

All form components support both modes:

```tsx
// Uncontrolled
<Input defaultValue="hello" />

// Controlled
<Input value={value} onChange={setValue} />
```

### Polymorphic Components

Some components support the `as` prop:

```tsx
<Stack as="section" gap="lg">
  <Text as="h1">Title</Text>
</Stack>
```

## Build System

### Turborepo

Monorepo orchestration with caching:

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

### tsup

Fast, zero-config bundling:

```ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  treeshake: true,
});
```

## Consumer Experience

Consuming apps should only need to:

1. Install packages
2. Define theme once
3. Wrap app with providers
4. Use components

```tsx
// 1. Install: pnpm add @ui-platform/ui @ui-platform/theme-engine

// 2. Define theme
const theme = createTheme({ ... });

// 3. Wrap app
<ThemeProvider defaultTheme={theme}>
  <App />
</ThemeProvider>

// 4. Use components
<Button variant="primary">Click me</Button>
```

No Tailwind config edits. No component overrides. No hacks.
