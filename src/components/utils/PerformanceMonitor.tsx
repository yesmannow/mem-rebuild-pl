import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
  });

  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Store all observers for cleanup
    let lcpObserver: PerformanceObserver | null = null;
    let fidObserver: PerformanceObserver | null = null;
    let clsObserver: PerformanceObserver | null = null;
    let fcpObserver: PerformanceObserver | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let clsValue = 0;

    const measurePerformance = () => {
      // Measure Core Web Vitals
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint (LCP)
        lcpObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        fidObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        clsObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              setMetrics(prev => ({ ...prev, cls: clsValue }));
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // First Contentful Paint (FCP)
        fcpObserver = new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            setMetrics(prev => ({ ...prev, fcp: entry.startTime }));
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Time to First Byte (TTFB) - one-time measurement
        const navigation = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        if (navigation) {
          setMetrics(prev => ({
            ...prev,
            ttfb: navigation.responseStart - navigation.requestStart,
          }));
        }
      }
    };

    // Measure performance after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Log metrics to console for debugging (use closure to access current metrics)
    timer = setTimeout(() => {
      setMetrics(currentMetrics => {
        console.log('📊 Performance Metrics:', {
          LCP: currentMetrics.lcp ? `${currentMetrics.lcp.toFixed(2)}ms` : 'Not measured',
          FID: currentMetrics.fid ? `${currentMetrics.fid.toFixed(2)}ms` : 'Not measured',
          CLS: currentMetrics.cls ? currentMetrics.cls.toFixed(3) : 'Not measured',
          FCP: currentMetrics.fcp ? `${currentMetrics.fcp.toFixed(2)}ms` : 'Not measured',
          TTFB: currentMetrics.ttfb ? `${currentMetrics.ttfb.toFixed(2)}ms` : 'Not measured',
        });
        return currentMetrics; // Return unchanged state
      });
    }, 15000); // 15 seconds should be enough for initial load metrics

    // CLEANUP FUNCTION: Disconnect all observers and clear timers
    return () => {
      if (lcpObserver) lcpObserver.disconnect();
      if (fidObserver) fidObserver.disconnect();
      if (clsObserver) clsObserver.disconnect();
      if (fcpObserver) fcpObserver.disconnect();
      if (timer !== null) clearTimeout(timer);
      window.removeEventListener('load', measurePerformance);
    };
  }, []); // Empty dependency array - setup only once on mount

  // Send metrics to analytics (if configured)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && metrics.lcp && metrics.fid && metrics.cls) {
      // Example: Send to Google Analytics
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as any).gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'Core Web Vitals',
          value: Math.round(metrics.lcp),
          custom_map: {
            lcp: metrics.lcp,
            fid: metrics.fid,
            cls: metrics.cls,
          },
        });
      }
    }
  }, [metrics]);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
