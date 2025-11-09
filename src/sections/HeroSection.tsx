import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

export default function HeroSection() {
  return (
    <SectionWrapper bg="bg-light-blue-gray" id="hero">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-5xl font-bold text-turquoise">
          Empowering Clinicians with Precision Tools
        </h1>
        <p className="mt-6 text-lg text-gray-700">
          CEUs, instruments, community — all in one place.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} className="mt-8">
          <a
            href="/start"
            className="inline-block bg-creamsicle text-white py-3 px-8 rounded-md hover:bg-creamsicle-dark transition"
          >
            Start Your Journey
          </a>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

