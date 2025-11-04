import { getLenis } from "./motion-sync";

type ScrollOptions = {
  duration?: number;
  immediate?: boolean;
};

export function scrollToPosition(position: number, { duration = 0.8, immediate = false }: ScrollOptions = {}) {
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(position, immediate ? { immediate: true } : {
      duration,
      easing: (t: number) => 1 - Math.pow(1 - t, 2)
    });
    return;
  }

  window.scrollTo({
    top: position,
    behavior: immediate || duration === 0 ? "auto" : "smooth"
  });
}

/**
 * Shared helper to scroll the page to the top using Lenis when available.
 * Falls back to native scrolling to ensure functionality when Lenis hasn't been initialised.
 */
export function scrollToTop({ offset = 0, duration = 0.8, immediate = false }: ScrollOptions & { offset?: number } = {}) {
  scrollToPosition(offset, { duration, immediate });
}
