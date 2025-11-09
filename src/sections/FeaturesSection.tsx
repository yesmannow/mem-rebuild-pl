import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

const features = [
  {
    title: "Instrument Bundles",
    description: "Curated tool sets to streamline your clinical workflow.",
    icon: "⚙️",
  },
  {
    title: "CEU-First Education",
    description: "Keep your certification current with engaging self-paced modules.",
    icon: "🎓",
  },
  {
    title: "Preferred Provider Network",
    description: "Connect with trusted clinicians and improve referral flow.",
    icon: "🤝",
  },
];

export default function FeaturesSection() {
  return (
    <SectionWrapper bg="bg-white" id="features">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="grid gap-12 md:grid-cols-3"
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-center px-8"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-turquoise mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}

