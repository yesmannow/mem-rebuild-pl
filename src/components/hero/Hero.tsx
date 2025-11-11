import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, Easing } from 'framer-motion';
import { motion as motionTokens, stagger } from '../../styles/motion-tokens.js';
import { castMotionProps, castMotionTarget } from '../../utils/motion-helpers';
import './Hero.css';

const Hero: React.FC = () => {
  const [activeWord, setActiveWord] = useState(0);
  const words = ['Strategy', 'Automation', 'Systems', 'Storytelling'];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWord(prev => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <motion.div className="hero-content" {...castMotionProps(stagger.cinematicStagger)}>
        <motion.h1 className="hero-title gradient-text" {...castMotionProps(motionTokens.cinematicEntry)}>
          Where Complexity Becomes <span className="gradient-text">Clarity</span>.
        </motion.h1>

        <motion.p className="hero-subtitle" {...castMotionProps(motionTokens.slideUp)}>
          I craft systems where design and technology move as one. Turning curiosity into
          conversion. Chaos into clarity.
        </motion.p>

        <motion.div className="cta-group" {...castMotionProps(motionTokens.fadeIn)}>
          <motion.div whileHover={castMotionTarget(motionTokens.buttonHover)} whileTap={{ scale: 0.95 }}>
            <Link className="btn-primary" to="/case-studies">
              Explore My Work
            </Link>
          </motion.div>
          <motion.div whileHover={castMotionTarget(motionTokens.buttonHover)} whileTap={{ scale: 0.95 }}>
            <Link className="btn-secondary" to="/resume">
              View My Story
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="tagline-rotation" {...castMotionProps(motionTokens.fadeInSlow)}>
          {words.map((word, index) => (
            <React.Fragment key={word}>
              <motion.span
                className="tagline-word"
                animate={{
                  opacity: index === activeWord ? 1 : 0.3,
                  scale: index === activeWord ? 1.1 : 1,
                  color: index === activeWord ? '#EC4899' : '#A1A1AA',
                }}
                transition={{ duration: 0.5, ease: 'easeOut' as Easing }}
              >
                {word}
              </motion.span>
              {index < words.length - 1 && <span className="separator">•</span>}
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>

      <div className="hero-background">
        <motion.div className="gradient-orb orb-1" {...castMotionProps(motionTokens.glowPulse)} />
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
            ease: 'easeInOut' as Easing,
            delay: 2,
          }}
        />
      </div>
    </section>
  );
};

export default Hero;
