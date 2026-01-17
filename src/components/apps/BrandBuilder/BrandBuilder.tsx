import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Sparkles,
  Palette,
  Type,
  Image,
  Download,
  Check,
} from 'lucide-react';
import AnimatedSection from '../../../components/animations/AnimatedSection';
import TextReveal from '../../../components/animations/TextReveal';
import { OceanGradientAnimation } from '../../../components/ui/OceanGradientAnimation';
import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { BrandTokens, BrandBuilderStep } from './types';
import MoodboardStep from './MoodboardStep';
import PaletteStep from './PaletteStep';
import TypographyStep from './TypographyStep';
import MarkStep from './MarkStep';
import ApplicationsStep from './ApplicationsStep';
import ExportStep from './ExportStep';
import './BrandBuilder.css';

const BrandBuilder: React.FC = () => {
  // Use localStorage for persistence
  const [tokens, setTokens] = useLocalStorage<BrandTokens>('brandBuilder-tokens', {
    name: 'My Brand',
    colors: {},
    fonts: {
      heading: 'Inter',
      body: 'Roboto',
    },
    mark: null,
    images: [],
  });

  const [currentStep, setCurrentStep] = useLocalStorage<number>('brandBuilder-currentStep', 0);
  const [completedSteps, setCompletedSteps] = useLocalStorage<Set<number>>('brandBuilder-completedSteps', new Set());

  const steps: (BrandBuilderStep & { component: React.ReactNode })[] = [
    {
      id: 'moodboard',
      title: 'Moodboard',
      description: 'Upload inspiration images to extract color palettes',
      icon: Image,
      component: <MoodboardStep tokens={tokens} setTokens={setTokens} />,
    },
    {
      id: 'palette',
      title: 'Palette',
      description: 'Refine your color palette and generate scales',
      icon: Palette,
      component: <PaletteStep tokens={tokens} setTokens={setTokens} />,
    },
    {
      id: 'typography',
      title: 'Typography',
      description: 'Choose fonts that match your brand personality',
      icon: Type,
      component: <TypographyStep tokens={tokens} setTokens={setTokens} />,
    },
    {
      id: 'mark',
      title: 'Mark',
      description: 'Design your logo mark or wordmark',
      icon: Sparkles,
      component: <MarkStep tokens={tokens} setTokens={setTokens} />,
    },
    {
      id: 'applications',
      title: 'Applications',
      description: 'Preview your brand across different contexts',
      icon: Image,
      component: <ApplicationsStep tokens={tokens} />,
    },
    {
      id: 'export',
      title: 'Export',
      description: 'Download your brand assets and tokens',
      icon: Download,
      component: <ExportStep tokens={tokens} />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (completedSteps.has(index) || index === currentStep) {
      setCurrentStep(index);
    }
  };

  const markStepComplete = (index: number) => {
    const newCompleted = new Set([...completedSteps, index]);
    setCompletedSteps(newCompleted);
    if (index === currentStep) {
      handleNext();
    }
  };

  return (
    <OceanGradientAnimation
      containerClassName="brand-builder-page-wrapper"
      className="brand-builder-page-content"
      interactive={true}
      size="60%"
      blendingValue="soft-light"
    >
      <main className="brand-builder-page relative z-10">
        {/* Hero Section */}
        <motion.section
          className="builder-hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-content">
            <motion.div
              className="hero-icon"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <Sparkles size={48} />
            </motion.div>
            <TextReveal text="BrandOS" className="page-title" />
            <motion.p
              className="page-subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Create a complete brand identity system in minutes
            </motion.p>
          </div>
        </motion.section>

        {/* Progress Steps */}
        <AnimatedSection delay={0.2}>
          <div className="progress-steps">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = completedSteps.has(index);
              const isAccessible = index <= currentStep || completedSteps.has(index);

              return (
                <motion.div
                  key={step.id}
                  className={`step-indicator ${isActive ? 'active' : ''} ${
                    isCompleted ? 'completed' : ''
                  } ${isAccessible ? 'accessible' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleStepClick(index)}
                >
                  <div className="step-icon-wrapper">
                    {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                  </div>
                  <div className="step-info">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                  {index < steps.length - 1 && <ChevronRight className="step-connector" size={20} />}
                </motion.div>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Step Content */}
        <AnimatedSection delay={0.3}>
          <div className="step-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[currentStep].component}
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Navigation Controls */}
        <AnimatedSection delay={0.4}>
          <div className="builder-controls">
            <motion.button
              className="btn-secondary"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              whileHover={{ scale: currentStep === 0 ? 1 : 1.05 }}
              whileTap={{ scale: currentStep === 0 ? 1 : 0.95 }}
            >
              Previous
            </motion.button>

            <div className="step-progress">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {completedSteps.has(currentStep) ? (
              <motion.button
                className="btn-primary"
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                whileHover={{ scale: currentStep === steps.length - 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentStep === steps.length - 1 ? 1 : 0.95 }}
              >
                {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              </motion.button>
            ) : (
              <motion.button
                className="btn-primary"
                onClick={() => markStepComplete(currentStep)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mark Complete
              </motion.button>
            )}
          </div>
        </AnimatedSection>
      </main>
    </OceanGradientAnimation>
  );
};

export default BrandBuilder;
