/* ===================================================================
   JACOB DARLING PORTFOLIO - MOTION & INTERACTION SYSTEM
   Cinematic • Modern • Technological Elegance
   =================================================================== */

// ===== EASING CURVES =====
export const easing = {
  // Standard easing
  linear: [0, 0, 1, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  
  // Cinematic easing
  cinematic: [0.25, 0.46, 0.45, 0.94],
  dramatic: [0.68, -0.55, 0.265, 1.55],
  smooth: [0.25, 0.1, 0.25, 1],
  
  // Bounce & elastic
  bounce: [0.68, -0.6, 0.32, 1.6],
  elastic: [0.175, 0.885, 0.32, 1.275],
  
  // Custom brand curves
  brandEntry: [0.23, 1, 0.32, 1],
  brandExit: [0.755, 0.05, 0.855, 0.06],
  brandHover: [0.4, 0, 0.2, 1]
};

// ===== DURATION TOKENS =====
export const duration = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
  
  // Cinematic durations
  cinematic: 1.5,
  dramatic: 2.0,
  epic: 3.0
};

// ===== CORE MOTION PRESETS =====
export const motion = {
  // ===== FADE ANIMATIONS =====
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: duration.slow, ease: easing.easeOut }
  },
  
  fadeInFast: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: duration.fast, ease: easing.easeOut }
  },
  
  fadeInSlow: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: duration.slowest, ease: easing.cinematic }
  },
  
  fadeOut: {
    initial: { opacity: 1 },
    animate: { opacity: 0 },
    transition: { duration: duration.normal, ease: easing.easeIn }
  },
  
  // ===== SLIDE ANIMATIONS =====
  slideUp: {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: duration.slow, ease: easing.brandEntry }
  },
  
  slideDown: {
    initial: { y: -40, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: duration.slow, ease: easing.brandEntry }
  },
  
  slideInLeft: {
    initial: { x: -60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: duration.slow, ease: easing.brandEntry }
  },
  
  slideInRight: {
    initial: { x: 60, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: duration.slow, ease: easing.brandEntry }
  },
  
  // ===== SCALE ANIMATIONS =====
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: duration.slow, ease: easing.elastic }
  },
  
  scaleOut: {
    initial: { scale: 1, opacity: 1 },
    animate: { scale: 0.8, opacity: 0 },
    transition: { duration: duration.normal, ease: easing.easeIn }
  },
  
  // ===== GLOW & PULSE EFFECTS =====
  glowPulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      boxShadow: [
        "0 0 20px rgba(59,130,246,0.3)",
        "0 0 40px rgba(59,130,246,0.6), 0 0 60px rgba(236,72,153,0.4)",
        "0 0 20px rgba(59,130,246,0.3)"
      ]
    },
    transition: {
      duration: duration.dramatic,
      repeat: Infinity,
      ease: easing.smooth
    }
  },
  
  subtleGlow: {
    animate: {
      boxShadow: [
        "0 0 10px rgba(59,130,246,0.2)",
        "0 0 20px rgba(59,130,246,0.4)",
        "0 0 10px rgba(59,130,246,0.2)"
      ]
    },
    transition: {
      duration: duration.cinematic,
      repeat: Infinity,
      ease: easing.smooth
    }
  },
  
  // ===== HOVER INTERACTIONS =====
  buttonHover: {
    scale: 1.05,
    boxShadow: "0 10px 30px rgba(59,130,246,0.3), 0 5px 15px rgba(236,72,153,0.2)",
    transition: { duration: duration.fast, ease: easing.brandHover }
  },
  
  cardHover: {
    y: -8,
    scale: 1.02,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 0 30px rgba(59,130,246,0.1)",
    transition: { duration: duration.normal, ease: easing.brandHover }
  },
  
  linkHover: {
    scale: 1.1,
    color: "#EC4899",
    transition: { duration: duration.fast, ease: easing.brandHover }
  },
  
  // ===== LOADING ANIMATIONS =====
  spin: {
    animate: { rotate: 360 },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  },
  
  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7]
    },
    transition: {
      duration: duration.slow,
      repeat: Infinity,
      ease: easing.smooth
    }
  },
  
  // ===== CINEMATIC ENTRANCES =====
  cinematicEntry: {
    initial: { 
      y: 100, 
      opacity: 0, 
      scale: 0.9,
      filter: "blur(10px)"
    },
    animate: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)"
    },
    transition: { 
      duration: duration.cinematic, 
      ease: easing.cinematic,
      staggerChildren: 0.1
    }
  },
  
  dramaticReveal: {
    initial: { 
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      opacity: 0
    },
    animate: { 
      clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
      opacity: 1
    },
    transition: { 
      duration: duration.dramatic, 
      ease: easing.dramatic 
    }
  }
};

// ===== STAGGER CONFIGURATIONS =====
export const stagger = {
  container: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  fastStagger: {
    animate: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  },
  
  slowStagger: {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },
  
  cinematicStagger: {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  }
};

// ===== PAGE TRANSITIONS =====
export const pageTransitions = {
  slideLeft: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: duration.slow, ease: easing.brandEntry }
  },
  
  slideRight: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
    transition: { duration: duration.slow, ease: easing.brandEntry }
  },
  
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: duration.normal, ease: easing.easeInOut }
  },
  
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
    transition: { duration: duration.slow, ease: easing.cinematic }
  }
};

// ===== SCROLL ANIMATIONS =====
export const scrollAnimations = {
  parallaxSlow: {
    y: [0, -50],
    transition: { ease: "linear" }
  },
  
  parallaxFast: {
    y: [0, -100],
    transition: { ease: "linear" }
  },
  
  revealUp: {
    initial: { y: 60, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: duration.slow, ease: easing.brandEntry }
  },
  
  revealScale: {
    initial: { scale: 0.8, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: duration.slow, ease: easing.elastic }
  }
};

// ===== GESTURE ANIMATIONS =====
export const gestures = {
  tap: { scale: 0.95 },
  hover: { scale: 1.05 },
  focus: { 
    scale: 1.02,
    boxShadow: "0 0 0 3px rgba(59,130,246,0.3)"
  }
};

// ===== EXPORT ALL =====
export default {
  easing,
  duration,
  motion,
  stagger,
  pageTransitions,
  scrollAnimations,
  gestures
};
