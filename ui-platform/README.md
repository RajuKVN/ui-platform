# UI Platform

An enterprise-grade, future-proof frontend UI platform built with React, TypeScript, and a design-system-first approach.

## 🎯 Philosophy

- **Design System first, Components second**
- **Theme-driven, not class-driven**
- **Configuration over duplication**
- **Composition over inheritance**
- **Minimal setup for consumers**
- **One theme definition → entire app updates**

## 📦 Packages

| Package | Description |
|---------|-------------|
| `@ui-platform/design-tokens` | Platform-agnostic design tokens (colors, spacing, typography, etc.) |
| `@ui-platform/theme-engine` | Theme context with zero-rerender switching |
| `@ui-platform/ui` | Enterprise UI components built on Radix primitives |
| `@ui-platform/layouts` | Composable layout primitives (AppShell, Grid, Stack) |
| `@ui-platform/state` | Zustand-based UI state management |
| `@ui-platform/hooks` | React hooks for common UI patterns |
| `@ui-platform/utils` | Utility functions (formatting, string manipulation) |

## 🚀 Quick Start

### 1. Install packages

```bash
pnpm add @ui-platform/ui @ui-platform/theme-engine @ui-platform/layouts
```

### 2. Wrap your app with providers

```tsx
import { ThemeProvider, createTheme } from '@ui-platform/theme-engine';
import { TooltipProvider } from '@ui-platform/ui';

const theme = createTheme({
  defaultColorMode: 'system',
  defaultDensity: 'comfortable',
});

function App() {
  return (
    <ThemeProvider defaultTheme={theme}>
      <TooltipProvider>
        <YourApp />
      </TooltipProvider>
    </ThemeProvider>
  );
}
```

### 3. Use components

```tsx
import { Button, Input, Card, CardHeader, CardTitle, CardContent } from '@ui-platform/ui';
import { AppShell, Sidebar, Header, Content } from '@ui-platform/layouts';

function Dashboard() {
  return (
    <AppShell>
      <Header />
      <Sidebar />
      <Content>
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>Get Started</Button>
          </CardContent>
        </Card>
      </Content>
    </AppShell>
  );
}
```

## 🎨 Theming

### Creating a custom theme

```tsx
import { createTheme } from '@ui-platform/theme-engine';

const theme = createTheme({
  defaultColorMode: 'light',
  defaultDensity: 'comfortable',
  brand: {
    name: 'My Brand',
    colors: {
      primary: '#4f46e5',
      secondary: '#0d9488',
      accent: '#f59e0b',
    },
  },
});
```

### Switching themes at runtime

```tsx
import { useTheme } from '@ui-platform/theme-engine';

function ThemeToggle() {
  const { theme, setColorMode, setDensity } = useTheme();

  return (
    <>
      <button onClick={() => setColorMode('dark')}>Dark Mode</button>
      <button onClick={() => setDensity('compact')}>Compact</button>
    </>
  );
}
```

## 🧱 Layout System

The layout system uses composable primitives:

```tsx
import { 
  AppShell, 
  Header, 
  Sidebar, 
  Content,
  Page,
  PageHeader,
  PageTitle,
  Grid,
  Stack 
} from '@ui-platform/layouts';

function Layout({ children }) {
  return (
    <AppShell>
      <Header />
      <Sidebar />
      <Content>
        <Page>
          <PageHeader>
            <PageTitle>Dashboard</PageTitle>
          </PageHeader>
          <Grid columns={3} gap="lg">
            {children}
          </Grid>
        </Page>
      </Content>
    </AppShell>
  );
}
```

## 📋 Available Components

### Form Components
- Button
- Input
- Label
- Checkbox
- Radio Group
- Switch
- Select

### Display Components
- Card
- Badge
- Avatar
- Separator
- Tooltip

### Feedback Components
- Dialog (Modal)
- Toast
- Loading
- Empty State
- Error State

### Data Display
- Table
- Tabs
- Dropdown Menu

### Layout Components
- AppShell
- Sidebar
- Header
- Footer
- Content
- Page
- Stack / HStack / VStack
- Grid
- Container

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Start development
pnpm dev

# Run demo app
cd apps/demo-app && pnpm dev
```

### Project Structure

```
ui-platform/
├── packages/
│   ├── design-tokens/    # Design tokens
│   ├── theme-engine/     # Theme context
│   ├── ui/               # UI components
│   ├── layouts/          # Layout primitives
│   ├── state/            # Zustand stores
│   ├── hooks/            # React hooks
│   └── utils/            # Utility functions
├── apps/
│   └── demo-app/         # Demo application
└── docs/                 # Documentation
```

## 📖 Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Design Principles](./docs/DESIGN_PRINCIPLES.md)
- [Theming Guide](./docs/THEMING.md)
- [Component Usage](./docs/COMPONENTS.md)
- [Layout Composition](./docs/LAYOUTS.md)
- [Contributing](./docs/CONTRIBUTING.md)

## 📄 License

MIT
