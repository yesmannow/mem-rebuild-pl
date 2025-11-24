import React from 'react';
import { motion } from 'framer-motion';
import { Search, Layers, Wrench, TrendingUp, ArrowRight } from 'lucide-react';
import { OceanBackgroundBeams } from '../ui/OceanBackgroundBeams';
import { OceanGradientText } from '../ui/OceanGradientText';

interface ProcessStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  deliverables: string[];
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    icon: <Search className="w-8 h-8" />,
    title: 'Discovery',
    description: 'Understand your goals, audit existing systems, and identify growth opportunities.',
    deliverables: ['Systems audit', 'Gap analysis', 'Strategic roadmap'],
  },
  {
    number: '02',
    icon: <Layers className="w-8 h-8" />,
    title: 'Architecture',
    description: 'Design scalable infrastructure that connects your tools and automates workflows.',
    deliverables: ['System design', 'Integration plan', 'Data flow mapping'],
  },
  {
    number: '03',
    icon: <Wrench className="w-8 h-8" />,
    title: 'Build',
    description: 'Deploy automations, configure platforms, and implement tracking systems.',
    deliverables: ['Automation setup', 'CRM configuration', 'Analytics implementation'],
  },
  {
    number: '04',
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Optimize',
    description: 'Monitor performance, refine processes, and train your team for long-term success.',
    deliverables: ['Performance reports', 'Process documentation', 'Team training'],
  },
];

const ProcessMethodology: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#006d77] overflow-hidden">
      {/* Ocean Background Beams */}
      <OceanBackgroundBeams className="opacity-20" />

      {/* Background decorative elements */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(#006d77 1px, transparent 1px),
            linear-gradient(90deg, #006d77 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="absolute top-1/3 right-10 w-96 h-96 bg-[#e29578]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <OceanGradientText text="How We Work Together" className="text-[#edf6f9]" />
          </h2>
          <p className="text-lg text-[#edf6f9]/60 max-w-2xl mx-auto font-body">
            A proven process that transforms complexity into clarity
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative mb-16 last:mb-0"
            >
              {/* Connecting line (not on last item) */}
              {index < processSteps.length - 1 && (
                <div className="absolute left-1/2 top-full h-16 w-px bg-gradient-to-b from-[#006d77] to-transparent hidden md:block" />
              )}

              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left side - alternates between content and visual */}
                <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative bg-[#5a7a7d]/50 border border-[#5a7a7d] rounded-xl p-8 hover:border-[#006d77]/30 transition-all duration-300 group">
                    {/* Step number badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#006d77] rounded-full flex items-center justify-center font-mono font-bold text-[#edf6f9] shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300"
                      style={{
                        backgroundColor: '#006d7715',
                        color: '#006d77',
                      }}
                    >
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-bold text-[#edf6f9] mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#edf6f9]/70 font-body leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-2">
                      <div className="text-sm font-mono text-[#006d77] uppercase tracking-wider mb-3">
                        Deliverables
                      </div>
                      <ul className="space-y-2">
                        {step.deliverables.map((deliverable, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm text-[#edf6f9]/60"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#006d77]" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover glow */}
                    <div className="absolute inset-0 rounded-xl bg-[#006d77]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </div>
                </div>

                {/* Right side - visual element */}
                <div className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} hidden md:flex justify-center`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative w-48 h-48 flex items-center justify-center"
                  >
                    {/* Decorative rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#006d77]/20" />
                    <div className="absolute inset-4 rounded-full border-2 border-[#006d77]/10" />

                    {/* Center icon */}
                    <div
                      className="relative z-10 w-24 h-24 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: '#006d7720',
                        color: '#006d77',
                      }}
                    >
                      {step.icon}
                    </div>

                    {/* Animated pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#006d77]"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0, 0.1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-[#edf6f9]/60 font-body mb-6">
            Ready to transform your marketing systems?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#006d77] text-[#edf6f9] font-semibold rounded-lg transition-all hover:scale-105 hover:bg-[#005a63] hover:shadow-[0_20px_40px_rgba(0,109,119,0.3)]"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessMethodology;
