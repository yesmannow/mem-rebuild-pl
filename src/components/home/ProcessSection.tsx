import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Lightbulb, Code, Rocket, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const processSteps = [
    {
      id: 1,
      title: 'Discovery',
      subtitle: 'Audit & Analysis',
      description:
        'Deep dive into existing systems, identify pain points, and map current workflows to understand the full scope of challenges.',
      icon: Search,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      features: [
        'System architecture audit',
        'User journey mapping',
        'Performance bottleneck analysis',
        'Stakeholder interviews',
      ],
    },
    {
      id: 2,
      title: 'Architecture',
      subtitle: 'Design & Planning',
      description:
        'Create scalable solutions with clear data flow, define technical requirements, and design system architecture for optimal performance.',
      icon: Lightbulb,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
      features: [
        'Technical architecture design',
        'Data flow optimization',
        'Integration planning',
        'Scalability framework',
      ],
    },
    {
      id: 3,
      title: 'Build',
      subtitle: 'Development & Integration',
      description:
        'Full-stack development with automation integration, implementing clean code practices and ensuring seamless system connectivity.',
      icon: Code,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
      features: [
        'Full-stack development',
        'API integration',
        'Automation workflows',
        'Quality assurance',
      ],
    },
    {
      id: 4,
      title: 'Optimize',
      subtitle: 'Performance & Growth',
      description:
        'Continuous monitoring, A/B testing, and performance tuning to ensure systems scale with business growth and deliver maximum ROI.',
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      features: [
        'Performance monitoring',
        'A/B testing implementation',
        'Continuous optimization',
        'Growth scaling',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline animation for process steps
      gsap.fromTo(
        '.process-step',
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Connecting line animation
      gsap.fromTo(
        '.process-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Floating elements
      gsap.to('.floating-process-element', {
        y: -20,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.8,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-black via-gray-900/50 to-black relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl floating-process-element" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating-process-element" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-2xl floating-process-element" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <span className="text-blue-300 text-sm font-medium">My Process</span>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              From Chaos to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Clarity
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            A systematic approach to transforming complex challenges into elegant,
            <span className="text-blue-300 font-semibold"> scalable solutions</span> that drive
            <span className="text-purple-300 font-semibold"> measurable business results</span>.
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 process-line transform -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isLast = index === processSteps.length - 1;

              return (
                <motion.div
                  key={step.id}
                  className="process-step group relative z-10"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Step Card */}
                  <div
                    className={`relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border ${step.borderColor} rounded-3xl p-8 hover:border-white/30 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-blue-500/10`}
                  >
                    {/* Step Number */}
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r ${step.color} mb-6`}
                    >
                      <span className="text-white font-bold text-lg">{step.id}</span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${step.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4 font-medium">{step.subtitle}</p>
                      <p className="text-gray-300 leading-relaxed">{step.description}</p>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-gray-400">
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Arrow for non-last items */}
                    {!isLast && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Hover Glow Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500 pointer-events-none`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="inline-block p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-xl border border-white/10 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Systems?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl">
              Let's discuss how this process can solve your specific challenges and drive measurable
              business growth.
            </p>
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
