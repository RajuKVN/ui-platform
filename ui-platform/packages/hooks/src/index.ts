/**
 * @ui-platform/hooks
 * React hooks for the UI Platform
 */

export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  useIsLargeDesktop,
  usePrefersReducedMotion,
  usePrefersDarkMode,
} from './use-media-query';

export { useLocalStorage } from './use-local-storage';

export { useDebounce, useDebouncedCallback } from './use-debounce';

export { useClickOutside } from './use-click-outside';

export { useKeyboard, useEscapeKey } from './use-keyboard';

export { useDisclosure } from './use-disclosure';

export { usePrevious } from './use-previous';

export { useIsMounted } from './use-mounted';
