import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TypingTerminalProps {
  commands: Array<{
    command: string;
    output: string;
    delay?: number;
  }>;
  className?: string;
  prompt?: string;
}

const TypingTerminal: React.FC<TypingTerminalProps> = ({
  commands,
  className = '',
  prompt = '➜',
}) => {
  const [displayedCommands, setDisplayedCommands] = useState<number[]>([]);
  const [typingStates, setTypingStates] = useState<Record<number, { command: string; output: string }>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    const timers: NodeJS.Timeout[] = [];

    commands.forEach((cmd, index) => {
      // Show command
      const commandDelay = index === 0 ? 500 : commands[index - 1].delay || 2000;
      const timer1 = setTimeout(() => {
        setDisplayedCommands(prev => [...prev, index]);
        // Start typing command
        let charIndex = 0;
        const typeCommand = () => {
          if (charIndex < cmd.command.length) {
            setTypingStates(prev => ({
              ...prev,
              [index]: {
                command: cmd.command.substring(0, charIndex + 1),
                output: prev[index]?.output || '',
              },
            }));
            charIndex++;
            setTimeout(typeCommand, 30);
          } else {
            // Show output after command is typed
            setTimeout(() => {
              setTypingStates(prev => ({
                ...prev,
                [index]: {
                  command: cmd.command,
                  output: cmd.output,
                },
              }));
            }, 300);
          }
        };
        typeCommand();
      }, currentIndex * commandDelay);
      timers.push(timer1);
      currentIndex++;
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [commands]);

  return (
    <div
      ref={containerRef}
      className={`rounded-lg overflow-hidden border border-brand-teal/20 bg-[#0f172a] shadow-2xl font-mono text-sm ${className}`}
    >
      <div className="bg-brand-surface px-4 py-2 flex items-center gap-2 border-b border-brand-teal/10">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-2 text-xs text-brand-muted">jacob@production-server:~</span>
      </div>
      <div className="p-6 space-y-4 text-brand-muted">
        {displayedCommands.map((cmdIndex) => {
          const state = typingStates[cmdIndex];
          const cmd = commands[cmdIndex];
          return (
            <motion.div
              key={cmdIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <span className="text-brand-teal">{prompt}</span>{' '}
                <span className="text-brand-text">
                  {state?.command || ''}
                  {state && state.command.length < cmd.command.length && (
                    <span className="animate-pulse">_</span>
                  )}
                </span>
              </div>
              {state?.output && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="opacity-70 mt-1"
                >
                  {state.output}
                </motion.div>
              )}
            </motion.div>
          );
        })}
        {displayedCommands.length < commands.length && (
          <div className="animate-pulse">
            <span className="text-brand-teal">{prompt}</span> <span className="text-brand-text">_</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTerminal;

