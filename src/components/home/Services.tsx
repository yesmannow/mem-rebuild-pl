import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Workflow, LineChart, Bot } from "lucide-react";

const services = [
  {
    id: "fractional",
    icon: <Briefcase className="w-6 h-6" />,
    title: "Fractional Marketing Leadership",
    summary: "Embed a strategic marketing leader who aligns revenue teams, clarifies positioning, and operationalizes growth initiatives.",
    highlights: [
      "Executive marketing roadmap",
      "Cross-functional OKR alignment",
      "Quarterly growth experiments"
    ],
    gradient: "from-blue-500/20 via-blue-400/10 to-purple-500/20"
  },
  {
    id: "systems",
    icon: <Workflow className="w-6 h-6" />,
    title: "Revenue Systems Architecture",
    summary: "Design and deploy the tooling stack that connects CRM, automation, analytics, and product experiences into one source of truth.",
    highlights: [
      "Customer data infrastructure",
      "Lifecycle automation",
      "Sales enablement workflows"
    ],
    gradient: "from-purple-500/20 via-pink-400/10 to-rose-500/20"
  },
  {
    id: "analytics",
    icon: <LineChart className="w-6 h-6" />,
    title: "Analytics & Attribution",
    summary: "Rebuild measurement foundations with reliable tagging, dashboards, and insight loops that power confident decision-making.",
    highlights: [
      "Server-side tracking",
      "Executive dashboards",
      "Performance optimization"
    ],
    gradient: "from-emerald-500/20 via-teal-400/10 to-cyan-500/20"
  },
  {
    id: "automation",
    icon: <Bot className="w-6 h-6" />,
    title: "Automation & AI Operations",
    summary: "Automate the repetitive, personalize the critical, and orchestrate AI copilots that protect margins and scale delight.",
    highlights: [
      "AI-assisted support",
      "Workflow intelligence",
      "Compliance guardrails"
    ],
    gradient: "from-amber-500/20 via-orange-400/10 to-pink-500/20"
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-mono tracking-[0.3em] text-blue-400 mb-4">SERVICES</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Build the Machine Behind the Brand
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Engagement models designed for marketing leaders who need a partner that can think strategically, build technically, and move with pace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(({ id, icon, title, summary, highlights, gradient }) => (
            <motion.div
              key={id}
              className="relative bg-gray-900/60 border border-white/10 rounded-3xl p-8 overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -10 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 border border-white/10 text-white">
                  {icon}
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-3">{title}</h3>
                  <p className="text-gray-300 leading-relaxed">{summary}</p>
                </div>
                <div className="space-y-3">
                  {highlights.map((point) => (
                    <div key={point} className="flex items-center gap-3 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
