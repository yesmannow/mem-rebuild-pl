import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Virtual Scrolling for Large Lists
export const VirtualScroll: React.FC<{
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
  className?: string;
}> = ({ items, itemHeight, containerHeight, renderItem, className = "" }) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(visibleStart, visibleEnd);
  const totalHeight = items.length * itemHeight;
  const offsetY = visibleStart * itemHeight;

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Set dynamic styles via CSS custom properties
  React.useEffect(() => {
    if (containerRef) {
      containerRef.style.setProperty('--container-height', `${containerHeight}px`);
    }
  }, [containerHeight, containerRef]);

  React.useEffect(() => {
    if (containerRef) {
      const contentEl = containerRef.querySelector('.virtual-scroll-content') as HTMLElement;
      const itemsEl = containerRef.querySelector('.virtual-scroll-items') as HTMLElement;
      if (contentEl) contentEl.style.setProperty('--content-height', `${totalHeight}px`);
      if (itemsEl) itemsEl.style.setProperty('--scroll-transform', `translateY(${offsetY}px)`);
    }
  }, [totalHeight, offsetY, containerRef]);

  return (
    <div
      ref={setContainerRef}
      className={`overflow-auto virtual-scroll-container ${className}`}
      onScroll={handleScroll}
    >
      <div className="virtual-scroll-content">
        <div className="virtual-scroll-items">
          {visibleItems.map((item, index) =>
            renderItem(item, visibleStart + index)
          )}
        </div>
      </div>
    </div>
  );
};

// Image Lazy Loading with Intersection Observer
export const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}> = ({
  src,
  alt,
  className = "",
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+",
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = React.useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={isInView ? src : placeholder}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Failed to load</span>
        </div>
      )}
    </div>
  );
};

// Debounced Search Hook
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Memoized Filter Hook
export const useFilteredItems = <T,>(
  items: T[],
  searchQuery: string,
  filters: Record<string, any>,
  searchFields: (keyof T)[]
) => {
  return useMemo(() => {
    let filtered = [...items];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        searchFields.some(field => {
          const value = item[field];
          return typeof value === 'string' &&
                 value.toLowerCase().includes(query);
        })
      );
    }

    // Apply other filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'All') {
        filtered = filtered.filter(item =>
          (item as any)[key] === value
        );
      }
    });

    return filtered;
  }, [items, searchQuery, filters, searchFields]);
};

// Performance Monitor Hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    fps: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measurePerformance = () => {
      const currentTime = performance.now();
      frameCount++;

      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime)),
          memoryUsage: (performance as any).memory?.usedJSHeapSize || 0
        }));

        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(measurePerformance);
    };

    measurePerformance();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return metrics;
};

// Optimized Grid Component
export const OptimizedGrid: React.FC<{
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}> = ({
  items,
  renderItem,
  columns = 3,
  gap = 16,
  className = ""
}) => {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, 20));
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = useCallback(() => {
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      setVisibleItems(prev => [
        ...prev,
        ...items.slice(prev.length, prev.length + 20)
      ]);
      setIsLoading(false);
    }, 500);
  }, [items]);

  const hasMore = visibleItems.length < items.length;

  // Set grid styles
  React.useEffect(() => {
    const gridEl = document.querySelector('.virtual-grid') as HTMLElement;
    if (gridEl) {
      gridEl.style.setProperty('--grid-columns', columns.toString());
      gridEl.style.setProperty('--grid-gap', `${gap}px`);
    }
  }, [columns, gap]);

  return (
    <div className={className}>
      <div
        className="grid virtual-grid"
      >
        {visibleItems.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <motion.button
            onClick={loadMore}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </motion.button>
        </div>
      )}
    </div>
  );
};

// Image Preloader
export const ImagePreloader: React.FC<{
  images: string[];
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
}> = ({ images, onComplete, onProgress }) => {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let loaded = 0;
    const total = images.length;

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadedCount(loaded);
          onProgress?.(loaded / total);
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    Promise.all(images.map(preloadImage))
      .then(() => onComplete?.())
      .catch(console.error);
  }, [images, onComplete, onProgress]);

  return null;
};

// Scroll Performance Optimizer
export const ScrollOptimizer: React.FC<{
  children: React.ReactNode;
  throttleMs?: number;
}> = ({ children, throttleMs = 16 }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    const throttledScroll = throttle(handleScroll, throttleMs);
    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [throttleMs]);

  return (
    <div data-scroll-y={scrollY} data-is-scrolling={isScrolling}>
      {children}
    </div>
  );
};

// Throttle utility function
const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};

export default {
  VirtualScroll,
  LazyImage,
  useDebounce,
  useFilteredItems,
  usePerformanceMonitor,
  OptimizedGrid,
  ImagePreloader,
  ScrollOptimizer
};
