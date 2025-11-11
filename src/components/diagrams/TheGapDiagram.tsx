import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './TheGapDiagram.css';

const TheGapDiagram: React.FC = () => {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | 'bridge' | null>(null);

  return (
    <section className="gap-diagram-section">
      <motion.div
        className="gap-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Bridging The Gap</h2>
        <p>
          Where creative vision meets technical execution—and why most teams struggle at this
          intersection
        </p>
      </motion.div>

      <div className="gap-diagram">
        {/* Left Side: Creative Vision */}
        <motion.div
          className={`gap-side left ${hoveredSide === 'left' ? 'active' : ''}`}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className="side-icon">🎨</div>
          <h3>Creative Vision</h3>
          <ul className="side-list">
            <li>Brand Strategy</li>
            <li>Campaign Ideas</li>
            <li>User Experience</li>
            <li>Visual Design</li>
            <li>Content Strategy</li>
          </ul>
          <div className="side-label">The "What" & "Why"</div>
        </motion.div>

        {/* The Bridge: You */}
        <motion.div
          className={`gap-bridge ${hoveredSide === 'bridge' ? 'active' : ''}`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          onMouseEnter={() => setHoveredSide('bridge')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <motion.div
            className="bridge-icon"
            animate={{
              scale: hoveredSide === 'bridge' ? 1.1 : 1,
              rotate: hoveredSide === 'bridge' ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="bridge-avatar">JD</div>
          </motion.div>

          <div className="bridge-label">
            <h4>You</h4>
            <p>The Translator</p>
          </div>

          <motion.div
            className="bridge-details"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: hoveredSide === 'bridge' ? 1 : 0,
              height: hoveredSide === 'bridge' ? 'auto' : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="bridge-skills">
              <span>Strategy + Systems</span>
              <span>Design + Development</span>
              <span>Brand + Backend</span>
            </div>
          </motion.div>

          {/* Connection Lines */}
          <svg className="connection-lines" viewBox="0 0 300 200" preserveAspectRatio="none">
            <motion.path
              d="M 0 100 Q 75 50 150 100"
              stroke="#88ABF2"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <motion.path
              d="M 150 100 Q 225 150 300 100"
              stroke="#88ABF2"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </svg>
        </motion.div>

        {/* Right Side: Technical Reality */}
        <motion.div
          className={`gap-side right ${hoveredSide === 'right' ? 'active' : ''}`}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div className="side-icon">⚙️</div>
          <h3>Technical Reality</h3>
          <ul className="side-list">
            <li>CRM Architecture</li>
            <li>Automation Logic</li>
            <li>API Integrations</li>
            <li>Database Design</li>
            <li>Performance Optimization</li>
          </ul>
          <div className="side-label">The "How" & "Build"</div>
        </motion.div>
      </div>

      {/* The Problem Statement */}
      <motion.div
        className="gap-problem"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1 }}
      >
        <div className="problem-icon">⚠️</div>
        <div className="problem-content">
          <h4>The Common Breakdown</h4>
          <p>
            Most teams have brilliant strategists and talented developers—but they speak different
            languages. Ideas get lost in translation. Timelines explode. Features ship incomplete.
            <strong> I fluently speak both languages and build the bridge between them.</strong>
          </p>
        </div>
      </motion.div>

      {/* Value Proposition */}
      <motion.div
        className="gap-value"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >
        <div className="value-grid">
          <div className="value-item">
            <div className="value-icon">🎯</div>
            <h5>No Lost Translation</h5>
            <p>Strategy directly becomes implementation</p>
          </div>
          <div className="value-item">
            <div className="value-icon">⚡</div>
            <h5>Faster Execution</h5>
            <p>No handoff delays or miscommunication</p>
          </div>
          <div className="value-item">
            <div className="value-icon">🔄</div>
            <h5>Integrated Solutions</h5>
            <p>Systems designed with strategy in mind</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TheGapDiagram;
