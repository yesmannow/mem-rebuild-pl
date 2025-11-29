import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { processes } from '../data/process';
import { cn } from '../lib/utils';

interface ProcessFlowProps {
  className?: string;
}

const ProcessFlow: React.FC<ProcessFlowProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Create refs and inView states for each process item at the top level
  const itemRef0 = useRef<HTMLDivElement>(null);
  const itemRef1 = useRef<HTMLDivElement>(null);
  const itemRef2 = useRef<HTMLDivElement>(null);
  const itemRef3 = useRef<HTMLDivElement>(null);

  const itemInView0 = useInView(itemRef0, { once: true, margin: '-50px' });
  const itemInView1 = useInView(itemRef1, { once: true, margin: '-50px' });
  const itemInView2 = useInView(itemRef2, { once: true, margin: '-50px' });
  const itemInView3 = useInView(itemRef3, { once: true, margin: '-50px' });

  const itemRefs = [itemRef0, itemRef1, itemRef2, itemRef3];
  const itemInViews = [itemInView0, itemInView1, itemInView2, itemInView3];

  return (
    <section ref={containerRef} className={cn('py-20 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
            The Process
          </h2>
          <p className="text-lg text-brand-muted max-w-2xl mx-auto">
            Four steps from audit to scale. Each phase builds on the last, creating systems that compound value.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connecting lines (desktop only) */}
          {isInView && (
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 pointer-events-none">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-teal via-brand-orange to-brand-teal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                style={{ originX: 0 }}
              />
            </div>
          )}

          {processes.map((process, index) => {
            return (
              <motion.div
                key={process.id}
                ref={itemRefs[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={itemInViews[index] ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-10"
              >
                {/* Connection dot on line */}
                {isInView && (
                  <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-teal z-20">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-brand-teal"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 1] }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    />
                  </div>
                )}

                <div className="bg-brand-surface/50 border border-brand-muted/20 rounded-xl p-6 hover:border-brand-teal/40 transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/0 via-brand-teal/0 to-brand-orange/0 group-hover:via-brand-teal/10 group-hover:to-brand-orange/10 transition-all duration-500 rounded-xl" />
                  {/* Icon with pulsing animation */}
                  <div className="mb-4 relative">
                    <motion.div
                      className="w-16 h-16 mx-auto"
                      animate={
                        itemInViews[index]
                          ? {
                              scale: [1, 1.1, 1],
                              opacity: [0.8, 1, 0.8],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        delay: index * 0.3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <img
                        src={process.iconSrc}
                        alt={process.title}
                        className="w-full h-full"
                      />
                    </motion.div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-brand-text mb-2 text-center">
                      {process.title}
                    </h3>
                    <p className="text-brand-muted text-sm flex-1 text-center">
                      {process.description}
                    </p>

                    {/* Step number */}
                    <div className="mt-4 text-center">
                      <span className="text-xs font-mono text-brand-teal">
                        Step {index + 1} of {processes.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Links to key pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-teal/40 text-brand-text hover:border-brand-teal hover:bg-brand-teal/10 transition-all"
          >
            <span>View Projects</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/case-studies"
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-teal/40 text-brand-text hover:border-brand-teal hover:bg-brand-teal/10 transition-all"
          >
            <span>See Case Studies</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-teal text-slate-900 hover:brightness-110 transition-all font-semibold"
          >
            <span>Get in Touch</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessFlow;

