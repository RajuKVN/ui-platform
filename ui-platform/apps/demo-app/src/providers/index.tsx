import React from 'react';
import { ThemeProvider, createTheme } from '@ui-platform/theme-engine';
import { TooltipProvider } from '@ui-platform/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * Full Brand Theme Configuration
 * 
 * Primary (#c915ed) - Vibrant Magenta/Fuchsia
 * - Main brand color used for primary actions
 * - Buttons, links, checkboxes, switches, focus rings
 * 
 * Secondary (#06b6d4) - Cyan/Teal
 * - Supporting actions and secondary buttons
 * - Provides contrast to primary
 * 
 * Accent (#f59e0b) - Amber/Orange
 * - Highlights, notifications, special callouts
 * - Draws attention to important elements
 */
const theme = createTheme({
    defaultColorMode: 'system',
    defaultDensity: 'comfortable',
  
    brand: {
      name: 'Demo App',
  
      colors: {
        // Primary - main brand color
        primary: '#9807db',
  
        // Secondary - complementary cool color
        secondary: '#22d3ee',
  
        // Accent - attention-grabbing warm color
        accent: '#fbbf24',
  
        // Backgrounds per mode (slight purple tint)
        background: {
          light: '#faf5ff', // very light lavender
          dark: '#120018',  // deep purple-black
        },
  
        // Text colors per mode
        foreground: {
          light: '#1f0729', // dark purple text
          dark: '#f3e8ff',  // light lavender text
        },
      },
  
      fonts: {
        sans: '"Plus Jakarta Sans", system-ui, sans-serif',
        mono: '"JetBrains Mono", monospace',
        display: '"Plus Jakarta Sans", system-ui, sans-serif',
      },
  
      // Border radius style
      radius: 'medium',
    },
  });
  

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme={theme}>
        <TooltipProvider delayDuration={300}>
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
