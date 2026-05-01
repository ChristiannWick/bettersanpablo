import { useCallback, useRef, useState } from 'react';

type UseInViewOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

export default function useInView<T extends Element = HTMLElement>(
  options?: UseInViewOptions
) {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      const { root = null, rootMargin = '0px', threshold = 0.1, once = false } = options || {};

      observerRef.current = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setInView(true);
              if (once) {
                observerRef.current?.unobserve(entry.target);
              }
            } else {
              if (!once) {
                setInView(false);
              }
            }
          });
        },
        { root, rootMargin, threshold }
      );

      observerRef.current.observe(node);
    },
    [options?.root, options?.rootMargin, options?.threshold, options?.once]
  );

  return [ref, inView] as const;
}
