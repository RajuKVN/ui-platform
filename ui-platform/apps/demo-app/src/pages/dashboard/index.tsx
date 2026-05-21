import { Page, PageHeader, PageTitle, PageDescription, PageContent, Grid, GridItem, VStack } from '@ui-platform/layouts';
import { StatsCard } from './stats-card';
import { RecentActivity } from './recent-activity';
import { DataTableDemo } from './data-table-demo';
import { FormDemo } from './form-demo';
import { Users, BarChart3, Package, FileText } from '@/components/icons';

const stats = [
  {
    title: 'Total Users',
    value: '12,489',
    change: 12.5,
    changeLabel: 'vs last month',
    icon: Users,
  },
  {
    title: 'Revenue',
    value: '$48,352',
    change: 8.2,
    changeLabel: 'vs last month',
    icon: BarChart3,
  },
  {
    title: 'Active Orders',
    value: '1,284',
    change: -3.1,
    changeLabel: 'vs last month',
    icon: Package,
  },
  {
    title: 'Documents',
    value: '3,892',
    change: 24.7,
    changeLabel: 'vs last month',
    icon: FileText,
  },
];

export function DashboardPage() {
  return (
    <Page maxWidth="2xl">
      <PageHeader>
        <PageTitle>Dashboard</PageTitle>
        <PageDescription>
          Welcome back! Here's an overview of your enterprise metrics.
        </PageDescription>
      </PageHeader>
      
      <PageContent>
        {/* Stats Grid */}
        <Grid columns={4} gap="lg">
          {stats.map((stat) => (
            <GridItem key={stat.title}>
              <StatsCard {...stat} />
            </GridItem>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid columns={3} gap="lg">
          <GridItem colSpan={2}>
            <VStack gap="lg" align="stretch">
              <DataTableDemo />
            </VStack>
          </GridItem>
          <GridItem>
            <RecentActivity />
          </GridItem>
        </Grid>

        {/* Form Demo */}
        <Grid columns={2} gap="lg">
          <GridItem>
            <FormDemo />
          </GridItem>
        </Grid>
      </PageContent>
    </Page>
  );
}
