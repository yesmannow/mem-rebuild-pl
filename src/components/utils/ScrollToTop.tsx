import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { refreshLenis } from '../../utils/motion-sync';
import { scrollToTop } from '../../utils/scroll';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timers: number[] = [];

    // Scroll to the very top immediately (Lenis preferred, native fallback)
    scrollToTop({ immediate: true });

    // Store timeout IDs for cleanup
    [100, 300, 600, 1000].forEach(delay => {
      const id = window.setTimeout(refreshLenis, delay);
      timers.push(id);
    });

    // Cleanup function to clear all timers
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
