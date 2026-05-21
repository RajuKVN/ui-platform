import { Card, CardHeader, CardTitle, CardContent, Avatar, Badge } from '@ui-platform/ui';
import { VStack, HStack } from '@ui-platform/layouts';
import { formatRelativeTime } from '@ui-platform/utils';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  type: 'success' | 'warning' | 'info' | 'default';
}

const activities: Activity[] = [
  {
    id: '1',
    user: { name: 'Sarah Chen' },
    action: 'completed',
    target: 'Q4 Financial Report',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: 'success',
  },
  {
    id: '2',
    user: { name: 'Marcus Johnson' },
    action: 'started review of',
    target: 'Marketing Campaign',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: 'info',
  },
  {
    id: '3',
    user: { name: 'Emily Rodriguez' },
    action: 'flagged',
    target: 'Budget Variance Report',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    type: 'warning',
  },
  {
    id: '4',
    user: { name: 'James Wilson' },
    action: 'approved',
    target: 'New Hire Onboarding',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    type: 'success',
  },
  {
    id: '5',
    user: { name: 'Lisa Park' },
    action: 'submitted',
    target: 'Expense Report - March',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    type: 'default',
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <VStack gap="md" align="stretch">
          {activities.map((activity) => (
            <HStack key={activity.id} gap="md" align="start" className="py-[var(--spacing-sm)]">
              <Avatar
                alt={activity.user.name}
                src={activity.user.avatar}
                fallback={activity.user.name.split(' ').map(n => n[0]).join('')}
                size="sm"
              />
              <VStack gap="2xs" align="start" className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{' '}
                  <span className="text-[var(--color-foreground-muted)]">{activity.action}</span>{' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <span className="text-xs text-[var(--color-foreground-subtle)]">
                  {formatRelativeTime(activity.timestamp)}
                </span>
              </VStack>
              <Badge variant={activity.type} size="sm">
                {activity.type === 'success' ? 'Done' : 
                 activity.type === 'warning' ? 'Review' :
                 activity.type === 'info' ? 'In Progress' : 'New'}
              </Badge>
            </HStack>
          ))}
        </VStack>
      </CardContent>
    </Card>
  );
}
