import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Claire Rhodes",
    role: "Senior Director of Demand Gen, HealthTech",
    quote: "Jacob arrived with a full discovery plan, quantified value in his second conversation, and handed us a roadmap that our executive team approved on the spot.",
    gradient: "from-blue-500/20 via-purple-500/10 to-pink-500/20"
  },
  {
    name: "Marcus Lin",
    role: "VP Marketing Operations, Enterprise SaaS",
    quote: "He bridges the interview gap—strategic storytelling for hiring panels, then detailed swim lanes for engineers and RevOps. We saw exactly how he'd produce impact in 90 days.",
    gradient: "from-emerald-500/20 via-cyan-500/10 to-blue-500/20"
  },
  {
    name: "Danielle Ortiz",
    role: "Head of Lifecycle Marketing, Professional Services",
    quote: "The asset Jacob sent ahead of panel interviews made it effortless to brief stakeholders. His dashboards and automation playbooks were plug-and-play for our team.",
    gradient: "from-amber-500/20 via-orange-500/10 to-rose-500/20"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-mono tracking-[0.3em] text-cyan-400 mb-4">TESTIMONIALS</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Trusted by Teams Who Ship
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Partners across healthcare, SaaS, and professional services rely on Jacob to connect the dots between strategy, systems, and story.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(({ name, role, quote, gradient }) => (
            <motion.div
              key={name}
              className="relative h-full border border-white/10 bg-gray-900/60 rounded-3xl p-8 overflow-hidden group transition-transform duration-300 hover:-translate-y-1 hover:border-white/20"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10 h-full flex flex-col gap-6">
                <Quote className="w-10 h-10 text-cyan-300" />
                <p className="text-gray-200 text-lg leading-relaxed flex-1">“{quote}”</p>
                <div className="space-y-1">
                  <p className="text-white font-semibold">{name}</p>
                  <p className="text-sm text-gray-400">{role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
