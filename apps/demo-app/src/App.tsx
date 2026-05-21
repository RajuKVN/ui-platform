import { Providers } from './providers';
import { AppLayout } from './layout/app-layout';
import { DashboardPage } from './pages/dashboard';
import { Toaster } from './components/toaster';

export function App() {
  return (
    <Providers>
      <AppLayout>
        <DashboardPage />
      </AppLayout>
      <Toaster />
    </Providers>
  );
}
