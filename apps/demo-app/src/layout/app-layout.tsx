import React from 'react';
import {
  AppShell,
  Header,
  HeaderBrand,
  HeaderActions,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNav,
  SidebarNavItem,
  SidebarFooter,
  Content,
  useAppShell,
} from '@ui-platform/layouts';
import { Button, Avatar, Badge } from '@ui-platform/ui';
import { ThemeToggle } from '@/components/theme-toggle';
import { DensityToggle } from '@/components/density-toggle';
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Package,
  Settings,
  Bell,
  Search,
  Menu,
  ChevronLeft,
} from '@/components/icons';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/', active: true },
  { icon: Users, label: 'Users', href: '/users' },
  { icon: FileText, label: 'Documents', href: '/documents' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Package, label: 'Products', href: '/products' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

function SidebarToggle() {
  const { sidebarCollapsed, toggleSidebar } = useAppShell();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="shrink-0"
    >
      {sidebarCollapsed ? (
        <Menu className="h-5 w-5" />
      ) : (
        <ChevronLeft className="h-5 w-5" />
      )}
    </Button>
  );
}

function AppSidebar() {
  const { sidebarCollapsed } = useAppShell();

  return (
    <Sidebar>
      <SidebarHeader>
        {!sidebarCollapsed && (
          <div className="flex items-center gap-[var(--spacing-gap-sm)]">
            <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary)]">
              <span className="text-sm font-bold text-[var(--color-primary-foreground)]">
                UI
              </span>
            </div>
            <span className="text-lg font-semibold">Platform</span>
          </div>
        )}
        {sidebarCollapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-primary)]">
            <span className="text-sm font-bold text-[var(--color-primary-foreground)]">
              UI
            </span>
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav>
          {navItems.map((item) => (
            <SidebarNavItem
              key={item.href}
              icon={<item.icon className="h-5 w-5" />}
              active={item.active}
            >
              {item.label}
            </SidebarNavItem>
          ))}
        </SidebarNav>
      </SidebarContent>
      <SidebarFooter>
        {!sidebarCollapsed && (
          <div className="flex items-center gap-[var(--spacing-gap-sm)]">
            <Avatar src="" alt="John Doe" fallback="JD" size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-[var(--color-foreground-muted)] truncate">
                john@example.com
              </p>
            </div>
          </div>
        )}
        {sidebarCollapsed && <Avatar src="" alt="John Doe" fallback="JD" size="sm" />}
      </SidebarFooter>
    </Sidebar>
  );
}

function AppHeader() {
  return (
    <Header>
      <SidebarToggle />
      <HeaderBrand className="ml-[var(--spacing-lg)]">
        <span className="hidden md:inline">Enterprise Dashboard</span>
      </HeaderBrand>

      <HeaderActions>
        <div className="hidden md:flex items-center gap-[var(--spacing-gap-sm)]">
          <DensityToggle />
          <ThemeToggle />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Search className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge
            variant="error"
            size="sm"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
          >
            3
          </Badge>
        </Button>
        
        <Avatar src="" alt="John Doe" fallback="JD" size="sm" className="md:hidden" />
      </HeaderActions>
    </Header>
  );
}

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppShell>
      <AppHeader />
      <AppSidebar />
      <Content hasSidebar padding="lg">
        {children}
      </Content>
    </AppShell>
  );
}
