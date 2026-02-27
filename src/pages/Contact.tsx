import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Lock, Cpu, Globe, ArrowRight } from 'lucide-react';
import Matter from 'matter-js';
import GlitchOverlay from '../components/home/GlitchOverlay';

const SECTORS = ['Fractional CMO Deployment', 'Systems Architecture', 'AI Integration', 'Revenue Ops Overhaul'];
const BUDGET_BANDS = ['<$25K Rapid Strike', '$25K–$75K Build', '$75K–$150K Overhaul', '$150K+ Strategic Campaign'];

const Contact: React.FC = () => {
  const [step, setStep] = useState<'initializing' | 'ready' | 'deploying' | 'success'>('initializing');
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', scope: SECTORS[0], budget: BUDGET_BANDS[0] });
  const physicsContainerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  // Phase 1: Typing Logic
  useEffect(() => {
    const sequence = [
      'SYSTEM_READY...',
      'INITIALIZING_SECURE_CONNECTION...',
      'ESTABLISHING_ENCRYPTED_TUNNEL...',
      'AUTH_SUCCESSFUL. PROMPT_LOADED.'
    ];

    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < sequence.length) {
        setTerminalLines(prev => [...prev, sequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setStep('ready'), 800);
      }
    }, 600);

    return () => clearInterval(interval);
  }, []);

  // Phase 2: Success Haptics (Matter.js)
  const triggerSuccessHaptics = (xPos: number, yPos: number) => {
    if (!physicsContainerRef.current) return;

    const engine = Matter.Engine.create();
    engineRef.current = engine;
    const render = Matter.Render.create({
      element: physicsContainerRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
      }
    });

    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 10,
      window.innerWidth,
      20,
      { isStatic: true }
    );

    const cubes = Array.from({ length: 60 }).map(() => {
      const x = xPos + (Math.random() * 40 - 20);
      const y = yPos + (Math.random() * 40 - 20);
      return Matter.Bodies.rectangle(x, y, 6, 6, {
        render: { fillStyle: '#00F2FF' },
        restitution: 0.5,
        friction: 0.1
      });
    });

    Matter.Composite.add(engine.world, [ground, ...cubes]);
    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Explosive burst from button position
    cubes.forEach(cube => {
      Matter.Body.applyForce(cube, cube.position, {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 1) * 0.03
      });
    });
  };

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault();
    const rect = (e.target as HTMLFormElement).querySelector('button')?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    setStep('deploying');
    setIsGlitching(true);

    // Simulate deployment sequence
    setTimeout(() => {
      setStep('success');
      setIsGlitching(false);
      triggerSuccessHaptics(x, y);
    }, 2500);
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden font-['Geist_Mono',_monospace] text-white select-none">
      <GlitchOverlay isBooting={isGlitching} />

      <div ref={physicsContainerRef} className="absolute inset-0 pointer-events-none z-50" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
           style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <main className="relative z-10 h-full flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {step === 'initializing' && (
              <motion.div
                key="init"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2 text-cyan-400"
              >
                {terminalLines.map((line, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="opacity-50">&gt;</span>
                    <span>{line}</span>
                  </div>
                ))}
                <motion.div
                  animate={{ opacity: [0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="w-2 h-5 bg-cyan-400 inline-block align-middle"
                />
              </motion.div>
            )}

            {step === 'ready' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                  <div className="p-3 bg-cyan-400/10 rounded-xl">
                    <Terminal className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h1 className="text-xl font-black tracking-tighter uppercase">Deployment_Request</h1>
                    <p className="text-[10px] text-cyan-400/70 uppercase tracking-widest">Protocol:: SECURE_HANDSHAKE</p>
                  </div>
                </div>

                <form onSubmit={handleDeploy} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest block">&gt; NAME:</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 transition-colors uppercase text-sm font-['Geist_Mono',_monospace]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-white/50 uppercase tracking-widest block">&gt; EMAIL:</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 transition-colors uppercase text-sm font-['Geist_Mono',_monospace]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/50 uppercase tracking-widest block">&gt; PROJECT_SCOPE:</label>
                      <select
                        value={form.scope}
                        onChange={e => setForm({...form, scope: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 transition-colors uppercase text-sm appearance-none cursor-pointer font-['Geist_Mono',_monospace]"
                      >
                        {SECTORS.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/50 uppercase tracking-widest block">&gt; BUDGET_RANGE:</label>
                      <select
                        value={form.budget}
                        onChange={e => setForm({...form, budget: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400/50 transition-colors uppercase text-sm appearance-none cursor-pointer font-['Geist_Mono',_monospace]"
                      >
                        {BUDGET_BANDS.map(b => <option key={b} value={b} className="bg-slate-900">{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-cyan-400 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-300 transition-colors uppercase tracking-widest text-xs mt-4"
                  >
                    INITIATE_DEPLOYMENT <ArrowRight size={16} />
                  </button>
                </form>
              </motion.div>
            )}

            {step === 'deploying' && (
              <motion.div
                key="deploy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-4"
              >
                <div className="flex justify-center">
                  <Cpu className="text-cyan-400 animate-pulse" size={64} />
                </div>
                <div className="space-y-2 font-['Geist_Mono',_monospace]">
                  <p className="text-cyan-400 text-sm animate-pulse tracking-[0.3em]">TRANSMITTING_DATA...</p>
                  <p className="text-cyan-400/60 text-xs animate-pulse tracking-[0.2em]">ENCRYPTING_CONTACT_MANIFEST...</p>
                </div>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-cyan-400/10 rounded-full">
                    <Lock className="text-cyan-400" size={48} />
                  </div>
                </div>
                <div className="space-y-4 font-['Geist_Mono',_monospace]">
                  <div className="space-y-1 text-left">
                    <p className="text-cyan-400/60 text-[10px] tracking-[0.2em]">TRANSMITTING_DATA...</p>
                    <p className="text-cyan-400/60 text-[10px] tracking-[0.2em]">ENCRYPTING_CONTACT_MANIFEST...</p>
                    <p className="text-cyan-400 font-black text-lg tracking-tighter uppercase">[SUCCESS]:: ARCHITECT_NOTIFIED.</p>
                  </div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.5em] pt-4 border-t border-white/10">CONNECTION_CLOSED</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Info */}
      <div className="fixed bottom-6 left-6 right-6 flex justify-between items-center text-[8px] text-white/30 uppercase tracking-[0.4em]">
        <div className="flex items-center gap-2">
          <Globe size={10} /> UPLINK_LOCATION: 39.7684° N, 86.1581° W
        </div>
        <div>SECURE_TERMINAL_V35.0</div>
      </div>
    </div>
  );
};

export default Contact;
