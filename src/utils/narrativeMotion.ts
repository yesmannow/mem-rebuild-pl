// 🎞️ Scroll-triggered animation presets for cinematic résumé
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Variants, Easing } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export const useNarrativeMotion = (selector: string) => {
  gsap.utils.toArray(selector).forEach((el: any) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'bottom 15%',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
};

// Initialize narrative motion
export const initNarrativeMotion = () => {
  // Can be extended to initialize global GSAP settings
};

// Cleanup narrative motion
export const cleanupNarrativeMotion = () => {
  ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill());
};

// Scroll to section helper
export const scrollToSection = (sectionId: string, offset: number = 0) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  }
};

// Company themes for styling
export const companyThemes: Record<string, { color: string; gradient: string; primary: string; accent: string; bgGradient: string; secondary: string }> = {
  default: {
    color: '#3B82F6',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    primary: '#3B82F6',
    accent: '#8B5CF6',
    secondary: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
  },
  graston: {
    color: '#059669',
    gradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    primary: '#059669',
    accent: '#10B981',
    secondary: '#10B981',
    bgGradient: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
  },
  awards: {
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    primary: '#F59E0B',
    accent: '#EF4444',
    secondary: '#EF4444',
    bgGradient: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  },
  'early-career': {
    color: '#6366F1',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    primary: '#6366F1',
    accent: '#8B5CF6',
    secondary: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  },
  pike: {
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
    primary: '#EC4899',
    accent: '#F43F5E',
    secondary: '#F43F5E',
    bgGradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 100%)',
  },
  // Add more company themes as needed
};

// Framer Motion Variants
export const motionVariants: Record<string, Variants> = {
  // Section reveal animations
  sectionReveal: {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    }
  },

  // Staggered children animations
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Individual item animations
  staggerItem: {
    hidden: {
      opacity: 0,
      y: 30,
      x: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as Easing
      }
    }
  },

  // Metric counter animations
  counterReveal: {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: 'backOut' as Easing
      }
    }
  },

  // Timeline dot animations
  timelineDot: {
    inactive: {
      scale: 1,
      opacity: 0.5,
      boxShadow: '0 0 0px rgba(59, 130, 246, 0)'
    },
    active: {
      scale: 1.2,
      opacity: 1,
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
      transition: {
        duration: 0.3,
        ease: 'easeOut' as Easing
      }
    }
  },

  // Award card animations
  awardCard: {
    hidden: {
      opacity: 0,
      y: 50,
      rotateY: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: '0 20px 40px rgba(255, 215, 0, 0.3)',
      transition: {
        duration: 0.3,
        ease: 'easeOut' as Easing
      }
    }
  }
};
