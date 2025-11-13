import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook to trigger animations when element enters viewport
 * Uses Intersection Observer API for better performance
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: show immediately if not supported
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // If triggerOnce is true, stop observing after first trigger
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          // Only reset if we want to re-trigger
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Hook variant that returns animation class names directly
 * Makes it easier to apply animations
 */
export function useScrollAnimationClass<T extends HTMLElement = HTMLDivElement>(
  animationClass: string = 'animate-fade-in',
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isVisible } = useScrollAnimation<T>(options);

  return {
    ref,
    className: isVisible ? animationClass : 'opacity-0',
  };
}

/**
 * Hook for staggered list animations
 * Applies incremental delays to child elements
 */
export function useStaggeredAnimation<T extends HTMLElement = HTMLDivElement>(
  itemCount: number,
  baseDelay: number = 100,
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isVisible } = useScrollAnimation<T>(options);

  const getItemStyle = (index: number): React.CSSProperties => ({
    animationDelay: isVisible ? `${index * baseDelay}ms` : '0ms',
  });

  const getItemClassName = (index: number, baseClass: string = 'animate-fade-in'): string => {
    return isVisible ? baseClass : 'opacity-0';
  };

  return {
    ref,
    isVisible,
    getItemStyle,
    getItemClassName,
  };
}

/**
 * Hook to detect if user prefers reduced motion
 * Respects accessibility preferences
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook that combines scroll animation with reduced motion detection
 * Automatically disables animations if user prefers reduced motion
 */
export function useAccessibleAnimation<T extends HTMLElement = HTMLDivElement>(
  animationClass: string = 'animate-fade-in',
  options: UseScrollAnimationOptions = {}
) {
  const { ref, isVisible } = useScrollAnimation<T>(options);
  const prefersReducedMotion = usePrefersReducedMotion();

  return {
    ref,
    className: prefersReducedMotion
      ? '' // No animation if reduced motion preferred
      : isVisible
        ? animationClass
        : 'opacity-0',
    isVisible,
    prefersReducedMotion,
  };
}
