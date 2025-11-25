import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('FATAL ERROR: 404');
  const [errorLines, setErrorLines] = useState<string[]>([]);
  const navigate = useNavigate();

  // Blue Screen of Death effect
  useEffect(() => {
    const glitchChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const interval = setInterval(() => {
      const original = 'FATAL ERROR: 404';
      let glitched = '';
      for (let i = 0; i < original.length; i++) {
        if (Math.random() < 0.15) {
          glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
        } else {
          glitched += original[i];
        }
      }
      setGlitchText(glitched);
      setTimeout(() => setGlitchText(original), 150);
    }, 2500);

    // Simulate error log lines
    const errorMessages = [
      'SYSTEM: Route not found in routing table',
      'NETWORK: Connection timeout',
      'MEMORY: Page allocation failed',
      'STACK: Navigation stack overflow',
      'HTTP: 404 Not Found',
      'ROUTER: Invalid path parameter',
    ];

    let lineIndex = 0;
    const lineInterval = setInterval(() => {
      if (lineIndex < errorMessages.length) {
        setErrorLines((prev) => [...prev, errorMessages[lineIndex]]);
        lineIndex++;
      }
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(lineInterval);
    };
  }, []);

  const handleReboot = () => {
    navigate('/');
  };

  return (
    <main className="min-h-dvh flex items-center justify-center container-px bg-[#0078D4] text-white font-mono relative overflow-hidden">
      {/* Blue Screen Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0078D4] to-[#005A9E]" />

      {/* Scanlines effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)',
          }}
        />
      </div>

      {/* Glitch overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          className="h-full w-full bg-white"
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2 }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-left relative z-10 p-8">
        {/* Error Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-6xl md:text-8xl font-bold mb-4 drop-shadow-lg">
            {glitchText}
          </div>
          <div className="text-2xl md:text-3xl font-semibold mb-2">SIGNAL LOST</div>
          <div className="text-lg opacity-90">
            A problem has been detected and the page has been shut down to prevent damage.
          </div>
        </motion.div>

        {/* Error Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/30 backdrop-blur-sm border-2 border-white/20 rounded-lg p-6 mb-8"
        >
          <div className="text-xl font-bold mb-4">Technical Information:</div>
          <div className="space-y-2 text-sm font-mono">
            <div>*** STOP: 0x00000044 (0x00000000, 0x00000000, 0x00000000, 0x00000000)</div>
            <div>*** PAGE_NOT_FOUND</div>
            <div className="mt-4 space-y-1">
              {errorLines.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  {'>'} {line}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Possible Causes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="text-xl font-bold mb-4">If this is the first time you've seen this error:</div>
          <ul className="list-disc ml-6 space-y-2 text-lg">
            <li>The URL path does not exist in the routing table</li>
            <li>The resource has been moved or deleted</li>
            <li>Network signal was interrupted during navigation</li>
          </ul>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={handleReboot}
            className="group relative px-8 py-4 bg-white text-[#0078D4] font-bold text-lg uppercase tracking-wider border-2 border-white hover:bg-[#0078D4] hover:text-white transition-all duration-300 shadow-lg"
          >
            <span className="relative z-10">REBOOT SYSTEM</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10"
              animate={{
                x: [-5, 5, -5],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
              }}
            />
          </button>

          <Link
            to="/case-studies"
            className="px-8 py-4 bg-transparent text-white font-bold text-lg uppercase tracking-wider border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300"
          >
            VIEW WORK
          </Link>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-sm opacity-75 font-mono"
        >
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              _
            </motion.span>
            <span>Press REBOOT SYSTEM to return to home page</span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
