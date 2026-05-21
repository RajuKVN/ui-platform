import { Card, CardContent } from '@ui-platform/ui';
import { HStack, VStack } from '@ui-platform/layouts';
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from '@/components/icons';

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: LucideIcon;
}

export function StatsCard({ title, value, change, changeLabel, icon: Icon }: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardContent className="p-[var(--spacing-xl)]">
        <HStack justify="between" align="start">
          <VStack gap="xs" align="start">
            <span className="text-sm text-[var(--color-foreground-muted)]">
              {title}
            </span>
            <span className="text-3xl font-bold">{value}</span>
            <HStack gap="xs" align="center">
              {isPositive ? (
                <ArrowUpRight className="h-4 w-4 text-[var(--color-success)]" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-[var(--color-error)]" />
              )}
              <span
                className={`text-sm font-medium ${
                  isPositive ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'
                }`}
              >
                {isPositive ? '+' : ''}{change}%
              </span>
              <span className="text-sm text-[var(--color-foreground-muted)]">
                {changeLabel}
              </span>
            </HStack>
          </VStack>
          <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-xl)] bg-[var(--color-primary-muted)]">
            <Icon className="h-6 w-6 text-[var(--color-primary)]" />
          </div>
        </HStack>
      </CardContent>
    </Card>
  );
}
