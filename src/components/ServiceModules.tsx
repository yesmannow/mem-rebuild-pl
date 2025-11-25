import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { services, ServiceModule } from '../data/services';
import { Package, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import CopyToClipboard from './ui/CopyToClipboard';
import MagneticCard from './ui/MagneticCard';

interface ServiceModulesProps {
  className?: string;
}

const ServiceModules: React.FC<ServiceModulesProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className={cn('py-20 px-4 sm:px-6 lg:px-8 bg-brand-dark/50', className)}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
            Deployable Modules
          </h2>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            Pre-built systems ready to integrate. Each module is production-tested and documented.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const itemRef = useRef<HTMLDivElement>(null);
            const itemInView = useInView(itemRef, { once: true, margin: '-50px' });

            return (
              <MagneticCard key={service.id} intensity={0.1}>
                <motion.div
                  ref={itemRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={itemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-6 hover:border-brand-teal/40 transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 via-brand-teal/0 to-brand-orange/0 group-hover:via-brand-teal/10 group-hover:to-brand-orange/10 transition-all duration-500 rounded-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <div className="relative z-10">
                {/* NPM Package Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-teal/20 to-brand-orange/20 p-2 flex items-center justify-center">
                      <img
                        src={service.iconSrc}
                        alt={service.name}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-text font-mono">
                        {service.name}
                      </h3>
                      {service.version && (
                        <span className="text-xs text-brand-muted font-mono">
                          v{service.version}
                        </span>
                      )}
                    </div>
                  </div>
                  <Package className="w-5 h-5 text-brand-teal" />
                </div>

                <p className="text-brand-muted text-sm mb-4">
                  {service.description}
                </p>

                {/* Features list */}
                {service.features && service.features.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-brand-teal uppercase tracking-wide mb-2">
                      Features
                    </h4>
                    <ul className="space-y-1.5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-brand-muted">
                          <Check className="w-4 h-4 text-brand-teal mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Install command with copy */}
                <div className="mt-4 pt-4 border-t border-brand-muted/20">
                  <CopyToClipboard text={`npm install @bearcave/${service.id}`} />
                </div>
                  </div>
                </motion.div>
              </MagneticCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceModules;

