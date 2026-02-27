import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import { useSystemStore } from '../../store/useSystemStore';

interface TerminalLine {
  text: string;
  type: 'output' | 'input' | 'command';
  timestamp?: string;
}

const bootSequence = [
  '> Initializing Portfolio v2.0...',
  '> Connecting to GitHub API... [OK]',
  '> Loading Skills Database... [OK]',
  '> Scanning for active projects... [OK]',
  '> Welcome, User.',
  '',
  'Type "help" for available commands.',
];

const commands = {
  help: [
    'Available commands:',
    '  help                    - Show this help message',
    '  contact                 - Display contact information',
    '  skills                  - List technical skills',
    '  clear                   - Clear terminal screen',
    '  about                   - Show about information',
    '  status                  - System health report',
    '  mount [module]          - Activate a module by id',
    '  generate brand [name]   - Launch the brand builder',
  ],
  contact: [
    'Contact Information:',
    '  Email: jacob@jdarling.com',
    '  LinkedIn: linkedin.com/in/jacobdarling',
    '  GitHub: github.com/JdarlingGT',
    '  Portfolio: jdarling.com',
  ],
  skills: [
    'Technical Skills:',
    '  Frontend: React, TypeScript, Next.js, Tailwind CSS',
    '  Backend: Node.js, Python, PostgreSQL, MongoDB',
    '  Cloud: AWS, Azure, Vercel, Docker, Kubernetes',
    '  Tools: Git, Figma, HubSpot, Marketo, Salesforce',
  ],
  about: [
    'About Jacob Darling:',
    '  Marketing Strategist & Systems Architect',
    '  15+ years building revenue-driving marketing infrastructure',
    '  Full-stack developer specializing in MarTech',
    '  Transforming marketing challenges into measurable results',
  ],
  clear: [],
};

export const LiveTerminal: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [localLines, setLocalLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { terminalHistory, isBooting, isProcessing, runCommand, pushHistory, setBooting } = useSystemStore();

  // Sync store terminalHistory into local display lines
  useEffect(() => {
    setLocalLines(
      terminalHistory.map((text) => ({
        text,
        type: text.startsWith('> EXEC:') ? ('command' as const) : ('output' as const),
      }))
    );
  }, [terminalHistory]);

  // Boot sequence on mount
  useEffect(() => {
    let index = 0;
    const bootInterval = setInterval(() => {
      if (index < bootSequence.length) {
        pushHistory(bootSequence[index]);
        index++;
      } else {
        setBooting(false);
        clearInterval(bootInterval);
      }
    }, 800);

    return () => clearInterval(bootInterval);
  }, []);

  // Handle command execution
  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    if (command === 'clear') {
      setLocalLines([]);
      return;
    }

    // Route store-kernel commands (status / mount / generate brand)
    if (
      command === 'status' ||
      command.startsWith('mount ') ||
      command.startsWith('generate brand')
    ) {
      runCommand(cmd);
      return;
    }

    // Add user input as a display line
    setLocalLines((prev) => [...prev, { text: `> ${cmd}`, type: 'input' }]);

    // Execute local commands
    if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands];
      output.forEach((line) => {
        setLocalLines((prev) => [...prev, { text: line, type: 'output' }]);
      });
    } else if (command) {
      setLocalLines((prev) => [
        ...prev,
        { text: `Command not found: ${command}. Type "help" for available commands.`, type: 'output' },
      ]);
    }
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
    }
  };

  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('input, button')) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Auto-focus input when not booting
  useEffect(() => {
    if (!isBooting && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBooting, isMinimized]);

  // Auto-scroll to bottom when content changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [localLines, isBooting]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={terminalRef}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-10 right-10 z-50 w-80 h-64 bg-slate-950/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl overflow-hidden"
      style={{
        x: position.x,
        y: position.y,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-b border-slate-700 cursor-move">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-mono text-brand-muted ml-2">terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
            aria-label={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? (
              <Maximize2 size={14} className="text-brand-muted" />
            ) : (
              <Minimize2 size={14} className="text-brand-muted" />
            )}
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
            aria-label="Close"
          >
            <X size={14} className="text-brand-muted" />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="h-[calc(100%-40px)] flex flex-col overflow-hidden"
          >
            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 font-mono text-xs text-green-400 space-y-1">
              {localLines.map((line, index) => (
                <div
                  key={index}
                  className={
                    line.type === 'input'
                      ? 'text-brand-teal'
                      : line.type === 'command'
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }
                >
                  {line.text}
                </div>
              ))}
              {isBooting && (
                <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
              )}

              {/* Input Area - inside scrollable container */}
              {!isBooting && (
                <form onSubmit={handleSubmit} className="border-t border-slate-700 p-2 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-brand-teal">
                      {isProcessing ? '⟳' : '$'}
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      className="flex-1 bg-transparent text-xs font-mono text-green-400 outline-none disabled:opacity-50"
                      placeholder={isProcessing ? 'Processing...' : 'Type a command...'}
                      autoComplete="off"
                      disabled={isProcessing}
                    />
                  </div>
                </form>
              )}

              {/* Scroll anchor - immediately after input form */}
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LiveTerminal;
