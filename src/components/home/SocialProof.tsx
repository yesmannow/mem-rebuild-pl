import React from 'react';
import { motion } from 'framer-motion';
import { OceanGradientText } from '../ui/OceanGradientText';

interface ClientLogo {
  name: string;
  image?: string;
  description: string;
}

const clients: ClientLogo[] = [
  {
    name: 'Graston Technique®',
    description: 'Marketing Director - Built 400+ automations, GPT assistant, analytics dashboards',
  },
  {
    name: 'Riley Bennett Egloff',
    description: 'Marketing Manager - Led content strategy, web development, brand evolution',
  },
  {
    name: 'Ultimate Technologies',
    description: 'Interim Director - Optimized paid campaigns, strategic marketing leadership',
  },
  {
    name: 'Deerfield Financial',
    description: 'Marketing Coordinator - Campaign execution, event management, compliance',
  },
  {
    name: 'Pike Medical Consultants',
    description: 'Marketing Coordinator - Brand awareness, web design, public relations',
  },
];

const SocialProof: React.FC = () => {
  return (
    <section className="relative py-16 bg-[#006d77] overflow-hidden">
      {/* Background element */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(#edf6f9 1px, transparent 1px),
            linear-gradient(90deg, #edf6f9 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#006d77]/20 bg-[#006d77]/5 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#006d77] animate-pulse" />
            <span className="text-sm font-mono text-[#006d77] uppercase tracking-wider">
              Trusted By Industry Leaders
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            <OceanGradientText text="Delivering Results Across Industries" className="text-[#edf6f9]" />
          </h2>
        </motion.div>

        {/* Client cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#5a7a7d]/50 border border-[#5a7a7d] rounded-lg p-6 hover:border-[#006d77]/30 transition-all duration-300"
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-[#006d77]/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <h3 className="text-xl font-display font-bold text-[#edf6f9] mb-3">
                  {client.name}
                </h3>
                <p className="text-sm text-[#edf6f9]/60 font-body leading-relaxed">
                  {client.description}
                </p>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="absolute top-4 right-4 w-2 h-2 bg-[#006d77] rounded-full" />
                <div className="absolute top-4 right-8 w-1 h-1 bg-[#006d77] rounded-full" />
                <div className="absolute top-8 right-4 w-1 h-1 bg-[#006d77] rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {[
            { value: '50+', label: 'Clients Served' },
            { value: '16+', label: 'Years Experience' },
            { value: '5', label: 'Industries' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold font-mono text-[#006d77] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[#edf6f9]/60 font-body uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
