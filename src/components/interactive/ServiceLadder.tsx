import React from 'react';
import { motion } from 'framer-motion';
import { OceanGradientText } from '../ui/OceanGradientText';

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
    <section className="py-24 bg-[#006d77] relative overflow-hidden">
      {/* Background gradient orbs */}
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-[#83c5be]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 11,
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <OceanGradientText text="What I Deliver" className="text-[#edf6f9]" />
          </h2>
          <p className="text-lg text-[#edf6f9]/60 max-w-2xl mx-auto font-body">
            End-to-end marketing systems built for scale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-[#5a7a7d]/30 border border-[#5a7a7d]/50 rounded-lg p-8 min-h-[400px] flex flex-col cursor-pointer backdrop-blur-sm"
            >
              {/* Stacked card effect on hover - Ocean Pearl */}
              <div className="absolute inset-0 rounded-lg bg-[#006d77]/10 opacity-0 group-hover:opacity-100 transition-opacity -z-10 translate-y-2" />
              <div className="absolute inset-0 rounded-lg bg-[#006d77]/5 opacity-0 group-hover:opacity-100 transition-opacity -z-20 translate-y-4" />

              <div className="font-mono text-6xl font-bold text-[#006d77]/20 mb-4">
                {service.number}
              </div>

              {service.icon && (
                <div className="text-4xl mb-4">{service.icon}</div>
              )}

              <h3 className="text-2xl font-display font-bold text-[#edf6f9] mb-4">
                {service.title}
              </h3>

              <p className="text-[#edf6f9]/70 font-body leading-relaxed flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
