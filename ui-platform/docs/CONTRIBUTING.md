# Contributing Guide

## Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+

### Getting Started

```bash
# Clone the repository
git clone https://github.com/your-org/ui-platform.git
cd ui-platform

# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development mode
pnpm dev
```

### Running the Demo App

```bash
cd apps/demo-app
pnpm dev
```

## Project Structure

```
ui-platform/
├── packages/
│   ├── design-tokens/    # Design tokens (foundation)
│   ├── theme-engine/     # Theme context and hooks
│   ├── ui/               # UI components
│   ├── layouts/          # Layout primitives
│   ├── state/            # Zustand stores
│   ├── hooks/            # React hooks
│   └── utils/            # Utility functions
├── apps/
│   └── demo-app/         # Demo application
├── docs/                 # Documentation
└── tooling/              # Shared configs
```

## Coding Standards

### TypeScript

- Strict mode enabled
- No `any` types (use `unknown` instead)
- Explicit return types for public APIs
- Use discriminated unions for variants

```ts
// ✅ Good
type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
}

// ❌ Bad
interface ButtonProps {
  variant: string;
  children: any;
}
```

### Component Guidelines

1. **Use forwardRef** for all components
2. **Extend HTML element props** when appropriate
3. **Support className** for styling overrides
4. **Use CSS variables** for all colors, spacing, sizes

```tsx
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
);
Button.displayName = 'Button';
```

### CSS Guidelines

1. **No hardcoded values** - Use CSS variables
2. **No color utilities** like `bg-blue-500`
3. **Semantic token names** over raw values

```tsx
// ✅ Good
<div className="bg-[var(--color-primary)] p-[var(--spacing-lg)]" />

// ❌ Bad
<div className="bg-indigo-600 p-4" />
```

### Naming Conventions

- Components: PascalCase (`Button`, `CardHeader`)
- Hooks: camelCase with `use` prefix (`useTheme`, `useDisclosure`)
- Utils: camelCase (`formatDate`, `capitalize`)
- Files: kebab-case (`button.tsx`, `use-theme.ts`)
- CSS variables: kebab-case (`--color-primary`, `--spacing-lg`)

## Adding a New Component

### 1. Create the component file

```
packages/ui/src/components/my-component/
├── my-component.tsx
└── index.ts
```

### 2. Implement the component

```tsx
// my-component.tsx
import * as React from 'react';
import { cn } from '../../utils/cn';

export interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'alternate';
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'bg-[var(--color-surface)] border border-[var(--color-border)]',
        variant === 'alternate' && 'bg-[var(--color-background-muted)]',
        className
      )}
      {...props}
    />
  )
);

MyComponent.displayName = 'MyComponent';

export { MyComponent };
```

### 3. Export from index

```ts
// index.ts
export { MyComponent } from './my-component';
export type { MyComponentProps } from './my-component';
```

### 4. Add to main exports

```ts
// packages/ui/src/index.ts
export { MyComponent } from './components/my-component';
export type { MyComponentProps } from './components/my-component';
```

### 5. Add Storybook story (optional)

```tsx
// my-component.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { MyComponent } from './my-component';

const meta: Meta<typeof MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
};

export default meta;

type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {};

export const Alternate: Story = {
  args: {
    variant: 'alternate',
  },
};
```

## Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** following the guidelines above
3. **Write tests** if applicable
4. **Update documentation** if needed
5. **Create a changeset** (see below)
6. **Open a PR** with a clear description

## Changesets

We use [Changesets](https://github.com/changesets/changesets) for versioning.

### Creating a Changeset

```bash
pnpm changeset
```

Follow the prompts to:
1. Select affected packages
2. Choose version bump type (patch/minor/major)
3. Write a summary

### Version Types

- **patch**: Bug fixes, internal changes
- **minor**: New features, backwards-compatible
- **major**: Breaking changes

## Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Type checking
pnpm typecheck
```

## Linting

```bash
# Run ESLint
pnpm lint

# Format with Prettier
pnpm format
```

## Questions?

Open an issue or reach out to the maintainers.
