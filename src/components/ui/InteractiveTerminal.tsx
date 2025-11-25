import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Command as CommandIcon, CheckCircle, XCircle, Loader } from 'lucide-react';

interface TerminalCommand {
  command: string;
  output: string;
  status: 'success' | 'error' | 'loading';
  timestamp: Date;
}

const availableCommands = {
  help: {
    output: `Available commands:
  help          - Show this help message
  status        - Show system status
  version       - Show version information
  build         - Show build information
  clear         - Clear terminal
  whoami        - Show user information`,
    status: 'success' as const,
  },
  status: {
    output: `System Status: Operational
  Uptime: 99.9%
  CPU: 12%
  Memory: 2.1GB / 8GB
  Network: Connected
  Build: v2.5.0`,
    status: 'success' as const,
  },
  version: {
    output: `Version: 2.5.0
  Build Date: ${new Date().toLocaleDateString()}
  Environment: Production
  Framework: React 18.3.1
  Node: 20.x`,
    status: 'success' as const,
  },
  build: {
    output: `Build Information:
  Type: Production
  Optimized: Yes
  Bundle Size: 1.2MB
  Assets: 156 files
  Last Build: ${new Date().toLocaleString()}`,
    status: 'success' as const,
  },
  whoami: {
    output: `User: jacob@bearcave.marketing
  Role: Marketing Technologist
  Location: Indianapolis, IN
  Status: Available for projects`,
    status: 'success' as const,
  },
};

export default function InteractiveTerminal() {
  const [commands, setCommands] = useState<TerminalCommand[]>([]);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    setCommands([
      {
        command: 'welcome',
        output: 'Welcome to the War Room Terminal. Type "help" for available commands.',
        status: 'success',
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === 'clear') {
      setCommands([]);
      return;
    }

    if (trimmedCmd === '') {
      return;
    }

    // Add command to history
    const newCommand: TerminalCommand = {
      command: cmd,
      output: '',
      status: 'loading',
      timestamp: new Date(),
    };

    setCommands(prev => [...prev, newCommand]);

    // Simulate command execution
    setTimeout(() => {
      const commandHandler = availableCommands[trimmedCmd as keyof typeof availableCommands];

      if (commandHandler) {
        setCommands(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            output: commandHandler.output,
            status: commandHandler.status,
          };
          return updated;
        });
      } else {
        setCommands(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            output: `Command not found: ${cmd}\nType "help" for available commands.`,
            status: 'error',
          };
          return updated;
        });
      }
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle up arrow for command history (future enhancement)
    if (e.key === 'ArrowUp') {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-[#0d1117] border border-[#00ff41]/30 rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.2)]">
      {/* Terminal Header */}
      <div className="bg-[#161b22] border-b border-[#00ff41]/20 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Terminal size={14} className="text-[#00ff41]" />
          <span className="text-xs font-mono text-[#00ff41]">war-room-terminal</span>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="h-96 overflow-y-auto p-4 font-mono text-sm text-[#00ff41] bg-[#0d1117]"
        style={{
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        }}
      >
        <AnimatePresence>
          {commands.map((cmd, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              {/* Command Input */}
              <div className="flex items-start gap-2 mb-1">
                <span className="text-[#00ff41]/60">$</span>
                <span className="text-[#00ff41]">{cmd.command}</span>
              </div>

              {/* Command Output */}
              {cmd.status === 'loading' ? (
                <div className="flex items-center gap-2 text-[#00ff41]/60 ml-4">
                  <Loader size={14} className="animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className={`ml-4 whitespace-pre-wrap ${
                  cmd.status === 'error' ? 'text-red-400' : 'text-[#00ff41]/80'
                }`}>
                  {cmd.output}
                </div>
              )}

              {/* Status Icon */}
              {cmd.status !== 'loading' && (
                <div className="flex items-center gap-2 mt-1 ml-4">
                  {cmd.status === 'success' ? (
                    <CheckCircle size={12} className="text-green-400" />
                  ) : (
                    <XCircle size={12} className="text-red-400" />
                  )}
                  <span className="text-xs text-[#00ff41]/40">
                    {cmd.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
          <span className="text-[#00ff41]/60">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-none outline-none text-[#00ff41] font-mono text-sm"
            placeholder={isFocused ? '' : 'Type a command...'}
            autoComplete="off"
            spellCheck="false"
          />
          {isFocused && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-4 bg-[#00ff41]"
            />
          )}
        </form>
      </div>

      {/* Terminal Footer Hint */}
      <div className="bg-[#161b22] border-t border-[#00ff41]/20 px-4 py-2 text-xs text-[#00ff41]/60 font-mono">
        Type "help" for available commands • Press Enter to execute
      </div>
    </div>
  );
}

