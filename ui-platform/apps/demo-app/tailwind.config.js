import { tailwindPreset } from '@ui-platform/design-tokens/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/layouts/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  presets: [tailwindPreset],
  theme: {
    extend: {},
  },
  plugins: [],
};
