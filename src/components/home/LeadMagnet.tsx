import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Download, ExternalLink, Sparkles, CheckCircle } from "lucide-react";

const LeadMagnet: React.FC = () => {
  return (
    <section id="lead-magnet" className="py-32 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-xs uppercase tracking-[0.35em] text-blue-300 mb-6">
            <Sparkles className="w-4 h-4" />
            Interview Toolkit
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Equip Your Team in 10 Minutes
            </span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Hiring quickly? Skip the scavenger hunt. Share this curated toolkit with stakeholders to show how I think, build, and measure impact
            before our interview.
          </p>
        </motion.div>

        <motion.div
          className="relative bg-gray-900/70 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-black/40 opacity-70" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3 text-white">
                <Download className="w-6 h-6" />
                <p className="text-lg font-semibold">Inside the toolkit:</p>
              </div>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                  <span>Snapshot portfolio deck outlining case studies, revenue impact, and tech stack fluency.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5" />
                  <span>Process walkthrough showing how I audit, design, and launch growth systems.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-pink-400 mt-0.5" />
                  <span>Interview-ready prompts to explore team needs, metrics, and collaboration styles.</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  to="/resume"
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:scale-105"
                >
                  <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                  View cinematic résumé experience
                </Link>
                <a
                  href="/documents/Jacob-Darling-Interview-Toolkit.pdf"
                  className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-white/15 text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 hover:scale-105"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download className="w-5 h-5 group-hover:animate-bounce" />
                  Download interview toolkit (PDF)
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-gray-300 space-y-3">
                <p className="font-semibold text-white">Make the most of it:</p>
                <p>Send the toolkit ahead of interviews so hiring managers can browse highlights, metrics, and culture fit materials.</p>
                <p>Pair it with a quick note on how my systems-first approach can accelerate their goals, then use the prompts inside to steer the conversation.</p>
              </div>

              <p className="text-xs text-gray-500">
                Need a tailored walkthrough for your team? Email
                {" "}
                <a href="mailto:jacob@jacobdarling.com" className="text-blue-300 hover:text-blue-200">
                  jacob@jacobdarling.com
                </a>
                {" "}with your role and focus areas—I'm happy to curate a custom briefing deck.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadMagnet;
