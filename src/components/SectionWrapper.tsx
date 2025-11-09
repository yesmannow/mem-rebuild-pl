import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionWrapperProps {
  id?: string;
  bg?: string; // Tailwind bg class (e.g. "bg-cave-bg", "bg-cave-ember")
  children: ReactNode;
  animate?: boolean;
}

export default function SectionWrapper({
  id,
  bg = 'bg-[color:theme("colors.cave.bg")]',
  children,
  animate = true,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`${bg} py-20`}>
      {animate ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="container mx-auto max-w-7xl px-6"
        >
          {children}
        </motion.div>
      ) : (
        <div className="container mx-auto max-w-7xl px-6">{children}</div>
      )}
    </section>
  );
}
