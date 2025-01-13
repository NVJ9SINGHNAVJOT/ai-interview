import { useEffect } from "react";

type UseOnScreenOptions = {
  threshold?: number; // Intersection threshold
  rootMargin?: string; // Margin around the root
};

type UseOnScreenHook = (ref: React.RefObject<HTMLElement>, callback: () => void, options?: UseOnScreenOptions) => void;

export const useOnScreen: UseOnScreenHook = (ref, callback, options = {}) => {
  const { threshold = 0.7, rootMargin = "0px" } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, callback, threshold, rootMargin]);
};
