/**
 * Generate Interactive Components Based on Design Analysis
 * Creates new components inspired by reference sites
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Kinetic Headline Component - Inspired by Aliah Johnson
 * Word-by-word animated reveal
 */
const KINETIC_HEADLINE = `import React from 'react';
import { motion } from 'framer-motion';

interface KineticHeadlineProps {
  text: string;
  className?: string;
  delay?: number;
}

export const KineticHeadline: React.FC<KineticHeadlineProps> = ({
  text,
  className = '',
  delay = 0,
}) => {
  const words = text.split(' ');

  return (
    <h2 className={\`text-4xl md:text-6xl font-display font-bold text-[var(--parchment-050)] \${className}\`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + index * 0.1,
            ease: [0.65, 0, 0.35, 1],
          }}
        >
          {word}
        </motion.span>
      ))}
    </h2>
  );
};
`;

/**
 * Split Grid Section - Inspired by Harvey Oliver
 */
const SPLIT_GRID_SECTION = `import React from 'react';
import { motion } from 'framer-motion';

interface SplitGridSectionProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  reverse?: boolean;
}

export const SplitGridSection: React.FC<SplitGridSectionProps> = ({
  leftContent,
  rightContent,
  reverse = false,
}) => {
  return (
    <section className="py-24 bg-[var(--ink-900)]">
      <div className="container mx-auto px-6">
        <div className={\`grid lg:grid-cols-2 gap-12 items-center \${reverse ? 'lg:grid-flow-dense' : ''}\`}>
          <motion.div
            className={\`\${reverse ? 'lg:col-start-2' : ''}\`}
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            {leftContent}
          </motion.div>

          <motion.div
            className={\`\${reverse ? 'lg:col-start-1 lg:row-start-1' : ''}\`}
            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          >
            {rightContent}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
`;

/**
 * Interactive Data Overlay - Inspired by Janar Siniloo
 */
const INTERACTIVE_DATA_OVERLAY = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataPoint {
  label: string;
  value: string | number;
  description?: string;
}

interface InteractiveDataOverlayProps {
  data: DataPoint[];
  trigger: 'hover' | 'click';
}

export const InteractiveDataOverlay: React.FC<InteractiveDataOverlayProps> = ({
  data,
  trigger = 'hover',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => trigger === 'hover' && setIsVisible(true)}
      onMouseLeave={() => trigger === 'hover' && setIsVisible(false)}
      onClick={() => trigger === 'click' && setIsVisible(!isVisible)}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-full left-0 mt-4 p-6 bg-[var(--ink-700)] border border-[var(--ink-700)] rounded-lg backdrop-blur-md z-50 min-w-[300px]"
          >
            <div className="space-y-3">
              {data.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-[var(--ink-700)] last:border-0 pb-3 last:pb-0"
                >
                  <div className="font-mono text-xs text-[var(--telemetry-400)] uppercase tracking-wider mb-1">
                    {point.label}
                  </div>
                  <div className="text-2xl font-bold text-[var(--signal-500)] font-display">
                    {point.value}
                  </div>
                  {point.description && (
                    <div className="text-sm text-[var(--parchment-050)]/60 mt-1">
                      {point.description}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
`;

/**
 * Service Ladder Component - Four tall modules
 */
const SERVICE_LADDER = `import React from 'react';
import { motion } from 'framer-motion';

interface Service {
  number: string;
  title: string;
  description: string;
  icon?: string;
}

interface ServiceLadderProps {
  services: Service[];
}

export const ServiceLadder: React.FC<ServiceLadderProps> = ({ services }) => {
  return (
    <section className="py-24 bg-[var(--ink-900)]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-[var(--ink-700)] border border-[var(--ink-700)] rounded-lg p-8 min-h-[400px] flex flex-col cursor-pointer"
            >
              {/* Stacked card effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-[var(--signal-500)]/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10 translate-y-2" />
              <div className="absolute inset-0 rounded-lg bg-[var(--signal-500)]/5 opacity-0 group-hover:opacity-100 transition-opacity -z-20 translate-y-4" />

              <div className="font-mono text-6xl font-bold text-[var(--signal-500)]/20 mb-4">
                {service.number}
              </div>

              {service.icon && (
                <div className="text-4xl mb-4">{service.icon}</div>
              )}

              <h3 className="text-2xl font-display font-bold text-[var(--parchment-050)] mb-4">
                {service.title}
              </h3>

              <p className="text-[var(--parchment-050)]/70 font-body leading-relaxed flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;

const COMPONENTS = {
  'KineticHeadline.tsx': KINETIC_HEADLINE,
  'SplitGridSection.tsx': SPLIT_GRID_SECTION,
  'InteractiveDataOverlay.tsx': INTERACTIVE_DATA_OVERLAY,
  'ServiceLadder.tsx': SERVICE_LADDER,
};

/**
 * Generate components
 */
function generateComponents() {
  const componentsDir = path.join(__dirname, '../src/components/interactive');

  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  console.log('🎨 Generating interactive components...\n');

  Object.entries(COMPONENTS).forEach(([filename, content]) => {
    const filePath = path.join(componentsDir, filename);

    if (fs.existsSync(filePath)) {
      console.log(`⏭️  ${filename} already exists, skipping...`);
      return;
    }

    fs.writeFileSync(filePath, content);
    console.log(`✅ Created ${filename}`);
  });

  console.log('\n✨ Component generation complete!');
  console.log(`📁 Components saved to: ${componentsDir}`);
}

// Check if running directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` ||
                     process.argv[1] && process.argv[1].endsWith('generate-interactive-components.js');

if (isMainModule) {
  generateComponents();
}

export { generateComponents };

