// Narrative Motion Utilities for Cinematic Resume Experience
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Company Color Themes
export const companyThemes = {
  "graston": {
    primary: "#3B82F6",
    secondary: "#EC4899",
    gradient: "from-blue-500 to-pink-500",
    bgGradient: "from-blue-950/20 to-pink-950/20",
    accent: "#60A5FA"
  },
  "pike": {
    primary: "#F472B6",
    secondary: "#EC4899", 
    gradient: "from-pink-400 to-pink-600",
    bgGradient: "from-pink-950/20 to-rose-950/20",
    accent: "#F9A8D4"
  },
  "early-career": {
    primary: "#06B6D4",
    secondary: "#3B82F6",
    gradient: "from-cyan-500 to-blue-500", 
    bgGradient: "from-cyan-950/20 to-blue-950/20",
    accent: "#67E8F9"
  },
  "awards": {
    primary: "#FFD700",
    secondary: "#FFA500",
    gradient: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-950/20 to-orange-950/20",
    accent: "#FBBF24"
  }
};

// Framer Motion Variants
export const motionVariants = {
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
        ease: [0.25, 0.46, 0.45, 0.94]
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
        ease: "easeOut"
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
        ease: "backOut"
      }
    }
  },

  // Timeline dot animations
  timelineDot: {
    inactive: { 
      scale: 1, 
      opacity: 0.5,
      boxShadow: "0 0 0px rgba(59, 130, 246, 0)"
    },
    active: { 
      scale: 1.2, 
      opacity: 1,
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
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
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 40px rgba(255, 215, 0, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }
};

// GSAP ScrollTrigger Animations
export const createScrollAnimations = () => {
  // Parallax background elements
  gsap.utils.toArray('.parallax-bg').forEach(bg => {
    gsap.to(bg, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: bg,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });

  // Section background gradient shifts
  gsap.utils.toArray('.experience-section').forEach((section, index) => {
    const theme = section.dataset.theme;
    const colors = companyThemes[theme];
    
    if (colors) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to('body', {
            background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)`,
            duration: 1
          });
        },
        onLeave: () => {
          gsap.to('body', {
            background: 'linear-gradient(135deg, #00000010, #00000010)',
            duration: 1
          });
        }
      });
    }
  });

  // Metric counter animations
  gsap.utils.toArray('.metric-counter').forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    
    ScrollTrigger.create({
      trigger: counter,
      start: "top 80%",
      onEnter: () => {
        gsap.to(counter, {
          innerHTML: target,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            counter.innerHTML = Math.ceil(this.targets()[0].innerHTML) + suffix;
          }
        });
      }
    });
  });

  // Timeline navigation sync
  gsap.utils.toArray('.timeline-section').forEach((section, index) => {
    const navDot = document.querySelector(`[data-timeline-index="${index}"]`);
    
    ScrollTrigger.create({
      trigger: section,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => {
        document.querySelectorAll('.timeline-dot').forEach(dot => 
          dot.classList.remove('active')
        );
        if (navDot) navDot.classList.add('active');
      },
      onEnterBack: () => {
        document.querySelectorAll('.timeline-dot').forEach(dot => 
          dot.classList.remove('active')
        );
        if (navDot) navDot.classList.add('active');
      }
    });
  });
};

// Smooth scroll to section
export const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId);
  if (section) {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: section, offsetY: 100 },
      ease: "power2.inOut"
    });
  }
};

// Initialize all animations
export const initNarrativeMotion = () => {
  // Refresh ScrollTrigger on load
  ScrollTrigger.refresh();
  
  // Create scroll animations
  createScrollAnimations();
  
  // Add resize listener
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
};

// Cleanup function
export const cleanupNarrativeMotion = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

export default {
  companyThemes,
  motionVariants,
  createScrollAnimations,
  scrollToSection,
  initNarrativeMotion,
  cleanupNarrativeMotion
};
