import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Ruler, Hammer, Rocket, CheckCircle2 } from 'lucide-react';

interface ProcessStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
}

const steps: ProcessStep[] = [
  {
    id: 'discovery',
    number: 1,
    title: 'Discovery & Audit',
    description: 'Deep dive into business goals and technical audit',
    icon: <Search size={24} />,
    details: [
      'Stakeholder interviews',
      'MarTech stack analysis',
      'Data flow mapping',
      'Competitive research',
    ],
    color: 'brand-teal',
  },
  {
    id: 'strategy',
    number: 2,
    title: 'Strategy',
    description: 'Designing the blueprint and architecture',
    icon: <Ruler size={24} />,
    details: [
      'Systems architecture design',
      'Data flow optimization',
      'KPI definition',
      'Roadmap creation',
    ],
    color: 'brand-orange',
  },
  {
    id: 'build',
    number: 3,
    title: 'Build',
    description: 'Hands-on execution and implementation',
    icon: <Hammer size={24} />,
    details: [
      'Web development',
      'CRM configuration',
      'Automation workflows',
      'Analytics setup',
    ],
    color: 'brand-teal',
  },
  {
    id: 'optimize',
    number: 4,
    title: 'Optimization',
    description: 'Continuous refinement and improvement',
    icon: <Rocket size={24} />,
    details: [
      'A/B testing',
      'Funnel analysis',
      'Performance tuning',
      'Iterative improvements',
    ],
    color: 'brand-orange',
  },
];

const InteractiveProcessFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const handleStepClick = (stepId: string) => {
    setActiveStep(activeStep === stepId ? null : stepId);
    if (!completedSteps.has(stepId)) {
      setCompletedSteps((prev) => new Set([...prev, stepId]));
    }
  };

  return (
    <div className="interactive-process-flow">
      <h3 className="text-2xl font-bold text-brand-text mb-8 text-center">
        From Insight to Impact
      </h3>
      <div className="relative">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-brand-teal via-brand-orange to-brand-teal transform -translate-y-1/2 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          {steps.map((step, index) => {
            const isActive = activeStep === step.id;
            const isCompleted = completedSteps.has(step.id);

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <motion.button
                  onClick={() => handleStepClick(step.id)}
                  className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                    isActive
                      ? 'border-brand-teal bg-brand-teal/10 scale-105'
                      : isCompleted
                      ? 'border-brand-teal/50 bg-brand-teal/5'
                      : 'border-brand-teal/20 bg-brand-surface/30'
                  }`}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Step Number Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                          isCompleted
                            ? 'bg-brand-teal text-brand-dark'
                            : 'bg-brand-dark text-brand-teal border-2 border-brand-teal'
                        }`}
                        animate={isActive ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        {isCompleted ? <CheckCircle2 size={24} /> : step.number}
                      </motion.div>
                      <div className={step.color === 'brand-teal' ? 'text-brand-teal' : 'text-brand-orange'}>
                        {step.icon}
                      </div>
                    </div>

                  <h4 className="font-bold text-brand-text mb-2">{step.title}</h4>
                  <p className="text-sm text-brand-muted mb-4">{step.description}</p>

                  {/* Expandable Details */}
                  {isActive && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 mt-4"
                    >
                      {step.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="text-xs text-brand-muted flex items-center gap-2"
                        >
                          <span className="text-brand-teal">▸</span>
                          {detail}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-surface/50 border border-brand-teal/20 rounded-lg">
          <span className="text-sm text-brand-muted">Progress:</span>
          <span className="text-sm font-bold text-brand-teal">
            {completedSteps.size} / {steps.length} Steps Explored
          </span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveProcessFlow;

