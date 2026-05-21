import { useTheme } from '@ui-platform/theme-engine';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ui-platform/ui';
import type { DensityMode } from '@ui-platform/design-tokens';

export function DensityToggle() {
  const { theme, setDensity } = useTheme();

  const densities: { value: DensityMode; label: string }[] = [
    { value: 'compact', label: 'Compact' },
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'spacious', label: 'Spacious' },
  ];

  return (
    <Select value={theme.density} onValueChange={(value) => setDensity(value as DensityMode)}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Density" />
      </SelectTrigger>
      <SelectContent>
        {densities.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
