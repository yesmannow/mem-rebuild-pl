import React from "react";
import { motion } from "framer-motion";
import { Search, Puzzle, Hammer, Rocket } from "lucide-react";

const phases = [
  {
    id: "discover",
    label: "Discover",
    icon: <Search className="w-6 h-6" />,
    summary: "Align on the outcomes that matter, audit data health, and surface the friction holding growth back.",
    bullets: [
      "Stakeholder interviews",
      "System + data inventory",
      "Opportunity scoring"
    ]
  },
  {
    id: "design",
    label: "Design",
    icon: <Puzzle className="w-6 h-6" />,
    summary: "Map customer journeys, architect the stack, and define the operating playbooks that will run it.",
    bullets: [
      "Journey & workflow design",
      "Technical blueprint",
      "Success metrics + KPIs"
    ]
  },
  {
    id: "build",
    label: "Build",
    icon: <Hammer className="w-6 h-6" />,
    summary: "Ship the automations, integrations, and analytics layers that connect the experience from end to end.",
    bullets: [
      "Implementation sprints",
      "QA & instrumentation",
      "Team enablement"
    ]
  },
  {
    id: "scale",
    label: "Scale",
    icon: <Rocket className="w-6 h-6" />,
    summary: "Optimize the feedback loops, automate insights, and coach teams to keep the machine improving.",
    bullets: [
      "Experiment roadmaps",
      "Executive dashboards",
      "Ongoing iteration"
    ]
  }
];

const timelineVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.1, duration: 0.7, ease: "easeOut" }
  })
};

const Process: React.FC = () => {
  return (
    <section id="process" className="py-32 bg-gradient-to-b from-black via-gray-950 to-black relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-mono tracking-[0.3em] text-purple-400 mb-4">PROCESS</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              How Engagements Come to Life
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            A repeatable operating system that keeps strategy, systems, and storytelling moving in lockstep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.id}
              className="relative rounded-3xl border border-white/10 bg-gray-900/60 p-8 shadow-[0_0_30px_rgba(59,130,246,0.05)]"
              variants={timelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/10 text-white">
                  {phase.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">{phase.label}</h3>
              </div>
              <p className="text-gray-300 leading-relaxed mb-5">{phase.summary}</p>
              <ul className="space-y-3">
                {phase.bullets.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
