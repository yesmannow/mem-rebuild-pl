import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './VennDiagram.css';

const VennDiagram: React.FC = () => {
  const [hoveredCircle, setHoveredCircle] = useState<'strategy' | 'systems' | 'overlap' | null>(
    null
  );

  return (
    <section className="venn-diagram-section">
      <motion.div
        className="venn-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>The Unique Overlap</h2>
        <p>
          Where most marketers choose one lane, I operate in both—and the magic happens at the
          intersection
        </p>
      </motion.div>

      <div className="venn-container">
        <svg className="venn-svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid meet">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left Circle - Strategy */}
          <motion.circle
            cx="220"
            cy="200"
            r="130"
            fill="rgba(136, 171, 242, 0.2)"
            stroke="#88ABF2"
            strokeWidth="3"
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onMouseEnter={() => setHoveredCircle('strategy')}
            onMouseLeave={() => setHoveredCircle(null)}
            style={{
              opacity: hoveredCircle === 'systems' ? 0.3 : hoveredCircle === 'strategy' ? 1 : 0.7,
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Right Circle - Systems */}
          <motion.circle
            cx="380"
            cy="200"
            r="130"
            fill="rgba(184, 208, 217, 0.2)"
            stroke="#B8D0D9"
            strokeWidth="3"
            filter="url(#glow)"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            onMouseEnter={() => setHoveredCircle('systems')}
            onMouseLeave={() => setHoveredCircle(null)}
            style={{
              opacity: hoveredCircle === 'strategy' ? 0.3 : hoveredCircle === 'systems' ? 1 : 0.7,
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Overlap Highlight */}
          <motion.ellipse
            cx="300"
            cy="200"
            rx="70"
            ry="130"
            fill="rgba(136, 171, 242, 0.4)"
            stroke="none"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            onMouseEnter={() => setHoveredCircle('overlap')}
            onMouseLeave={() => setHoveredCircle(null)}
            style={{
              opacity: hoveredCircle === 'overlap' ? 0.8 : 0.4,
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Text Labels */}
          <text x="150" y="130" fill="#88ABF2" fontSize="20" fontWeight="700" textAnchor="middle">
            Strategy
          </text>

          <text x="450" y="130" fill="#B8D0D9" fontSize="20" fontWeight="700" textAnchor="middle">
            Systems
          </text>

          <text x="300" y="195" fill="#fafbfc" fontSize="18" fontWeight="800" textAnchor="middle">
            Your Unique
          </text>
          <text x="300" y="215" fill="#fafbfc" fontSize="18" fontWeight="800" textAnchor="middle">
            Value Zone
          </text>
        </svg>

        {/* Info Cards */}
        <div className="venn-info-cards">
          <motion.div
            className={`venn-card left ${hoveredCircle === 'strategy' ? 'active' : ''}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            onMouseEnter={() => setHoveredCircle('strategy')}
            onMouseLeave={() => setHoveredCircle(null)}
          >
            <div className="card-icon">🎯</div>
            <h3>Marketing Strategy</h3>
            <ul>
              <li>Brand Development</li>
              <li>Campaign Planning</li>
              <li>Audience Targeting</li>
              <li>Content Strategy</li>
              <li>ROI Analysis</li>
            </ul>
          </motion.div>

          <motion.div
            className={`venn-card center ${hoveredCircle === 'overlap' ? 'active' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            onMouseEnter={() => setHoveredCircle('overlap')}
            onMouseLeave={() => setHoveredCircle(null)}
          >
            <div className="card-icon-large">✨</div>
            <h3>The Intersection</h3>
            <p className="highlight-text">
              Strategy-driven technical implementation. Systems that execute marketing vision
              without translation loss.
            </p>
            <div className="intersection-tags">
              <span>Strategic Automation</span>
              <span>Data-Driven Systems</span>
              <span>Integrated Marketing Tech</span>
            </div>
          </motion.div>

          <motion.div
            className={`venn-card right ${hoveredCircle === 'systems' ? 'active' : ''}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            onMouseEnter={() => setHoveredCircle('systems')}
            onMouseLeave={() => setHoveredCircle(null)}
          >
            <div className="card-icon">⚙️</div>
            <h3>Technical Systems</h3>
            <ul>
              <li>CRM Architecture</li>
              <li>Marketing Automation</li>
              <li>API Integrations</li>
              <li>Custom Development</li>
              <li>Data Infrastructure</li>
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="venn-callout"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >
        <h4>Why This Matters</h4>
        <p>
          Most teams have strategists who can't build and developers who don't understand marketing.
          The handoff between them is where ideas die, timelines explode, and ROI suffers.
          <strong>
            {' '}
            I eliminate that handoff entirely—conceiving and executing as a unified process.
          </strong>
        </p>
      </motion.div>
    </section>
  );
};

export default VennDiagram;
