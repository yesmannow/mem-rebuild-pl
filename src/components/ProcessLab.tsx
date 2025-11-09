import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const processSteps = [
  {
    title: "Type Selection",
    description: "Choosing the right typeface and size for the project",
    details: "Each letterpress project begins with careful consideration of the message and the medium. We select typefaces that not only look beautiful but also print well under pressure.",
    image: "/images/process/sutherland-process-type.svg"
  },
  {
    title: "Composition",
    description: "Arranging type and elements on the press bed",
    details: "This is where the magic happens. Each piece of type is placed individually, creating a tactile layout that will be impressed into paper. Precision is key - a single misaligned letter can ruin the entire print run.",
    image: "/images/process/sutherland-process-compose.svg"
  },
  {
    title: "Inking",
    description: "Applying ink to the type and plates",
    details: "The ink must be applied evenly and consistently. Too much ink creates blobs, too little results in faint impressions. We use traditional oil-based inks that provide rich, deep color.",
    image: "/images/process/sutherland-process-ink.svg"
  },
  {
    title: "Pressing",
    description: "Running the press to create impressions",
    details: "The moment of truth. The paper is fed through the press, and under tremendous pressure, the type impresses itself into the paper. Each sheet is a unique piece of art.",
    image: "/images/process/sutherland-process-press.svg"
  },
  {
    title: "Finishing",
    description: "Trimming, folding, and final touches",
    details: "After printing, pieces are trimmed to size, folded if needed, and given any final embellishments. This step ensures the final product is as perfect as the printing process.",
    image: "/images/process/sutherland-process-finish.svg"
  }
];

const ProcessLab: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Process Lab: Letterpress Craft</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Steps Navigation */}
        <div className="space-y-4">
          {processSteps.map((step, index) => (
            <motion.button
              key={step.title}
              onClick={() => setCurrentStep(index)}
              className={`w-full text-left p-4 rounded-lg transition-colors ${
                index === currentStep
                  ? 'bg-amber-100 border-2 border-amber-600'
                  : 'bg-white border-2 border-gray-200 hover:border-amber-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${
                  index === currentStep ? 'bg-amber-600 text-white' : 'bg-gray-300 text-gray-700'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Step Details */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">{processSteps[currentStep].title}</h3>

              <img
                src={processSteps[currentStep].image}
                alt={processSteps[currentStep].title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <p className="text-gray-700 mb-4">{processSteps[currentStep].description}</p>
              <p className="text-gray-600">{processSteps[currentStep].details}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProcessLab;