import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { caseStudies } from '../../data/caseStudies';
import { PORTFOLIO_CONTEXT, findAnswer } from '../../data/ai-knowledge';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface PortfolioConciergeProps {
  className?: string;
}

/**
 * PortfolioConcierge
 * Global Marketing OS Assistant for Jacob Darling's portfolio
 * Answers questions about skills, rates, case studies, and more
 */
export const PortfolioConcierge: React.FC<PortfolioConciergeProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm Jacob's Marketing OS Assistant. I can answer questions about his skills, hourly rates, case studies, and more. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Portfolio knowledge base - using centralized ai-knowledge.ts
  const knowledgeBase = {
    skills: {
      frontend: PORTFOLIO_CONTEXT.skills.filter(s => ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'].some(tech => s.includes(tech))),
      backend: PORTFOLIO_CONTEXT.skills.filter(s => ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL', 'REST APIs'].some(tech => s.includes(tech))),
      devops: PORTFOLIO_CONTEXT.skills.filter(s => ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Vercel'].some(tech => s.includes(tech))),
      marketing: PORTFOLIO_CONTEXT.skills.filter(s => ['HubSpot', 'Salesforce', 'Marketo', 'SEO', 'Marketing Automation', 'Google Analytics'].some(tech => s.includes(tech))),
      design: PORTFOLIO_CONTEXT.skills.filter(s => ['Figma', 'UI/UX Design'].some(tech => s.includes(tech))),
    },
    experience: '15+ years',
    roles: ['Fractional CMO', 'Full-Stack Developer', 'Marketing Technologist', 'Systems Architect'],
    industries: ['SaaS', 'Healthcare', 'Legal Tech', 'E-commerce'],
    metrics: {
      projectsCompleted: '24+',
      clientSatisfaction: '98%',
      avgROI: '285%',
    },
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

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

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();

    // Try findAnswer helper first
    const quickAnswer = findAnswer(userMessage);
    if (quickAnswer) {
      return quickAnswer;
    }

    // Hourly rate questions (fallback to detailed response)
    if (lowerMessage.includes('rate') || lowerMessage.includes('hourly') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return `Jacob's consulting rate is typically **$150-200/hour for consulting, varies by project scope**. ${PORTFOLIO_CONTEXT.rates} Would you like to discuss a specific project?`;
    }

    // Skills questions
    if (lowerMessage.includes('react') || lowerMessage.includes('typescript') || lowerMessage.includes('skill')) {
      const skillCategory = lowerMessage.includes('frontend') || lowerMessage.includes('react')
        ? 'frontend'
        : lowerMessage.includes('backend') || lowerMessage.includes('node')
        ? 'backend'
        : lowerMessage.includes('devops') || lowerMessage.includes('aws')
        ? 'devops'
        : lowerMessage.includes('marketing') || lowerMessage.includes('hubspot')
        ? 'marketing'
        : lowerMessage.includes('design') || lowerMessage.includes('figma')
        ? 'design'
        : null;

      if (skillCategory) {
        return `Yes! Jacob is proficient in **${knowledgeBase.skills[skillCategory].join(', ')}**. He has ${knowledgeBase.experience} of experience building full-stack applications and marketing systems. Would you like to see specific case studies using these technologies?`;
      }
      return `Jacob has extensive experience across multiple technology stacks:\n\n**Frontend:** ${knowledgeBase.skills.frontend.join(', ')}\n**Backend:** ${knowledgeBase.skills.backend.join(', ')}\n**DevOps:** ${knowledgeBase.skills.devops.join(', ')}\n**Marketing:** ${knowledgeBase.skills.marketing.join(', ')}\n**Design:** ${knowledgeBase.skills.design.join(', ')}\n\nHe's a full-stack developer with strong marketing automation expertise.`;
    }

    // Case study questions
    if (lowerMessage.includes('launchpad') || lowerMessage.includes('case study') || lowerMessage.includes('project')) {
      const study = findCaseStudy(userMessage);
      if (study) {
        return `**${study.title}**\n\n${study.tagline}\n\n**Key Results:**\n${study.metrics.map(m => `• ${m.label}: ${m.value}`).join('\n')}\n\n**Challenge:** ${study.challenge.substring(0, 200)}...\n\nView the full case study at /case-studies/${study.slug}`;
      }
      return `Jacob has completed **${knowledgeBase.metrics.projectsCompleted}** projects. Some notable case studies include:\n\n• **The Launchpad** - 180% engagement increase, 92% conversion boost\n• **The Conductor** - 250% efficiency gain, 40 hrs/month saved\n• **The Fortress** - 98/100 security score, 100% incident reduction\n• **RBE Law** - 145% client acquisition increase, 320% ROI\n\nWould you like details on a specific case study?`;
    }

    // Experience/background questions
    if (lowerMessage.includes('experience') || lowerMessage.includes('years') || lowerMessage.includes('background')) {
      return `Jacob has **${knowledgeBase.experience}** of experience as a ${knowledgeBase.roles.join(', ')}. He's worked across industries including ${knowledgeBase.industries.join(', ')} and has completed ${knowledgeBase.metrics.projectsCompleted} projects with a ${knowledgeBase.metrics.clientSatisfaction} client satisfaction rate and average ROI of ${knowledgeBase.metrics.avgROI}.`;
    }

    // Contact questions (fallback)
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return PORTFOLIO_CONTEXT.contact;
    }

    // Availability questions (fallback)
    if (lowerMessage.includes('available') || lowerMessage.includes('hire') || lowerMessage.includes('opportunity')) {
      return PORTFOLIO_CONTEXT.availability;
    }

    // Default response
    return `I can help you learn about Jacob's skills, hourly rates, case studies, experience, and availability. Try asking:\n\n• "What is your hourly rate?"\n• "Do you know React?"\n• "Summarize the Launchpad case study"\n• "What's your experience?"\n• "How can I contact you?"`;
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = await generateResponse(userMessage.content);
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: response,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand-turquoise text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open Portfolio Concierge"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[calc(100vh-12rem)]">
              {/* Header */}
              <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <Sparkles className="w-4 h-4 text-brand-turquoise" />
                  <span className="text-sm font-semibold text-brand-text">Marketing OS Assistant</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-brand-muted hover:text-brand-text transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-brand-turquoise/20 text-brand-text border border-brand-turquoise/30'
                            : 'bg-slate-800/50 text-brand-text border border-slate-700/50'
                        }`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content.split('\n').map((line, idx) => {
                            // Simple markdown-like formatting
                            if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                              return (
                                <strong key={idx} className="text-brand-turquoise block my-1">
                                  {line.replace(/\*\*/g, '')}
                                </strong>
                              );
                            }
                            if (line.trim().startsWith('•')) {
                              const match = line.match(/^\s*•\s*\*\*(.*?)\*\*:\s*(.*)/);
                              if (match) {
                                const [, bold, rest] = match;
                                return (
                                  <div key={idx} className="ml-2 my-1">
                                    <strong className="text-brand-turquoise">{bold}</strong>: {rest}
                                  </div>
                                );
                              }
                              return (
                                <div key={idx} className="ml-2 my-1">
                                  {line}
                                </div>
                              );
                            }
                            return <p key={idx} className="my-1">{line || '\u00A0'}</p>;
                          })}
                        </div>
                        <span className="text-xs text-brand-muted mt-2 block">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-brand-turquoise animate-spin" />
                        <span className="text-sm text-brand-muted">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-slate-700/50">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about skills, rates, case studies..."
                    className="flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-brand-text placeholder-brand-muted focus:outline-none focus:border-brand-turquoise/50 transition-colors"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-4 py-2 bg-brand-turquoise text-white rounded-lg hover:bg-brand-turquoise-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioConcierge;
