import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Terminal, Command } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { findAnswer } from '../../data/ai-knowledge';
import { caseStudies } from '../../data/caseStudies';
import { resumeData } from '../../data/resumeData';
import { applications } from '../../data/applications';

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
 * Features:
 * - Knowledge base injection (RAG-Lite) from resume, apps, case studies
 * - Context awareness based on current route
 * - Command & control for navigation
 * - Terminal/system aesthetic UI
 */
export const PortfolioConcierge: React.FC<PortfolioConciergeProps> = ({ className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get context-aware initial message based on route
  const getContextualGreeting = (): string => {
    const path = location.pathname.toLowerCase();

    if (path.includes('/resume')) {
      return 'Marketing OS v2.0 initialized.\n\nReady to analyze professional history. Ask about specific roles, skills, or experience.';
    }
    if (path.includes('/apps') || path.includes('/tools')) {
      return 'Marketing OS v2.0 initialized.\n\nI can help you find the right tool. What problem are you solving?';
    }
    if (path.includes('/case-studies') || path.includes('/case')) {
      return 'Marketing OS v2.0 initialized.\n\nAccessing case study database. Which project would you like to explore?';
    }
    if (path.includes('/contact')) {
      return 'Marketing OS v2.0 initialized.\n\nReady to initialize communication protocols. How can I help you connect?';
    }

    return 'Marketing OS v2.0 initialized.\n\nYou are querying the Operating System of Jacob\'s portfolio. I have access to Resume, Apps, and Case Studies data.\n\nWhat would you like to know?';
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: getContextualGreeting(),
    },
  ]);

  // Update greeting when route changes and chat is open
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      setMessages([{
        role: 'bot',
        text: getContextualGreeting(),
      }]);
    }
  }, [location.pathname, isOpen]);

  // Auto-scroll to bottom when messages change or typing indicator appears
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Get context-aware preset prompts
  const getContextualPrompts = () => {
    const path = location.pathname.toLowerCase();

    if (path.includes('/resume')) {
      return [
        { text: 'What is your tech stack?', label: 'Tech Stack' },
        { text: 'Show me your experience', label: 'Experience' },
        { text: 'What are your core competencies?', label: 'Skills' },
      ];
    }
    if (path.includes('/apps') || path.includes('/tools')) {
      return [
        { text: 'Show me all apps', label: 'All Apps' },
        { text: 'What tools do you have?', label: 'Tools' },
        { text: 'Find me a pricing tool', label: 'Pricing' },
      ];
    }
    if (path.includes('/case-studies') || path.includes('/case')) {
      return [
        { text: 'Show me ROI projects', label: 'ROI Projects' },
        { text: 'Tell me about The Launchpad', label: 'Launchpad' },
        { text: 'What are your best results?', label: 'Results' },
      ];
    }

    return [
      { text: 'What is your tech stack?', label: 'Tech Stack' },
      { text: 'Show me ROI projects', label: 'ROI Projects' },
      { text: 'Navigate to resume', label: 'Resume' },
    ];
  };

  const presetPrompts = getContextualPrompts();

  // Find case study
  const findCaseStudy = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return caseStudies.find(
      study =>
        study.title.toLowerCase().includes(lowerQuery) ||
        study.slug.toLowerCase().includes(lowerQuery) ||
        study.tagline.toLowerCase().includes(lowerQuery) ||
        study.category.some(cat => cat.toLowerCase().includes(lowerQuery))
    );
  };

  // Find application
  const findApplication = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return applications.find(
      app =>
        app.title.toLowerCase().includes(lowerQuery) ||
        app.tagline.toLowerCase().includes(lowerQuery) ||
        app.category.some(cat => cat.toLowerCase().includes(lowerQuery)) ||
        app.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  };

  // Command & Control - Handle navigation commands
  const handleCommand = (userMessage: string): { action?: () => void; actionLabel?: string } | null => {
    const lowerMessage = userMessage.toLowerCase();

    // Navigation commands
    if (lowerMessage.match(/\b(resume|cv|curriculum)\b/)) {
      return {
        action: () => navigate('/resume'),
        actionLabel: 'Navigate to Resume',
      };
    }
    if (lowerMessage.match(/\b(contact|email|reach|connect)\b/)) {
      return {
        action: () => navigate('/contact'),
        actionLabel: 'Navigate to Contact',
      };
    }
    if (lowerMessage.match(/\b(home|start|index)\b/)) {
      return {
        action: () => navigate('/'),
        actionLabel: 'Navigate to Home',
      };
    }
    if (lowerMessage.match(/\b(apps|tools|applications)\b/)) {
      return {
        action: () => navigate('/apps'),
        actionLabel: 'Navigate to Apps',
      };
    }
    if (lowerMessage.match(/\b(case studies|projects|portfolio)\b/)) {
      return {
        action: () => navigate('/case-studies'),
        actionLabel: 'Navigate to Case Studies',
      };
    }

    return null;
  };

  // Enhanced response generation with actual data
  const generateResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    const command = handleCommand(userMessage);

    // Try findAnswer helper first
    const quickAnswer = findAnswer(userMessage);
    if (quickAnswer) {
      return {
        role: 'bot',
        text: quickAnswer,
        action: command?.action,
        actionLabel: command?.actionLabel,
      };
    }

    // Resume/Experience queries
    if (lowerMessage.match(/\b(resume|experience|background|career|history|roles|positions)\b/)) {
      const experienceList = resumeData.experience.map(exp =>
        `• **${exp.role}** at ${exp.company} (${exp.period})\n  ${exp.stack}\n  ${exp.bullets[0]}`
      ).join('\n\n');

      return {
        role: 'bot',
        text: `**Professional Experience:**\n\n${experienceList}\n\n**Core Competencies:**\n${resumeData.coreCompetencies.join(' • ')}\n\n**Summary:**\n${resumeData.summary}`,
        action: command?.action || (() => navigate('/resume')),
        actionLabel: command?.actionLabel || 'View Full Resume',
      };
    }

    // Skills/Tech Stack queries
    if (lowerMessage.match(/\b(skills|tech stack|technologies|tools|expertise|competencies)\b/)) {
      const allTech = new Set<string>();
      resumeData.experience.forEach(exp => {
        exp.stack.split(',').forEach(tech => allTech.add(tech.trim()));
      });
      const techList = Array.from(allTech).slice(0, 15).join(' • ');

      return {
        role: 'bot',
        text: `**Core Competencies:**\n${resumeData.coreCompetencies.join(' • ')}\n\n**Technical Stack:**\n${techList}\n\n**Experience:** ${resumeData.experience[0].period.split('–')[0]} - Present`,
      };
    }

    // Case study queries
    if (lowerMessage.match(/\b(case study|project|launchpad|conductor|fortress|roi|results|metrics)\b/)) {
      const study = findCaseStudy(userMessage);
      if (study) {
        return {
          role: 'bot',
          text: `**${study.title}**\n\n${study.tagline}\n\n**Key Results:**\n${study.metrics.map(m => `• ${m.label}: ${m.value}`).join('\n')}\n\n**Challenge:** ${study.challenge.substring(0, 200)}...\n\n**Strategy:** ${study.strategy.substring(0, 200)}...`,
          action: () => navigate(`/case-studies/${study.slug}`),
          actionLabel: 'View Full Case Study',
        };
      }

      // List top case studies
      const topStudies = caseStudies.slice(0, 4).map(s =>
        `• **${s.title}** - ${s.metrics[0]?.value || 'See results'}`
      ).join('\n');

      return {
        role: 'bot',
        text: `**Featured Case Studies:**\n\n${topStudies}\n\nWould you like details on a specific project?`,
        action: () => navigate('/case-studies'),
        actionLabel: 'Browse All Case Studies',
      };
    }

    // Application/Tool queries
    if (lowerMessage.match(/\b(app|tool|application|software|utility)\b/)) {
      const app = findApplication(userMessage);
      if (app) {
        return {
          role: 'bot',
          text: `**${app.title}**\n\n${app.tagline}\n\n**Overview:**\n${app.overview.substring(0, 200)}...\n\n**Tech Stack:**\n${app.technicalDetails.techStack.slice(0, 5).join(' • ')}`,
          action: () => navigate(`/apps/${app.id}`),
          actionLabel: 'View Application',
        };
      }

      // List categories
      const categories = new Set<string>();
      applications.forEach(app => app.category.forEach(cat => categories.add(cat)));
      const categoryList = Array.from(categories).slice(0, 6).join(' • ');

      return {
        role: 'bot',
        text: `**Available Applications:**\n\nI have access to ${applications.length} applications across these categories:\n${categoryList}\n\nWhat type of tool are you looking for?`,
        action: () => navigate('/apps'),
        actionLabel: 'Browse All Apps',
      };
    }

    // Education queries
    if (lowerMessage.match(/\b(education|degree|university|school|college)\b/)) {
      return {
        role: 'bot',
        text: `**Education:**\n\n${resumeData.education.degree}\n${resumeData.education.school}\n${resumeData.education.year}`,
      };
    }

    // Default response with suggestions
    return {
      role: 'bot',
      text: `I can help you explore:\n\n• **Resume & Experience** - Ask about roles, skills, or background\n• **Case Studies** - Query specific projects or ROI results\n• **Applications** - Find tools and utilities\n• **Navigation** - Say "resume", "contact", or "apps" to navigate\n\nWhat would you like to know?`,
    };
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      text: textToSend,
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking delay (1.2 seconds)
    await new Promise(resolve => setTimeout(resolve, 1200));

    // Generate bot response with potential action
    const botResponse = generateResponse(textToSend);
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handlePresetClick = (prompt: string) => {
    handleSend(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`portfolio-concierge ${className}`}>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 h-14 w-14 rounded-full bg-gradient-to-br from-brand-turquoise to-brand-turquoise-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close Marketing OS' : 'Open Marketing OS'}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Terminal className="w-6 h-6 animate-pulse" />
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 left-4 md:bottom-20 md:right-6 md:left-auto w-auto md:w-[400px] z-50 max-w-[calc(100vw-2rem)] md:max-w-none"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="glass-panel rounded-xl overflow-hidden shadow-2xl flex flex-col bg-slate-900/95 backdrop-blur-md border border-white/10">
              {/* Header */}
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-slate-800">
                <h3 className="text-sm font-semibold text-brand-text flex items-center gap-2 font-mono">
                  <Terminal className="w-4 h-4 text-brand-turquoise" />
                  <span className="text-brand-turquoise">Marketing OS</span>
                  <span className="text-brand-muted text-xs">v2.0</span>
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-brand-muted hover:text-brand-text transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Body - Scrollable with Terminal Style */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96 min-h-[200px] bg-slate-900/50 font-mono">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    {/* User messages - Terminal prompt style */}
                    {message.role === 'user' && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-brand-turquoise text-xs">$</span>
                        <span className="text-slate-400 text-xs">{'>'}</span>
                        <span className="text-brand-text text-sm">{message.text}</span>
                      </div>
                    )}

                    {/* Bot messages - System output style */}
                    {message.role === 'bot' && (
                      <div className="w-full">
                        <div className="bg-slate-800/80 text-brand-text border border-slate-700/50 rounded-lg px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap">
                          <p className="text-white">{message.text}</p>

                          {/* Action button if available */}
                          {message.action && message.actionLabel && (
                            <button
                              onClick={message.action}
                              className="mt-3 px-3 py-1.5 bg-brand-turquoise/20 hover:bg-brand-turquoise/30 text-brand-turquoise border border-brand-turquoise/50 rounded text-xs transition-all flex items-center gap-2"
                            >
                              <Command className="w-3 h-3" />
                              {message.actionLabel}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing Indicator - Terminal style */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-800/80 rounded-lg px-4 py-3 border border-slate-700/50">
                      <div className="flex items-center gap-2">
                        <span className="text-brand-turquoise text-xs">Processing</span>
                        <div className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-brand-turquoise rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-1.5 h-1.5 bg-brand-turquoise rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-1.5 h-1.5 bg-brand-turquoise rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Context-Aware Quick Prompts */}
              <div className="px-4 pt-3 pb-2 border-t border-white/10 bg-slate-800/30">
                <p className="text-xs text-brand-muted mb-2 uppercase tracking-wider font-mono">Quick Commands</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {presetPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePresetClick(prompt.text)}
                      disabled={isTyping}
                      className="px-3 py-1.5 text-xs rounded-lg bg-slate-900/50 hover:bg-slate-800/50 border border-slate-700/50 hover:border-brand-turquoise/50 text-brand-text transition-all disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area - Terminal style */}
              <div className="px-4 pb-3 border-t border-white/10 bg-slate-800/30">
                <div className="flex gap-2 items-center">
                  <span className="text-brand-turquoise text-sm font-mono">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Query the system..."
                    disabled={isTyping}
                    className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-sm text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-turquoise/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-3 py-2 bg-brand-turquoise text-white rounded-lg hover:bg-brand-turquoise-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
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
