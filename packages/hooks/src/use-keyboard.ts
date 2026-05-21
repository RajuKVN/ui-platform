import { useEffect, useCallback } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

interface UseKeyboardOptions {
  /** Only trigger when this element is focused */
  target?: HTMLElement | null;
  /** Key modifiers */
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  /** Prevent default behavior */
  preventDefault?: boolean;
  /** Enabled state */
  enabled?: boolean;
}

/**
 * Hook to handle keyboard shortcuts
 */
export function useKeyboard(
  key: string,
  handler: KeyHandler,
  options: UseKeyboardOptions = {}
): void {
  const {
    target,
    ctrl = false,
    shift = false,
    alt = false,
    meta = false,
    preventDefault = true,
    enabled = true,
  } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      // Check if the key matches
      if (event.key.toLowerCase() !== key.toLowerCase()) return;

      // Check modifiers
      if (ctrl !== event.ctrlKey) return;
      if (shift !== event.shiftKey) return;
      if (alt !== event.altKey) return;
      if (meta !== event.metaKey) return;

      // Don't trigger in editable elements unless explicitly enabled
      const activeElement = document.activeElement;
      const isEditable =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        (activeElement as HTMLElement)?.contentEditable === 'true';

      if (isEditable && !target) return;

      if (preventDefault) {
        event.preventDefault();
      }

      handler(event);
    },
    [key, handler, ctrl, shift, alt, meta, preventDefault, enabled, target]
  );

  useEffect(() => {
    const element = target ?? window;
    element.addEventListener('keydown', handleKeyDown as EventListener);

    return () => {
      element.removeEventListener('keydown', handleKeyDown as EventListener);
    };
  }, [target, handleKeyDown]);
}

/**
 * Hook to handle escape key
 */
export function useEscapeKey(handler: () => void, enabled = true): void {
  useKeyboard('Escape', handler, { enabled });
}
