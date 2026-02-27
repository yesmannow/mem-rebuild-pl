import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { findAnswer } from '../../data/ai-knowledge';

interface Message {
  role: 'user' | 'bot';
  text: string;
  action?: () => void;
  actionLabel?: string;
}

interface PortfolioConciergeProps {
  className?: string;
}

/**
 * PortfolioConcierge - System AI Assistant
 * Context-aware, data-driven Marketing OS Assistant
 */
export const PortfolioConcierge: React.FC<PortfolioConciergeProps> = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getContextualGreeting = useCallback((): string => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/resume')) return 'Marketing OS initialized.\n\nAnalyzing professional history. Ask about roles or skills.';
    if (path.includes('/apps') || path.includes('/tools')) return 'Marketing OS initialized.\n\nI can help you find the right tool. What problem are you solving?';
    if (path.includes('/case-studies') || path.includes('/case')) return 'Marketing OS initialized.\n\nAccessing case study database. Which project would you like to explore?';
    return 'Marketing OS initialized.\n\nI have access to Resume, Apps, and Case Studies. What would you like to know?';
  }, [location.pathname]);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: getContextualGreeting() },
  ]);

  useEffect(() => {
    if (isOpen && messages.length === 1) {
      setMessages([{ role: 'bot', text: getContextualGreeting() }]);
    }
  }, [isOpen, messages.length, getContextualGreeting]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const getContextualPrompts = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/resume')) return [{ text: 'What is your tech stack?', label: 'Tech Stack' }, { text: 'Show me your experience', label: 'Experience' }];
    if (path.includes('/apps')) return [{ text: 'Show me all apps', label: 'All Apps' }, { text: 'Find me a pricing tool', label: 'Pricing' }];
    return [{ text: 'What is your tech stack?', label: 'Tech Stack' }, { text: 'Show me ROI projects', label: 'ROI Projects' }];
  };

  const presetPrompts = getContextualPrompts();

  const handleCommand = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('resume')) return { action: () => navigate('/resume'), actionLabel: 'Navigate to Resume' };
    if (lowerMessage.includes('contact')) return { action: () => navigate('/contact'), actionLabel: 'Navigate to Contact' };
    if (lowerMessage.includes('apps')) return { action: () => navigate('/apps'), actionLabel: 'Navigate to Apps' };
    return null;
  };

  const generateResponse = (userMessage: string): Message => {
    const quickAnswer = findAnswer(userMessage);
    const cmd = handleCommand(userMessage);
    if (quickAnswer) return { role: 'bot', text: quickAnswer, action: cmd?.action, actionLabel: cmd?.actionLabel };

    return {
      role: 'bot',
      text: `I can help you explore Jacob's work. Try asking about his "tech stack" or "experience".`,
    };
  };

  const handleSend = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInputValue('');
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessages(prev => [...prev, generateResponse(text)]);
    setIsTyping(false);
  };

  return (
    <div className={`portfolio-concierge ${className}`}>
      <motion.button
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-14 w-14 rounded-full bg-cyan-400 text-black shadow-lg z-50 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Terminal className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 left-4 md:bottom-20 md:right-6 md:left-auto w-auto md:w-[400px] z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-white/5">
                <h3 className="text-sm font-semibold text-cyan-400 flex items-center gap-2 font-mono">
                  <Terminal className="w-4 h-4" />
                  <span>Marketing OS</span>
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 min-h-[200px] font-mono">
                {messages.map((m, i) => (
                  <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2 rounded-xl text-sm ${m.role === 'user' ? 'bg-cyan-400/20 text-cyan-400' : 'bg-white/5 text-white/90 border border-white/10'}`}>
                      {m.text}
                      {m.action && (
                        <button onClick={m.action} className="mt-2 block text-xs underline">{m.actionLabel}</button>
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && <div className="text-xs text-cyan-400 animate-pulse">Processing...</div>}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 border-t border-white/10 bg-white/5">
                <div className="flex flex-wrap gap-2 mb-3">
                  {presetPrompts.map((p, i) => (
                    <button key={i} onClick={() => handleSend(p.text)} className="text-[10px] px-2 py-1 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">{p.label}</button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder="Query system..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  <button onClick={() => handleSend()} className="p-2 bg-cyan-400 text-black rounded-lg"><Send size={16} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioConcierge;
