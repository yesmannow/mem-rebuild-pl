import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Zap, TrendingUp, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Component to handle metric glow with CSS variable
const MetricGlow = ({ glowColor }: { glowColor: string }) => {
  const glowRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (glowRef.current) {
      glowRef.current.style.setProperty('--glow-color', glowColor);
      glowRef.current.style.setProperty('box-shadow', `inset 0 0 20px ${glowColor}`);
    }
  }, [glowColor]);

  return (
    <div
      ref={glowRef}
      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    />
  );
};

interface Metric {
  id: string;
  icon: React.ReactNode;
  value: number;
  suffix: string;
  label: string;
  color: string;
  glowColor: string;
}

const metrics: Metric[] = [
  {
    id: "ticket-reduction",
    icon: <TrendingUp className="w-6 h-6" />,
    value: 70,
    suffix: "%",
    label: "Support Ticket Reduction",
    color: "from-green-400 to-emerald-400",
    glowColor: "rgba(34, 197, 94, 0.3)"
  },
  {
    id: "conversion-increase",
    icon: <Zap className="w-6 h-6" />,
    value: 40,
    suffix: "%",
    label: "Conversion Rate Increase",
    color: "from-purple-400 to-pink-400",
    glowColor: "rgba(147, 51, 234, 0.3)"
  },
  {
    id: "automations",
    icon: <Zap className="w-6 h-6" />,
    value: 400,
    suffix: "+",
    label: "Marketing Automations",
    color: "from-blue-400 to-cyan-400",
    glowColor: "rgba(59, 130, 246, 0.3)"
  },
  {
    id: "users",
    icon: <Users className="w-6 h-6" />,
    value: 30,
    suffix: "K+",
    label: "Users Served Globally",
    color: "from-orange-400 to-yellow-400",
    glowColor: "rgba(249, 115, 22, 0.3)"
  }
];

const GlanceMetrics: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      return;
    }

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const cards = q(".metric-card");

      // Entry animation for cards
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate counters when section enters viewport
      metrics.forEach((metric, index) => {
        const card = cards[index];
        if (!card) return;

        const counter = { value: 0 };
        ScrollTrigger.create({
          trigger: section,
          start: "top 70%",
          once: false,
          onEnter: () => {
            gsap.to(counter, {
              value: metric.value,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                setAnimatedValues(prev => ({
                  ...prev,
                  [metric.id]: Math.floor(counter.value)
                }));
              }
            });
          }
        });
      });

      // Gentle floating motion for cards
      gsap.to(cards, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        ease: "sine.inOut"
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-black via-gray-900/20 to-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Impact at a Glance
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Measurable results that demonstrate the intersection of strategic thinking and technical execution.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              className="metric-card group relative"
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                boxShadow: `0 20px 40px ${metric.glowColor}`
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Background */}
              <div className="relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden group-hover:border-white/20 transition-all duration-300">

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl mb-4 shadow-lg`}>
                  <div className="text-white">
                    {metric.icon}
                  </div>
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span className={`text-4xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                    {animatedValues[metric.id] || 0}
                    <span className="text-2xl">{metric.suffix}</span>
                  </span>
                </div>

                {/* Label */}
                <p className="text-gray-400 text-sm font-medium">
                  {metric.label}
                </p>

                {/* Hover Glow - using CSS variable set via ref */}
                <MetricGlow glowColor={metric.glowColor} />

                {/* Corner Accent */}
                <div className={`absolute top-2 right-2 w-2 h-2 bg-gradient-to-br ${metric.color} rounded-full opacity-60`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-gray-500 text-sm font-mono uppercase tracking-wider">
            DATA / STRATEGY / MOTION
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default GlanceMetrics;
