import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Global Lenis instance - single source of truth
let lenis: Lenis | null = null;

/**
 * Initialize Lenis smooth scroll with GSAP ScrollTrigger integration
 * Ensures only one instance exists across the entire app
 */
export function initLenis(): Lenis | null {
  // Prevent multiple instances - return existing instance without logging
  if (lenis) {
    return lenis; // Silent return - already initialized
  }

  // Only initialize in browser environment
  if (typeof window === 'undefined') return null;

  try {
    lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
    });

    // Simple RAF loop for Lenis
    function raf(time: number) {
      if (lenis) {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis scroll with ScrollTrigger
    if (lenis.on) {
      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });
    }

    // Only log on actual initialization (first call)
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Lenis initialized successfully', lenis);
    }

    return lenis;
  } catch (error) {
    console.error('❌ Lenis initialization failed:', error);
    // Ensure native scrolling works
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    return null;
  }
}

/**
 * Get the current Lenis instance
 */
export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Destroy Lenis instance
 * Note: In React StrictMode dev mode, this should typically not be called
 * as it can cause re-initialization issues. Lenis should persist for app lifetime.
 */
export function destroyLenis(): void {
  if (lenis) {
    try {
      if (typeof lenis.destroy === 'function') {
        lenis.destroy();
      }
      lenis = null;
      if (process.env.NODE_ENV === 'development') {
        console.log('🔄 Lenis destroyed (cleanup)');
      }
    } catch (error) {
      console.error('Error destroying Lenis:', error);
      lenis = null;
    }
  }
}

// Refresh Lenis when content changes (for route changes)
export function refreshLenis() {
  if (lenis) {
    // Force a resize to recalculate scroll height
    lenis.resize();

    // Refresh ScrollTrigger instances
    ScrollTrigger.refresh();

    // Additional refresh after a delay to catch any lazy-loaded content
    setTimeout(() => {
      if (lenis) {
        lenis.resize();
        ScrollTrigger.refresh();
      }
    }, 300);
  }
}

// Debug function to check if scrolling is working
export function debugScrolling() {
  // Debug logging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('Lenis instance:', lenis);
    console.log('Document height:', document.documentElement.scrollHeight);
    console.log('Window height:', window.innerHeight);
    console.log('Can scroll:', document.documentElement.scrollHeight > window.innerHeight);
  }
}

// Global animation state management
class MotionSync {
  private activeAnimations: Set<any> = new Set();
  private scrollAnimations: Set<gsap.core.Tween> = new Set();

  // Register anime.js animation for cleanup
  registerAnime(animation: any) {
    this.activeAnimations.add(animation);
    if (animation && animation.finished) {
      animation.finished.then(() => {
        this.activeAnimations.delete(animation);
      });
    }
  }

  // Register GSAP animation for cleanup
  registerGsap(animation: gsap.core.Tween) {
    this.scrollAnimations.add(animation);
  }

  // Pause all animations (useful for performance)
  pauseAll() {
    this.activeAnimations.forEach(anim => {
      if (anim && typeof anim.pause === 'function') {
        anim.pause();
      }
    });
    this.scrollAnimations.forEach(anim => {
      if (anim && typeof anim.pause === 'function') {
        anim.pause();
      }
    });
  }

  // Resume all animations
  resumeAll() {
    this.activeAnimations.forEach(anim => {
      if (anim && typeof anim.play === 'function') {
        anim.play();
      }
    });
    this.scrollAnimations.forEach(anim => {
      if (anim && typeof anim.resume === 'function') {
        anim.resume();
      }
    });
  }

  // Clean up completed animations
  cleanup() {
    this.activeAnimations.clear();
    this.scrollAnimations.forEach(anim => {
      if (anim && !anim.isActive()) {
        this.scrollAnimations.delete(anim);
      }
    });
  }
}

export const motionSync = new MotionSync();

// Note: RAF loop is started in initLenis() function above

// Cinematic scroll synchronization with enhanced effects
export function useCinematicScrollSync() {
  const sections = document.querySelectorAll<HTMLElement>('[data-scroll-section]');
  sections.forEach((section: HTMLElement) => {
    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => {
        const tween = gsap.to(section, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'power3.out',
        });
        motionSync.registerGsap(tween);
      },
      onLeaveBack: () => {
        const tween = gsap.to(section, {
          opacity: 0.5,
          y: 50,
          scale: 0.98,
          filter: 'blur(2px)',
          duration: 0.8,
          ease: 'power2.out',
        });
        motionSync.registerGsap(tween);
      },
    });
  });
}

// Cinematic page transitions
export function createPageTransition(element: HTMLElement, direction: 'in' | 'out') {
  const isEntering = direction === 'in';

  // Temporarily using GSAP instead of anime.js for deployment
  return gsap.to(element, {
    opacity: isEntering ? 1 : 0,
    y: isEntering ? 0 : -50,
    scale: isEntering ? 1 : 1.05,
    filter: isEntering ? 'blur(0px)' : 'blur(10px)',
    duration: 0.8,
    ease: 'power2.out',
    onStart: () => {
      if (isEntering) {
        element.style.pointerEvents = 'none';
      }
    },
    onComplete: () => {
      element.style.pointerEvents = 'auto';
    },
  });
}

// Synchronized hover effects
export function createHoverSync(
  element: HTMLElement,
  options: {
    scale?: number;
    y?: number;
    glow?: boolean;
    duration?: number;
  }
) {
  const { scale = 1.05, y = -5, glow = true, duration = 300 } = options;

  const enterAnimation = () => {
    const gsapInstance = gsap.to(element, {
      scale: scale,
      y: y,
      filter: glow ? 'drop-shadow(0 10px 20px rgba(136, 171, 242, 0.3))' : 'none',
      duration: duration / 1000,
      ease: 'power2.out',
    });
    motionSync.registerGsap(gsapInstance);
  };

  const leaveAnimation = () => {
    const gsapInstance = gsap.to(element, {
      scale: 1,
      y: 0,
      filter: 'drop-shadow(0 0 0px rgba(136, 171, 242, 0))',
      duration: duration / 1000,
      ease: 'power2.out',
    });
    motionSync.registerGsap(gsapInstance);
  };

  element.addEventListener('mouseenter', enterAnimation);
  element.addEventListener('mouseleave', leaveAnimation);

  return () => {
    element.removeEventListener('mouseenter', enterAnimation);
    element.removeEventListener('mouseleave', leaveAnimation);
  };
}

// Performance monitoring
export function enablePerformanceMode() {
  // Reduce animation quality on low-end devices
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    gsap.config({ force3D: false });
    // anime.suspendWhenDocumentHidden = true; // Not available in this version
  }

  // Pause animations when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      motionSync.pauseAll();
    } else {
      motionSync.resumeAll();
    }
  });
}

// Export getLenis() instead of direct instance to ensure proper initialization
export default getLenis;
