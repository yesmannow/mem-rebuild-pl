import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { motion as motionTokens, stagger } from "../../styles/motion-tokens.js";
import "./Hero.css";

const Hero: React.FC = () => {
  const [activeWord, setActiveWord] = useState(0);
  const words = ["Strategy", "Automation", "Systems", "Storytelling"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        {...stagger.cinematicStagger}
      >
        <motion.h1
          className="hero-title gradient-text"
          {...motionTokens.cinematicEntry}
        >
          Where Complexity Becomes{" "}
          <span className="gradient-text">Clarity</span>.
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          {...motionTokens.slideUp}
        >
          I craft systems where design and technology move as one.
          Turning curiosity into conversion. Chaos into clarity.
        </motion.p>

        <motion.div
          className="cta-group"
          {...motionTokens.fadeIn}
        >
          <motion.div whileHover={motionTokens.buttonHover} whileTap={{ scale: 0.95 }}>
            <Link className="btn-primary" to="/case-studies">
              Explore My Work
            </Link>
          </motion.div>
          <motion.div whileHover={motionTokens.buttonHover} whileTap={{ scale: 0.95 }}>
            <a
              className="btn-secondary"
              href="/resume/Resume JD draft.pdf"
              download="Jacob-Darling-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View My Story
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="tagline-rotation"
          {...motionTokens.fadeInSlow}
        >
          {words.map((word, index) => (
            <React.Fragment key={word}>
              <motion.span
                className="tagline-word"
                animate={{
                  opacity: index === activeWord ? 1 : 0.3,
                  scale: index === activeWord ? 1.1 : 1,
                  color: index === activeWord ? "#EC4899" : "#A1A1AA"
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {word}
              </motion.span>
              {index < words.length - 1 && (
                <span className="separator">•</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>

      <div className="hero-background">
        <motion.div
          className="gradient-orb orb-1"
          {...motionTokens.glowPulse}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </section>
  );
};

export default Hero;