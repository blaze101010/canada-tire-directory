// Performance optimization utilities

/**
 * Debounce function - delays execution until after wait time has elapsed
 * Useful for search inputs, window resize, etc.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function - ensures function only executes once per time period
 * Useful for scroll events, mouse movements, etc.
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Lazy load images when they enter viewport
 * Uses Intersection Observer API
 */
export function lazyLoadImage(img: HTMLImageElement): void {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLImageElement;
            const src = target.dataset.src;
            if (src) {
              target.src = src;
              target.removeAttribute('data-src');
            }
            observer.unobserve(target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    observer.observe(img);
  } else {
    // Fallback for browsers without Intersection Observer
    const src = img.dataset.src;
    if (src) {
      img.src = src;
    }
  }
}

/**
 * Simple in-memory cache with TTL (Time To Live)
 */
class SimpleCache<T> {
  private cache = new Map<string, { data: T; expires: number }>();

  set(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
    const expires = Date.now() + ttlMs;
    this.cache.set(key, { data, expires });
  }

  get(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): void {
    this.cache.delete(key);
  }
}

// Export a singleton cache instance for app-wide use
export const appCache = new SimpleCache();

/**
 * Memoize expensive function results
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Preload critical resources
 */
export function preloadResource(url: string, as: 'script' | 'style' | 'image' | 'font'): void {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Check if device is in reduced motion mode (accessibility)
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Measure page load performance
 */
export function measurePerformance(): {
  dns?: number;
  tcp?: number;
  request?: number;
  response?: number;
  dom?: number;
  load?: number;
} | null {
  if (!window.performance || !window.performance.timing) {
    return null;
  }

  const timing = window.performance.timing;

  return {
    dns: timing.domainLookupEnd - timing.domainLookupStart,
    tcp: timing.connectEnd - timing.connectStart,
    request: timing.responseStart - timing.requestStart,
    response: timing.responseEnd - timing.responseStart,
    dom: timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart,
    load: timing.loadEventEnd - timing.loadEventStart,
  };
}
