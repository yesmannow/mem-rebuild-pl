import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../hero/Hero.css";

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="hero-title gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Where Complexity Becomes{" "}
          <span className="gradient-text">Clarity</span>.
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          I craft systems where design and technology move as one.
          Turning curiosity into conversion. Chaos into clarity.
        </motion.p>

        <motion.div
          className="cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link to="/contact" className="cta primary">
            Start a Conversation
          </Link>
          <Link to="/case-studies" className="cta secondary">
            View My Work
          </Link>
        </motion.div>

        <motion.div
          className="tagline-rotation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {words.map((word, index) => (
            <React.Fragment key={word}>
              <motion.span
                className={index === activeWord ? "active" : ""}
                animate={{
                  opacity: index === activeWord ? 1 : 0.3,
                  scale: index === activeWord ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
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
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
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
