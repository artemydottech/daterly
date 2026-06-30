import { RefObject, useCallback, useLayoutEffect, useState } from 'react';

interface FloatingPosition {
  top: number;
  left: number;
}

export function useFloatingPosition(
  anchorRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): FloatingPosition {
  const [pos, setPos] = useState<FloatingPosition>({ top: 0, left: 0 });

  const update = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ top: rect.bottom, left: rect.left });
  }, [anchorRef]);

  useLayoutEffect(() => {
    if (!enabled) return;
    update();
    window.addEventListener('scroll', update, { capture: true, passive: true });
    window.addEventListener('resize', update, { passive: true });
    return () => {
      window.removeEventListener('scroll', update, { capture: true });
      window.removeEventListener('resize', update);
    };
  }, [enabled, update]);

  return pos;
}
