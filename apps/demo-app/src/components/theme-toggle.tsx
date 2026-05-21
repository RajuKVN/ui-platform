import { useTheme } from '@ui-platform/theme-engine';
import { Button } from '@ui-platform/ui';
import { Sun, Moon, Monitor } from './icons';

export function ThemeToggle() {
  const { theme, setColorMode } = useTheme();

  const modes = [
    { mode: 'light' as const, icon: Sun, label: 'Light' },
    { mode: 'dark' as const, icon: Moon, label: 'Dark' },
    { mode: 'system' as const, icon: Monitor, label: 'System' },
  ];

  return (
    <div className="flex items-center gap-[var(--spacing-gap-xs)] rounded-[var(--radius-lg)] bg-[var(--color-background-muted)] p-1">
      {modes.map(({ mode, icon: Icon, label }) => (
        <Button
          key={mode}
          variant={theme.colorMode === mode ? 'primary' : 'ghost'}
          size="xs"
          onClick={() => setColorMode(mode)}
          title={label}
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}
    </div>
  );
}
