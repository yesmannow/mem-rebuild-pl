import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-dark pt-20">

      {/* Ambient Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-teal/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">

        {/* TEXT CONTENT */}
        <div className="space-y-8">
          <div className="inline-flex items-center space-x-2 bg-brand-surface border border-brand-teal/20 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
            <span className="text-brand-teal text-xs font-mono font-medium tracking-wide">
              AVAILABLE FOR FRACTIONAL LEADERSHIP
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-brand-text leading-tight">
            I Build Marketing Engines That <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-orange">Scale Revenue.</span>
          </h1>

          <p className="text-xl text-brand-muted max-w-lg leading-relaxed">
            I bridge the gap between <strong>CMO Strategy</strong> and <strong>CTO Execution</strong>. I don't just plan campaigns; I build the automated systems that run them.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/case-studies"
              className="flex items-center justify-center space-x-2 bg-brand-teal text-brand-dark px-8 py-4 rounded-md font-bold hover:bg-white transition-all text-lg"
            >
              <span>View Case Studies</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/tools"
              className="flex items-center justify-center space-x-2 border border-brand-muted/30 text-brand-text px-8 py-4 rounded-md font-medium hover:border-brand-teal hover:text-brand-teal transition-all text-lg"
            >
              <Terminal size={20} />
              <span>Explore My Code</span>
            </Link>
          </div>
        </div>

        {/* VISUAL: The "DevOps" Flex */}
        <div className="relative hidden lg:block">
          <div className="bg-[#1a1b26] rounded-xl border border-brand-muted/20 shadow-2xl p-4 font-mono text-sm overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center space-x-2 mb-4 border-b border-white/10 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-brand-muted">jacob@workstation:~/marketing-automation</span>
            </div>

            <div className="space-y-2">
              <div className="flex">
                <span className="text-brand-teal mr-2">❯</span>
                <span className="text-white">deploy marketing-stack --production</span>
              </div>
              <div className="text-brand-muted">Initializing CRM integration... <span className="text-green-400">Done</span></div>
              <div className="text-brand-muted">Connecting HubSpot API... <span className="text-green-400">Connected (24ms)</span></div>
              <div className="text-brand-muted">Optimizing Conversion Paths... <span className="text-brand-orange">WARN: High Traffic Detected</span></div>
              <div className="text-brand-muted">Running Revenue Analysis...</div>

              <div className="mt-4 p-3 bg-brand-dark/50 rounded border border-brand-teal/20">
                <div className="text-brand-teal font-bold mb-1">Impact Report:</div>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>Customer Acquisition Cost</div>
                  <div className="text-right text-green-400">-42%</div>
                  <div>Lead Velocity</div>
                  <div className="text-right text-green-400">+125%</div>
                </div>
              </div>

              <div className="flex mt-2">
                <span className="text-brand-teal mr-2">❯</span>
                <span className="animate-pulse w-2 h-5 bg-brand-teal block"></span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

