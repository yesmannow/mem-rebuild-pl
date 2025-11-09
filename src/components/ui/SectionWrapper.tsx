import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  bg?: string;
  id?: string;
  animate?: boolean;
}

export default function SectionWrapper({
  children,
  bg = "bg-[color:theme('colors.cave.bg')]",
  id,
  animate = true
}: SectionWrapperProps) {
  return (
    <section id={id} className={`${bg} py-20`}>
      {animate ? (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
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

