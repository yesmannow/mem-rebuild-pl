import React from 'react';
import { motion } from 'framer-motion';
import { motion as motionTokens } from '../../styles/motion-tokens.js';
import { castMotionProps } from '../../utils/motion-helpers';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <motion.section
      className="about-section"
      style={{
        padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        alignItems: 'center',
      }}
      {...castMotionProps(motionTokens.slideInLeft)}
    >
      <div
        className="portrait"
        style={{
          width: '100%',
          height: '300px',
          background: 'url(./portrait.jpg) no-repeat center center',
          backgroundSize: 'cover',
          borderRadius: '8px',
        }}
      />
      <div style={{ fontSize: '1rem', lineHeight: 1.6 }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>About Me</h2>
        <p>I build digital experiences that blend design, code, and motion.</p>
        <Link to="/about" className="btn-primary">
          Learn More
        </Link>
      </div>
    </motion.section>
  );
};

export default About;
