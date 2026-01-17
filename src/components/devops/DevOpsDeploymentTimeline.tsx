import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, CheckCircle, Clock, Zap } from 'lucide-react';

interface DeploymentStep {
  step: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  duration?: string;
  details: string[];
}

interface DevOpsDeploymentTimelineProps {
  steps: DeploymentStep[];
  className?: string;
}

/**
 * DevOpsDeploymentTimeline
 * Visual timeline of deployment pipeline steps
 */
export const DevOpsDeploymentTimeline: React.FC<DevOpsDeploymentTimelineProps> = ({
  steps,
  className = '',
}) => {
  const getStatusIcon = (status: DeploymentStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-yellow-400 animate-spin" />;
      case 'pending':
        return <Clock className="w-6 h-6 text-brand-muted" />;
    }
  };

  const getStatusColor = (status: DeploymentStep['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-400 bg-green-400/20';
      case 'in-progress':
        return 'border-yellow-400 bg-yellow-400/20';
      case 'pending':
        return 'border-slate-600 bg-slate-800/50';
    }
  };

  return (
    <motion.div
      className={`devops-deployment-timeline ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-brand-text mb-2 flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-brand-turquoise" />
          Deployment Pipeline
        </h3>
        <p className="text-brand-muted text-sm">
          Step-by-step deployment process and timeline
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-turquoise via-brand-turquoise/50 to-transparent" />

        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative pl-20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Step indicator */}
              <div
                className={`absolute left-0 w-16 h-16 rounded-full flex items-center justify-center border-4 ${getStatusColor(step.status)}`}
              >
                {getStatusIcon(step.status)}
              </div>

              {/* Step content */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-brand-turquoise/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-brand-text mb-1">{step.title}</h4>
                    <p className="text-sm text-brand-muted">{step.description}</p>
                  </div>
                  {step.duration && (
                    <div className="flex items-center gap-1 text-xs text-brand-muted bg-slate-900/50 px-3 py-1.5 rounded-full">
                      <Zap className="w-3 h-3" />
                      {step.duration}
                    </div>
                  )}
                </div>

                {step.details.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-sm text-brand-text">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DevOpsDeploymentTimeline;
