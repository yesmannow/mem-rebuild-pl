import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Server, Activity, Shield, Cpu, Database } from 'lucide-react';
import { OceanCountingNumber } from '../components/ui/OceanCountingNumber';
import AnimatedProgressBar from '../components/ui/AnimatedProgressBar';
import TypingTerminal from '../components/ui/TypingTerminal';
import FloatingParticles from '../components/ui/FloatingParticles';
import GlowEffect from '../components/ui/GlowEffect';
import { AnimatedBeam } from '../components/ui/shadcn-io/animated-beam';

const WarRoom = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });
  const strategyRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const terminalCommands = [
    {
      command: 'wp option list --autoload=yes | grep "legacy_"',
      output: 'Found 342 orphaned rows. Deleting... Done.',
      delay: 2000,
    },
    {
      command: 'sudo service apache2 stop',
      output: 'Stopping Apache Web Server... Done.',
      delay: 2000,
    },
    {
      command: 'apt-get install open-litespeed',
      output: 'Reading package lists... Done.',
      delay: 2000,
    },
    {
      command: 'redis-cli ping',
      output: 'PONG',
      delay: 1000,
    },
  ];

  return (
    <div className="min-h-screen bg-brand-dark pt-24 pb-20 relative overflow-hidden">
      <FloatingParticles count={30} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 border-b border-brand-teal/10 pb-8"
        >
          <div className="flex items-center space-x-3 mb-4 text-brand-teal">
            <Activity className="animate-pulse" size={24} />
            <span className="font-mono text-sm tracking-widest uppercase">System Status: Operational</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-brand-text mb-6">
            The War Room
          </h1>
          <p className="text-xl text-brand-muted max-w-3xl leading-relaxed">
            A transparent, real-time look at how we executed a multi-week site optimization project, transforming performance, security, and reliability from the server to the browser.
          </p>
        </motion.div>

        {/* Metrics Dashboard (Netdata Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-brand-surface/50 border border-brand-teal/20 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group hover:border-brand-teal/40 transition-all"
          >
            <GlowEffect intensity="low" color="teal" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-brand-muted text-sm uppercase tracking-wider">Server Load</div>
                  <div className="text-3xl font-mono font-bold text-brand-teal">
                    <OceanCountingNumber
                      number={-40}
                      suffix="%"
                      className="text-brand-teal"
                      transition={{ stiffness: 100, damping: 30 }}
                    />
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Cpu className="text-brand-teal/50" />
                </motion.div>
              </div>
              <AnimatedProgressBar
                value={60}
                delay={0.3}
                barClassName="bg-gradient-to-r from-brand-teal to-brand-orange"
              />
              <p className="text-xs text-brand-muted mt-3">Reduced peak CPU usage by replacing WP-Cron with server-side cron.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-brand-surface/50 border border-brand-teal/20 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group hover:border-brand-teal/40 transition-all"
          >
            <GlowEffect intensity="low" color="teal" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-brand-muted text-sm uppercase tracking-wider">Page Speed</div>
                  <div className="text-3xl font-mono font-bold text-brand-teal">
                    <OceanCountingNumber
                      number={30}
                      suffix="% Faster"
                      className="text-brand-teal"
                      transition={{ stiffness: 100, damping: 30 }}
                    />
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Activity className="text-brand-teal/50" />
                </motion.div>
              </div>
              <AnimatedProgressBar
                value={85}
                delay={0.4}
                barClassName="bg-gradient-to-r from-brand-teal to-brand-orange"
              />
              <p className="text-xs text-brand-muted mt-3">Achieved via LiteSpeed, Redis, and Cloudflare Tiered Caching.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-brand-surface/50 border border-brand-teal/20 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group hover:border-brand-teal/40 transition-all"
          >
            <GlowEffect intensity="low" color="teal" />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-brand-muted text-sm uppercase tracking-wider">Threats Blocked</div>
                  <div className="text-3xl font-mono font-bold text-brand-teal">
                    <OceanCountingNumber
                      number={85}
                      suffix="k/mo"
                      className="text-brand-teal"
                      transition={{ stiffness: 100, damping: 30 }}
                    />
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2.5 }}
                >
                  <Shield className="text-brand-teal/50" />
                </motion.div>
              </div>
              <AnimatedProgressBar
                value={92}
                delay={0.5}
                barClassName="bg-gradient-to-r from-brand-teal to-brand-orange"
              />
              <p className="text-xs text-brand-muted mt-3">Neutralized via Cloudflare Super Bot Fight Mode at the edge.</p>
            </div>
          </motion.div>
        </div>

        {/* Terminal / Engine Room Log */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative">
          <motion.div
            ref={strategyRef}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-brand-text">The Strategy: Defense in Depth</h2>
            <div className="space-y-6 relative">
              <motion.div
                ref={strategyRef}
                className="flex gap-4 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.div
                  className="mt-1"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Shield className="text-brand-orange" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-brand-text mb-2">1. Secure the Edge</h3>
                  <p className="text-brand-muted">Harden the site at the DNS and CDN level with Cloudflare to stop threats before they reach the origin.</p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="mt-1"
                  whileHover={{ scale: 1.2, rotate: -15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Server className="text-brand-orange" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-brand-text mb-2">2. Optimize the Server</h3>
                  <p className="text-brand-muted">Migrate from Apache to LiteSpeed, tune PHP-FPM, and implement Redis object caching.</p>
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  className="mt-1"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Database className="text-brand-orange" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-brand-text mb-2">3. Database Hygiene</h3>
                  <p className="text-brand-muted">Removed ~805 KB of dead autoloaded options using WP-CLI to streamline queries.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* The Terminal Component with Typing Animation */}
          <motion.div
            ref={terminalRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TypingTerminal commands={terminalCommands} />
          </motion.div>

          {/* Animated Beam Connections */}
          {containerRef.current && strategyRef.current && terminalRef.current && (
            <>
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={strategyRef}
                toRef={terminalRef}
                curvature={-75}
                duration={3}
                delay={0.5}
                pathColor="#40E0D0"
                pathWidth={2}
                pathOpacity={0.3}
                gradientStartColor="#40E0D0"
                gradientStopColor="#FF6B35"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WarRoom;
