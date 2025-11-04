import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import anime from "animejs"; // Temporarily disabled for deployment
import AnimatedLogo from "./AnimatedLogo";
import "./SplashIntro.css";

interface SplashIntroProps {
  onComplete?: () => void;
  duration?: number;
  enableAudio?: boolean;
}

const SplashIntro: React.FC<SplashIntroProps> = ({ 
  onComplete, 
  duration = 3000,
  enableAudio = false 
}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);

  useEffect(() => {
    // Optional audio cue
    if (enableAudio) {
      const audio = new Audio("/audio/intro-flare.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Silently handle audio play failure (user interaction required)
      });
    }

    // Auto-hide splash after duration
    const timer = setTimeout(() => {
      setShowIntro(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800); // Allow exit animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, enableAudio, onComplete]);

  // Text animation sequence - simplified for deployment
  useEffect(() => {
    if (!logoAnimationComplete) return;

    // Simple CSS-based animations
    setTimeout(() => {
      const tagline = document.querySelector('.splash-tagline') as HTMLElement;
      const subtitle = document.querySelector('.splash-subtitle') as HTMLElement;
      const particles = document.querySelector('.splash-particles') as HTMLElement;
      
      if (tagline) {
        tagline.style.opacity = '1';
        tagline.style.transform = 'translateY(0)';
      }
      
      setTimeout(() => {
        if (subtitle) {
          subtitle.style.opacity = '1';
          subtitle.style.transform = 'translateY(0)';
        }
      }, 200);
      
      setTimeout(() => {
        if (particles) {
          particles.style.opacity = '1';
          particles.style.transform = 'scale(1)';
        }
      }, 400);
    }, 200);

  }, [logoAnimationComplete]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const backgroundVariants = {
    initial: { 
      background: "radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)"
    },
    animate: { 
      background: [
        "radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)",
        "radial-gradient(circle at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
        "radial-gradient(circle at center, #88ABF210 0%, #667eea05 50%, #000000 100%)"
      ],
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="splash-intro"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div 
            className="splash-background"
            variants={backgroundVariants}
            initial="initial"
            animate="animate"
          />
          
          {/* Floating particles */}
          <div className="splash-particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{
                  opacity: 0,
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, Math.random() * 0.5 + 0.5, 0],
                  y: [
                    Math.random() * window.innerHeight,
                    Math.random() * window.innerHeight - 100
                  ]
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>

          <div className="splash-content">
            {/* Animated Logo */}
            <motion.div
              className="splash-logo-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <AnimatedLogo 
                size={120}
                variant="splash"
                onAnimationComplete={() => setLogoAnimationComplete(true)}
              />
            </motion.div>

            {/* Main tagline */}
            <motion.h1 
              className="splash-tagline"
              style={{ opacity: 0 }}
            >
              Design. Motion. Code.
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="splash-subtitle"
              style={{ opacity: 0 }}
            >
              Identity in Motion
            </motion.p>

            {/* Loading indicator */}
            <motion.div 
              className="splash-loader"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: duration / 1000,
                ease: "easeInOut"
              }}
            />
          </div>

          {/* Skip button */}
          <motion.button
            className="splash-skip"
            onClick={() => setShowIntro(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Skip Intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashIntro;
