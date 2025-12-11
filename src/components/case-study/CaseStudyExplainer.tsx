/**
 * CaseStudyExplainer Component
 * 
 * AI-powered case study explanation generator
 * Allows users to view case studies from different professional perspectives
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, User, Briefcase, Code, Users, Loader2 } from 'lucide-react';

interface CaseStudyExplainerProps {
  title: string;
  context?: string;
  problem: string;
  solution: string;
  results: string;
  className?: string;
}

type Persona = 'founder' | 'cmo' | 'developer' | 'general';

interface PersonaOption {
  value: Persona;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const personaOptions: PersonaOption[] = [
  {
    value: 'founder',
    label: 'Founder / CEO',
    icon: <Briefcase size={18} />,
    description: 'Business impact & strategic value',
  },
  {
    value: 'cmo',
    label: 'CMO',
    icon: <Users size={18} />,
    description: 'Marketing ops & performance',
  },
  {
    value: 'developer',
    label: 'Developer',
    icon: <Code size={18} />,
    description: 'Technical architecture',
  },
  {
    value: 'general',
    label: 'General',
    icon: <User size={18} />,
    description: 'Overview & key insights',
  },
];

export const CaseStudyExplainer: React.FC<CaseStudyExplainerProps> = ({
  title,
  context,
  problem,
  solution,
  results,
  className = '',
}) => {
  const [selectedPersona, setSelectedPersona] = useState<Persona>('general');
  const [explanation, setExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleExplain = async (persona: Persona) => {
    setSelectedPersona(persona);
    setIsLoading(true);
    setError('');
    setExplanation('');

    try {
      const response = await fetch('/api/explain-case-study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          context,
          problem,
          solution,
          results,
          persona,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate explanation');
      }

      const data = await response.json();
      setExplanation(data.explanation);
    } catch (err) {
      console.error('Error generating explanation:', err);
      setError('Failed to generate explanation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-brand-turquoise/10">
          <Sparkles size={20} className="text-brand-turquoise" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-brand-text">AI Explainer</h3>
          <p className="text-sm text-brand-muted">View this case study from different perspectives</p>
        </div>
      </div>

      {/* Persona Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {personaOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => handleExplain(option.value)}
            disabled={isLoading}
            className={`relative p-4 rounded-xl border transition-all ${
              selectedPersona === option.value
                ? 'border-brand-turquoise bg-brand-turquoise/10'
                : 'border-white/10 bg-slate-900/50 hover:border-white/20 hover:bg-slate-900/70'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={selectedPersona === option.value ? 'text-brand-turquoise' : 'text-brand-muted'}>
                {option.icon}
              </div>
              <span className="text-sm font-medium text-brand-text">{option.label}</span>
            </div>
            <p className="text-xs text-brand-muted text-left">{option.description}</p>
            {selectedPersona === option.value && (
              <motion.div
                layoutId="selected-persona"
                className="absolute inset-0 border-2 border-brand-turquoise rounded-xl pointer-events-none"
                initial={false}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Explanation Area */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center py-12"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 size={32} className="text-brand-turquoise animate-spin" />
              <p className="text-sm text-brand-muted">Generating {selectedPersona}-focused explanation...</p>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-xl bg-red-500/10 border border-red-500/20"
          >
            <p className="text-sm text-red-400">{error}</p>
          </motion.div>
        )}

        {explanation && !isLoading && (
          <motion.div
            key="explanation"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-xl bg-slate-900/50 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-brand-turquoise/10">
                {personaOptions.find(p => p.value === selectedPersona)?.icon}
              </div>
              <div>
                <h4 className="text-sm font-medium text-brand-text">
                  {personaOptions.find(p => p.value === selectedPersona)?.label} Perspective
                </h4>
              </div>
            </div>
            <div className="prose prose-invert prose-sm max-w-none">
              {explanation.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-brand-muted leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {!explanation && !isLoading && !error && (
          <motion.div
            key="prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-sm text-brand-muted">
              Select a perspective above to see an AI-generated explanation
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CaseStudyExplainer;
