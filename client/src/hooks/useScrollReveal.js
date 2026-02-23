import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver that adds/removes the `visible` class
 * on every element that has the class `reveal`, `reveal-left`, or `reveal-scale`.
 * Elements with `data-delay="N"` (milliseconds) get that transition-delay applied.
 */
export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-scale, .line-reveal",
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const delay = el.dataset.delay || 0;
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("visible");
          } else {
            // re-animate on scroll back up
            el.style.transitionDelay = "0ms";
            el.classList.remove("visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });
}

/**
 * Animates a numeric counter from 0 to `target` when the ref element enters view.
 */
export function useCountUp(ref, target, duration = 1500) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const numericTarget = parseInt(target.replace(/\D/g, ""), 10);
        const suffix = target.replace(/[0-9]/g, "");

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * numericTarget) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);
}
