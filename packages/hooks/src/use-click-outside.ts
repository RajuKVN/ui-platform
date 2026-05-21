import { useEffect, useRef, type RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * Hook to detect clicks outside of an element
 * 
 * Uses a ref pattern internally to avoid re-subscribing to events
 * when the handler changes. The handler does NOT need to be memoized.
 * 
 * @param handler - Called when a click outside the element is detected
 * @param mouseEvent - The mouse event to listen for ('mousedown' or 'mouseup')
 * @returns A ref to attach to the element you want to detect clicks outside of
 * 
 * @example
 * ```tsx
 * function Dropdown() {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const ref = useClickOutside(() => setIsOpen(false));
 *   
 *   return isOpen ? <div ref={ref}>Dropdown content</div> : null;
 * }
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): RefObject<T> {
  const ref = useRef<T>(null);
  
  // Use a ref to store the handler to avoid stale closures
  // This allows the handler to change without re-subscribing to events
  const handlerRef = useRef<Handler>(handler);
  
  // Update the ref whenever the handler changes
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      // Call the latest handler from the ref
      handlerRef.current(event);
    };

    document.addEventListener(mouseEvent, listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener(mouseEvent, listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [mouseEvent]); // Only re-subscribe if mouseEvent changes

  return ref as RefObject<T>;
}
