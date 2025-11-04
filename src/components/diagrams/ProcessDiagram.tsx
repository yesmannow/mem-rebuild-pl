import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ProcessDiagram.css';

interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  details: string[];
  icon: JSX.Element;
  gradient: string;
}

const steps: ProcessStep[] = [
  {
    id: 'discover',
    number: 1,
    title: 'Discover',
    description: 'Deep dive into business goals, audience needs, and technical constraints.',
    details: [
      'Stakeholder interviews & workshops',
      'Market & competitive analysis',
      'Technical audit & gap identification',
      'Opportunity mapping'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
        <circle cx="11" cy="11" r="3"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'design',
    number: 2,
    title: 'Design',
    description: 'Architect the strategy, user flows, and technical infrastructure.',
    details: [
      'Strategy & roadmap creation',
      'User journey mapping',
      'System architecture design',
      'Wireframes & prototypes'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <path d="M9 3v18"/>
        <path d="M3 9h18"/>
        <path d="M3 15h18"/>
        <path d="M15 3v18"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 'build',
    number: 3,
    title: 'Build',
    description: 'Develop systems, automations, and integrations that work.',
    details: [
      'Full-stack development',
      'API & integration setup',
      'Automation workflows',
      'Quality assurance testing'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'optimize',
    number: 4,
    title: 'Optimize',
    description: 'Analyze, refine, and eliminate bottlenecks through data.',
    details: [
      'Performance monitoring',
      'A/B testing & analytics',
      'Workflow refinement',
      'Continuous improvement'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 'scale',
    number: 5,
    title: 'Scale',
    description: 'Expand reach, automate processes, and multiply impact.',
    details: [
      'Process automation',
      'Team training & documentation',
      'Infrastructure scaling',
      'Growth strategy execution'
    ],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20"/>
        <path d="m15 5 3-3-3-3" transform="translate(0 0)"/>
        <path d="M5 9l-3 3 3 3"/>
        <path d="M19 9l3 3-3 3"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 16v4"/>
        <path d="M12 2v4"/>
      </svg>
    ),
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
];

const ProcessDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section className="process-diagram-section">
      <div className="process-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          My Methodology
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          A proven 5-step process that bridges strategy and execution
        </motion.p>
      </div>

      <div className="process-flow">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div
              className={`process-step ${activeStep === step.id ? 'active' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              onMouseEnter={() => setActiveStep(step.id)}
              onMouseLeave={() => setActiveStep(null)}
              whileHover={{ y: -10 }}
            >
              <div className="step-number">{step.number}</div>
              
              <div className="step-icon-wrapper" style={{ background: step.gradient }}>
                <div className="step-icon">{step.icon}</div>
              </div>
              
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              
              <motion.div
                className="step-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: activeStep === step.id ? 1 : 0,
                  height: activeStep === step.id ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <ul>
                  {step.details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: activeStep === step.id ? 1 : 0,
                        x: activeStep === step.id ? 0 : -10
                      }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {index < steps.length - 1 && (
              <motion.div
                className="process-arrow"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.05 }}
              >
                <svg width="60" height="20" viewBox="0 0 60 20" fill="none">
                  <path
                    d="M0 10H55M55 10L48 3M55 10L48 17"
                    stroke="#88ABF2"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      <motion.div
        className="process-note"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <p>
          <strong>Continuous Cycle:</strong> This isn't linear—each phase informs the others, 
          creating an iterative loop of improvement and innovation.
        </p>
      </motion.div>
    </section>
  );
};

export default ProcessDiagram;
