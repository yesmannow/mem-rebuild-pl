import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

export default function CTASection() {
  return (
    <SectionWrapper bg="bg-turquoise" id="cta">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mx-auto max-w-3xl px-6 py-16 text-white"
      >
        <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Practice?</h2>
        <p className="text-lg mb-8">Join GT's Preferred Provider network, access top tools, and earn more referrals.</p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/start"
          className="inline-block bg-creamsicle text-black py-3 px-8 rounded-md font-medium transition"
        >
          Get Started Now
        </motion.a>
      </motion.div>
    </SectionWrapper>
  );
}

