import { RefObject, useEffect } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  excludeRefs: ReadonlyArray<RefObject<HTMLElement | null>> = [],
) {
  useEffect(() => {
    function listener(e: MouseEvent) {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      if (excludeRefs.some((r) => r.current?.contains(target))) return;
      handler();
    }
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler, excludeRefs]);
}
