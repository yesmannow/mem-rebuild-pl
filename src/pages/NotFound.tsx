import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404: SIGNAL LOST');

  // Glitch effect
  useEffect(() => {
    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const interval = setInterval(() => {
      const original = '404: SIGNAL LOST';
      let glitched = '';
      for (let i = 0; i < original.length; i++) {
        if (Math.random() < 0.1) {
          glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitched += original[i];
        }
      }
      setGlitchText(glitched);
      setTimeout(() => setGlitchText(original), 100);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-dvh flex items-center justify-center container-px bg-[#0d1117] text-[#00ff41] font-mono relative overflow-hidden">
      {/* Terminal scanlines effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.03) 2px, rgba(0, 255, 65, 0.03) 4px)',
        }} />
      </div>

      {/* Glitch overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-transparent via-[#00ff41] to-transparent animate-pulse" />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 p-8">
        {/* Terminal-style header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-sm text-[#00ff41]/60 mb-4 font-mono">
            <div className="flex items-center gap-2 justify-center mb-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>SYSTEM ERROR</span>
            </div>
            <div className="text-xs">
              ERROR_CODE: 404 | TIMESTAMP: {new Date().toISOString()}
            </div>
          </div>
        </motion.div>

        {/* Main error display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 mb-12"
        >
          <h1 className="text-7xl md:text-9xl font-bold font-mono tracking-wider text-[#00ff41] drop-shadow-[0_0_20px_rgba(0,255,65,0.5)]">
            {glitchText}
          </h1>

          <div className="space-y-4 text-left max-w-xl mx-auto">
            <p className="text-[#00ff41]/80 text-sm leading-relaxed">
              {'>'} The page you are looking for has been disconnected from the matrix.
            </p>
            <p className="text-[#00ff41]/60 text-xs">
              {'>'} Possible causes:
            </p>
            <ul className="text-[#00ff41]/50 text-xs space-y-1 ml-4 list-disc">
              <li>URL path does not exist in routing table</li>
              <li>Resource has been moved or deleted</li>
              <li>Network signal interrupted</li>
            </ul>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/"
            className="group relative px-8 py-4 bg-[#00ff41] text-[#0d1117] font-bold font-mono text-sm uppercase tracking-wider border-2 border-[#00ff41] hover:bg-[#0d1117] hover:text-[#00ff41] transition-all duration-300 shadow-[0_0_20px_rgba(0,255,65,0.3)] hover:shadow-[0_0_30px_rgba(0,255,65,0.5)]"
          >
            <span className="relative z-10">INITIALIZE REBOOT</span>
            <motion.div
              className="absolute inset-0 bg-[#00ff41] opacity-0 group-hover:opacity-10"
              animate={{
                x: [-10, 10, -10],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
              }}
            />
          </Link>

          <Link
            to="/case-studies"
            className="px-8 py-4 bg-transparent text-[#00ff41] font-bold font-mono text-sm uppercase tracking-wider border-2 border-[#00ff41]/50 hover:border-[#00ff41] hover:bg-[#00ff41]/10 transition-all duration-300"
          >
            VIEW WORK
          </Link>
        </motion.div>

        {/* Terminal footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-xs text-[#00ff41]/40 font-mono"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="animate-pulse">_</span>
            <span>Press any key to continue...</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
