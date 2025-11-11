import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Sparkles,
  Palette,
  Type,
  Image,
  Download,
  Share2,
  Check,
} from 'lucide-react';
import AnimatedSection from '../components/animations/AnimatedSection';
import TextReveal from '../components/animations/TextReveal';
import { fadeInUp } from '../utils/animations';
import './BrandBuilder.css';

interface BrandTokens {
  name: string;
  colors: { [key: string]: string };
  fonts: {
    heading: string;
    body: string;
  };
  mark: string | null;
}

const BrandBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tokens, setTokens] = useState<BrandTokens>({
    name: 'My Brand',
    colors: {},
    fonts: {
      heading: 'Inter',
      body: 'Roboto',
    },
    mark: null,
  });
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const steps = [
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
    setCompletedSteps(new Set([...completedSteps, index]));
    if (index === currentStep) {
      handleNext();
    }
  };

  return (
    <main className="brand-builder-page">
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
          <TextReveal text="Brand Builder" className="page-title" />
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
  );
};

// Step Components
const MoodboardStep: React.FC<{
  tokens: BrandTokens;
  setTokens: React.Dispatch<React.SetStateAction<BrandTokens>>;
}> = ({ tokens, setTokens }) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  return (
    <div className="step-panel">
      <h2>Create Your Moodboard</h2>
      <p>Upload images that inspire your brand direction</p>
      <div className="moodboard-grid">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="moodboard-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img src={src} alt={`Moodboard ${index + 1}`} />
          </motion.div>
        ))}
        <label className="upload-area">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="upload-content">
            <Image size={32} />
            <span>Upload Images</span>
          </div>
        </label>
      </div>
    </div>
  );
};

const PaletteStep: React.FC<{
  tokens: BrandTokens;
  setTokens: React.Dispatch<React.SetStateAction<BrandTokens>>;
}> = ({ tokens, setTokens }) => {
  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

  return (
    <div className="step-panel">
      <h2>Refine Your Palette</h2>
      <p>Select and adjust your brand colors</p>
      <div className="palette-grid">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="color-swatch"
            style={{ backgroundColor: color }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setTokens({
                ...tokens,
                colors: { ...tokens.colors, [index]: color },
              });
            }}
          >
            <span className="color-code">{color}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TypographyStep: React.FC<{
  tokens: BrandTokens;
  setTokens: React.Dispatch<React.SetStateAction<BrandTokens>>;
}> = ({ tokens, setTokens }) => {
  const fonts = ['Inter', 'Roboto', 'Poppins', 'Montserrat', 'Open Sans'];

  return (
    <div className="step-panel">
      <h2>Choose Typography</h2>
      <p>Select fonts that represent your brand</p>
      <div className="font-grid">
        {fonts.map(font => (
          <motion.div
            key={font}
            className={`font-card ${tokens.fonts.heading === font ? 'selected' : ''}`}
            onClick={() => {
              setTokens({
                ...tokens,
                fonts: { ...tokens.fonts, heading: font },
              });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h3 style={{ fontFamily: font }}>{font}</h3>
            <p>The quick brown fox jumps over the lazy dog</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MarkStep: React.FC<{
  tokens: BrandTokens;
  setTokens: React.Dispatch<React.SetStateAction<BrandTokens>>;
}> = ({ tokens, setTokens }) => {
  return (
    <div className="step-panel">
      <h2>Design Your Mark</h2>
      <p>Create or upload your logo mark</p>
      <div className="mark-editor">
        <div className="mark-preview">
          <Sparkles size={64} />
        </div>
        <p className="text-center text-gray-400">
          Logo mark editor coming soon. Upload functionality will be available here.
        </p>
      </div>
    </div>
  );
};

const ApplicationsStep: React.FC<{ tokens: BrandTokens }> = ({ tokens }) => {
  const applications = [
    { name: 'Business Card', preview: '💼' },
    { name: 'Letterhead', preview: '📄' },
    { name: 'Website', preview: '🌐' },
    { name: 'Social Media', preview: '📱' },
  ];

  return (
    <div className="step-panel">
      <h2>Preview Applications</h2>
      <p>See your brand in action</p>
      <div className="applications-grid">
        {applications.map((app, index) => (
          <motion.div
            key={index}
            className="application-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="app-preview">{app.preview}</div>
            <h3>{app.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ExportStep: React.FC<{ tokens: BrandTokens }> = ({ tokens }) => {
  return (
    <div className="step-panel">
      <h2>Export Your Brand</h2>
      <p>Download your brand assets and design tokens</p>
      <div className="export-options">
        <motion.button
          className="export-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={20} />
          Download Assets
        </motion.button>
        <motion.button
          className="export-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 size={20} />
          Share Link
        </motion.button>
      </div>
    </div>
  );
};

export default BrandBuilder;
