import { motion } from "framer-motion";
import SectionWrapper from "../components/SectionWrapper";

const testimonials = [
  {
    name: "Dr. Alex Carter",
    role: "Lead Therapist",
    quote: "The instruments and CEU bundle from GT transformed our recovery outcomes.",
  },
  {
    name: "Emily Nguyen, PT",
    role: "Sports Rehab Specialist",
    quote: "Becoming a Preferred Provider brought new referrals and trust instantly.",
  },
];

export default function TestimonialsSection() {
  return (
    <SectionWrapper bg="bg-light-blue-gray" id="testimonials">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-turquoise text-center mb-12">What Our Clinicians Say</h2>
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.3 }}
            className="bg-white rounded-lg shadow-md p-8 mb-8"
          >
            <blockquote className="text-lg text-gray-700 italic">"{t.quote}"</blockquote>
            <p className="mt-6 font-bold text-turquoise">{t.name}</p>
            <p className="text-gray-500">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

