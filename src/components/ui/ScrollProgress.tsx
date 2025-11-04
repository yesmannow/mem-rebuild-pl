import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { getLenis } from "../../utils/motion-sync";

const ScrollProgress: React.FC = () => {
  const scrollProgress = useMotionValue(0);
  const scaleY = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);
  const [percentText, setPercentText] = useState("0%");

  useEffect(() => {
    const lenis = getLenis();

    // Use native scroll if Lenis is not available
    const handleNativeScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      scrollProgress.set(progress);
      setIsVisible(progress > 0.05);
      setPercentText(`${Math.round(progress * 100)}%`);
    };

    if (!lenis) {
      // Fallback to native scroll
      window.addEventListener('scroll', handleNativeScroll, { passive: true });
      handleNativeScroll(); // Initial calculation

      return () => window.removeEventListener('scroll', handleNativeScroll);
    }

    // Use Lenis scroll events for more accurate progress tracking
    const onScroll = () => {
      // Calculate progress from Lenis scroll position
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY; // Lenis updates window.scrollY
      const progress = scrollHeight > 0 ? currentScroll / scrollHeight : 0;
      scrollProgress.set(progress);
      setIsVisible(progress > 0.05);
      setPercentText(`${Math.round(progress * 100)}%`);
    };

    // Lenis scroll event fires on every scroll update
    lenis.on('scroll', onScroll);

    // Initial calculation
    handleNativeScroll();

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [scrollProgress]);

  return (
    <motion.div
      className="fixed right-4 top-0 bottom-0 z-50 flex items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress Track */}
      <div className="relative w-1 h-64 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        {/* Progress Fill */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 rounded-full origin-bottom"
          style={{ scaleY }}
        />

        {/* Glow Effect */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 via-purple-400 to-pink-400 rounded-full origin-bottom blur-sm opacity-60"
          style={{ scaleY }}
        />
      </div>

      {/* Progress Percentage */}
      <motion.div
        className="absolute -right-12 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg px-2 py-1 text-xs text-white font-mono"
        style={{
          bottom: useTransform(scaleY, (latest) => latest * 256 - 12)
        }}
      >
        {percentText}
      </motion.div>
    </motion.div>
  );
};

export default ScrollProgress;
