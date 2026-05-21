# Design Principles

## Core Principles

### 1. Design System First, Components Second

The design system is not an afterthought—it's the foundation. Every component, layout, and theme derives from the token system.

**Why?**
- Consistency across all applications
- Easier maintenance and updates
- Predictable behavior

### 2. Theme-Driven, Not Class-Driven

Components use semantic CSS variables that respond to theme changes. No hardcoded Tailwind utilities for colors, spacing, or sizes.

```tsx
// ❌ DON'T - Hardcoded Tailwind values
<div className="p-4 bg-blue-500 text-white text-sm rounded-lg" />

// ✅ DO - Use token-mapped Tailwind classes (via preset) + CSS variables where needed
<div className="p-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] text-sm rounded-lg" />
```

> **Note:** Font sizes like `text-sm` use the Tailwind preset which maps to `var(--font-size-sm)`.
> For colors and spacing, use either preset classes (`bg-primary`) or CSS variables (`bg-[var(--color-primary)]`).

### 3. Configuration Over Duplication

One configuration should update everything. Define your theme once, and it propagates everywhere.

```tsx
const theme = createTheme({
  brand: {
    colors: { primary: '#4f46e5' }
  }
});
// This single change updates all primary-colored elements
```

### 4. Composition Over Inheritance

Build complex UIs by combining simple primitives. No monolithic "layout templates"—only composable building blocks.

```tsx
// Compose layouts from primitives
<AppShell>
  <Header />
  <Sidebar />
  <Content>
    <Page>
      <Grid>
        <Card />
      </Grid>
    </Page>
  </Content>
</AppShell>
```

### 5. Minimal Setup for Consumers

A consuming application should only need:
1. Install packages
2. Wrap with providers
3. Use components

No complex configuration, no CSS imports from node_modules, no Tailwind config modifications.

## Component Principles

### Accessibility First

All components are built on Radix UI primitives, ensuring:
- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

### Controlled & Uncontrolled

Support both patterns for form components:

```tsx
// Uncontrolled - simpler for basic use cases
<Input defaultValue="" />

// Controlled - full control for complex forms
<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

### No Layout Assumptions

Components don't make assumptions about their container:
- No fixed widths
- No margins (use wrapper/parent for spacing)
- Fluid by default

### No App-Specific Logic

The component library contains only reusable, generic components:
- ❌ `<LoginForm />` - too specific
- ✅ `<Input />`, `<Button />`, `<Card />` - generic primitives

## Token Principles

### Semantic Naming

Tokens are named for their purpose, not their value:

```css
/* ✅ Semantic */
--color-background
--color-foreground
--color-primary

/* ❌ Non-semantic */
--color-white
--color-slate-900
--color-indigo-500
```

### Scale Consistency

Use consistent scales across token categories:

```
xs, sm, md, lg, xl, 2xl, 3xl
```

### Theme Independence

Primitive tokens (raw values) are separate from semantic tokens (CSS variables). This allows themes to remap semantics without touching primitives.

## Layout Principles

### Slot-Based Composition

Layouts use "slots" rather than fixed structure:

```tsx
<AppShell>
  <slot:header />    {/* Header goes here */}
  <slot:sidebar />   {/* Sidebar goes here */}
  <slot:content />   {/* Content goes here */}
</AppShell>
```

### Token-Driven Dimensions

Layout dimensions come from tokens:

```css
--sidebar-width: 16rem;
--header-height: 4rem;
--container-padding: 1.5rem;
```

### Responsive by Default

Layouts adapt to screen size without requiring breakpoint-specific code from consumers.

## State Principles

### Separation of Concerns

- **UI State** (Zustand): Sidebar state, theme preferences, modal visibility
- **Server State** (TanStack Query): Data fetching, caching, mutations

Never mix these. UI state is synchronous and local. Server state is async and remote.

### Persistence

User preferences are persisted to localStorage:
- Theme preference
- Density mode
- Sidebar collapsed state

### No Global Singletons in Components

Components should not import stores directly. Use context or props for dependency injection.

## Code Quality Principles

### Strict TypeScript

- `strict: true`
- No `any` types
- Explicit return types for public APIs
- Discriminated unions for variants

### Explicit Exports

All public APIs are explicitly exported through barrel files:

```ts
// packages/ui/src/index.ts
export { Button } from './components/button';
export type { ButtonProps } from './components/button';
```

### No Circular Dependencies

Package dependencies are strictly layered:
```
design-tokens → theme-engine → ui → layouts → apps
```

### Meaningful Comments

Comments explain "why", not "what":

```ts
// ✅ Good
// Use layoutEffect to apply theme before first paint, preventing flash
useLayoutEffect(() => applyTheme(theme), [theme]);

// ❌ Bad
// Set the theme
setTheme(theme);
```
