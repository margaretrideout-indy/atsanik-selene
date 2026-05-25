import { useEffect, useRef, useState } from 'react';

/**
 * usePullToRefresh — attaches a native-style pull-to-refresh to a scrollable container.
 * @param {Function} onRefresh  async callback to invoke on pull
 * @param {Object}   options
 * @param {number}   options.threshold  px to pull before triggering (default 72)
 * @returns {{ ref, isPulling, pullDistance, isRefreshing }}
 */
export default function usePullToRefresh(onRefresh, { threshold = 72 } = {}) {
  const ref = useRef(null);
  const startY = useRef(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onTouchStart = (e) => {
      // Only start pull when already scrolled to the top
      if (el.scrollTop > 0) return;
      startY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (startY.current === null) return;
      if (isRefreshing) return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta <= 0) { setPullDistance(0); setIsPulling(false); return; }
      // Resist the pull with a log curve so it feels springy
      const dist = Math.min(delta * 0.45, threshold * 1.5);
      setPullDistance(dist);
      setIsPulling(true);
      if (delta > 10) e.preventDefault(); // prevent scroll-bounce competing
    };

    const onTouchEnd = async () => {
      if (!isPulling) { startY.current = null; return; }
      if (pullDistance >= threshold) {
        setIsRefreshing(true);
        setPullDistance(threshold * 0.6); // settle to indicator height
        await onRefresh();
        setIsRefreshing(false);
      }
      setPullDistance(0);
      setIsPulling(false);
      startY.current = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [onRefresh, threshold, isPulling, pullDistance, isRefreshing]);

  return { ref, isPulling, pullDistance, isRefreshing };
}