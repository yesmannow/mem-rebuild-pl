import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Sparkles, ExternalLink, Code, Briefcase, Rocket, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  projectLinks?: ProjectLink[];
  skillHighlights?: SkillHighlight[];
  metrics?: Metric[];
}

interface ProjectLink {
  title: string;
  description: string;
  url: string;
  tags: string[];
  icon: React.ReactNode;
}

interface SkillHighlight {
  category: string;
  skills: string[];
  icon: React.ReactNode;
}

interface Metric {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface EnhancedPortfolioAssistantProps {
  className?: string;
}

// Knowledge base for intelligent responses
const knowledgeBase = {
  skills: {
    frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    backend: ['Node.js', 'Python', 'Express', 'FastAPI', 'REST APIs', 'GraphQL'],
    devops: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Vercel', 'Netlify'],
    marketing: ['HubSpot', 'Marketo', 'Salesforce', 'Google Analytics', 'SEO', 'Marketing Automation'],
    design: ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Brand Identity', 'Design Systems'],
  },
  projects: [
    {
      title: 'The Launchpad',
      description: 'Website redesign achieving 180% engagement increase',
      url: '/case-study/the-launchpad',
      tags: ['Web Development', 'UX Design', 'Performance'],
      metrics: { engagement: '+180%', conversion: '+92%' },
    },
    {
      title: 'The Conductor',
      description: 'Marketing automation platform for efficiency',
      url: '/case-study/the-conductor',
      tags: ['Automation', 'Marketing Tech', 'Integration'],
      metrics: { efficiency: '+250%', timeSaved: '40 hrs/mo' },
    },
    {
      title: 'The Fortress',
      description: 'Cybersecurity infrastructure overhaul',
      url: '/case-study/the-fortress',
      tags: ['Security', 'Infrastructure', 'Compliance'],
      metrics: { securityScore: '98/100', incidents: '-100%' },
    },
  ],
  experience: {
    years: '15+',
    roles: ['Fractional CMO', 'Full-Stack Developer', 'Marketing Technologist', 'Systems Architect'],
    industries: ['SaaS', 'Healthcare', 'Legal Tech', 'E-commerce'],
  },
  metrics: {
    projectsCompleted: '24+',
    clientSatisfaction: '98%',
    avgROI: '285%',
    technologiesUsed: '50+',
  },
};

const EnhancedPortfolioAssistant: React.FC<EnhancedPortfolioAssistantProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '👋 Hi! I\'m Jacob\'s AI Portfolio Assistant. I can help you explore his work, skills, and experience. What would you like to know?',
      timestamp: new Date(),
      suggestions: [
        'Show me recent projects',
        'What are Jacob\'s technical skills?',
        'Tell me about his experience',
        'How can I get in touch?',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Intelligent response generation
  const generateResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: '',
      timestamp: new Date(),
    };

    // Projects/Portfolio queries
    if (lowerInput.match(/project|portfolio|work|case study|example/i)) {
      botMessage.content = '🚀 Here are some featured projects that showcase Jacob\'s capabilities:';
      botMessage.projectLinks = knowledgeBase.projects.map(p => ({
        ...p,
        icon: <Rocket size={16} />,
      }));
      botMessage.suggestions = ['Tell me more about The Launchpad', 'What technologies were used?', 'Show me more projects'];
    }
    // Skills queries
    else if (lowerInput.match(/skill|technology|tech stack|expertise|tools/i)) {
      const categories: SkillHighlight[] = [];
      
      if (lowerInput.match(/frontend|react|ui|design/i) || !lowerInput.match(/backend|devops|marketing/i)) {
        categories.push({
          category: 'Frontend Development',
          skills: knowledgeBase.skills.frontend,
          icon: <Code size={16} />,
        });
      }
      if (lowerInput.match(/backend|api|server|node/i)) {
        categories.push({
          category: 'Backend Development',
          skills: knowledgeBase.skills.backend,
          icon: <Code size={16} />,
        });
      }
      if (lowerInput.match(/devops|deploy|cloud|aws|docker/i)) {
        categories.push({
          category: 'DevOps & Infrastructure',
          skills: knowledgeBase.skills.devops,
          icon: <Code size={16} />,
        });
      }
      if (lowerInput.match(/marketing|automation|hubspot|crm/i)) {
        categories.push({
          category: 'Marketing Technology',
          skills: knowledgeBase.skills.marketing,
          icon: <TrendingUp size={16} />,
        });
      }
      
      if (categories.length === 0) {
        // Show all categories
        categories.push(
          { category: 'Frontend', skills: knowledgeBase.skills.frontend, icon: <Code size={16} /> },
          { category: 'Backend', skills: knowledgeBase.skills.backend, icon: <Code size={16} /> },
          { category: 'Marketing Tech', skills: knowledgeBase.skills.marketing, icon: <TrendingUp size={16} /> }
        );
      }

      botMessage.content = '💡 Here\'s an overview of Jacob\'s technical expertise:';
      botMessage.skillHighlights = categories;
      botMessage.suggestions = ['Show me projects using React', 'What about marketing automation?', 'Tell me about his experience'];
    }
    // Experience queries
    else if (lowerInput.match(/experience|background|career|history|resume|about/i)) {
      botMessage.content = `📊 Jacob brings ${knowledgeBase.experience.years} years of experience across multiple disciplines:\n\n${knowledgeBase.experience.roles.join(' • ')}\n\nHe's worked with companies in ${knowledgeBase.experience.industries.join(', ')}.`;
      botMessage.metrics = [
        { label: 'Years Experience', value: knowledgeBase.experience.years, icon: <Briefcase size={16} /> },
        { label: 'Projects Completed', value: knowledgeBase.metrics.projectsCompleted, icon: <Rocket size={16} /> },
        { label: 'Client Satisfaction', value: knowledgeBase.metrics.clientSatisfaction, icon: <Award size={16} /> },
        { label: 'Average ROI', value: knowledgeBase.metrics.avgROI, icon: <TrendingUp size={16} /> },
      ];
      botMessage.suggestions = ['View full resume', 'See case studies', 'What technologies does he use?'];
    }
    // Contact queries
    else if (lowerInput.match(/contact|hire|email|reach|connect|consult/i)) {
      botMessage.content = '📧 Ready to connect? Jacob is available for:\n\n• Consulting engagements\n• Full-time opportunities\n• Speaking & workshops\n\nYou can reach out via the contact form or email directly.';
      botMessage.projectLinks = [
        {
          title: 'Contact Form',
          description: 'Send a message directly',
          url: '/contact',
          tags: ['Quick Response'],
          icon: <Send size={16} />,
        },
        {
          title: 'Email',
          description: 'hoosierdarling@gmail.com',
          url: 'mailto:hoosierdarling@gmail.com',
          tags: ['Direct Contact'],
          icon: <ExternalLink size={16} />,
        },
      ];
      botMessage.suggestions = ['View services', 'See availability', 'Schedule a call'];
    }
    // Specific project queries
    else if (lowerInput.match(/launchpad|conductor|fortress/i)) {
      const project = knowledgeBase.projects.find(p => 
        lowerInput.includes(p.title.toLowerCase())
      );
      if (project) {
        botMessage.content = `🎯 ${project.title}: ${project.description}\n\nKey Results:\n${Object.entries(project.metrics).map(([k, v]) => `• ${k}: ${v}`).join('\n')}`;
        botMessage.projectLinks = [{
          ...project,
          icon: <Rocket size={16} />,
        }];
        botMessage.suggestions = ['Show me more projects', 'What technologies were used?', 'How can I work with Jacob?'];
      }
    }
    // Default/fallback
    else {
      botMessage.content = 'I can help you learn about Jacob\'s work! Try asking about:';
      botMessage.suggestions = [
        'Recent projects and case studies',
        'Technical skills and expertise',
        'Professional experience',
        'How to get in touch',
      ];
    }

    return botMessage;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking time
    await new Promise(resolve => setTimeout(resolve, 800));

    const botResponse = generateResponse(inputValue);
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    // Auto-send after a brief delay
    setTimeout(() => {
      const event = new KeyboardEvent('keypress', { key: 'Enter' });
      inputRef.current?.dispatchEvent(event);
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-brand-teal to-brand-primary-dark text-white shadow-2xl flex items-center justify-center group ${className}`}
            aria-label="Open Portfolio AI Assistant"
          >
            <MessageCircle className="w-7 h-7" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md h-[600px] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl bg-slate-900/98 border border-brand-teal/20"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-brand-teal to-brand-primary-dark p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Portfolio Assistant</h3>
                  <p className="text-white/70 text-xs">Powered by AI</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.type === 'user'
                        ? 'bg-brand-teal text-white'
                        : 'bg-slate-800 text-white'
                    } rounded-2xl p-3 shadow-md`}
                  >
                    {message.type === 'bot' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-brand-accent" />
                        <span className="text-xs font-medium text-brand-accent">AI Assistant</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>

                    {/* Project Links */}
                    {message.projectLinks && message.projectLinks.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-2"
                      >
                        {message.projectLinks.map((project, idx) => (
                          <Link
                            key={idx}
                            to={project.url}
                            className="block p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-brand-teal/20 hover:border-brand-teal/40 transition-all group"
                          >
                            <div className="flex items-start gap-2">
                              <div className="text-brand-teal mt-0.5">{project.icon}</div>
                              <div className="flex-1">
                                <p className="font-semibold text-sm text-white group-hover:text-brand-teal transition-colors">
                                  {project.title}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {project.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-brand-teal/10 text-brand-teal text-xs rounded-full">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}

                    {/* Skill Highlights */}
                    {message.skillHighlights && message.skillHighlights.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-3"
                      >
                        {message.skillHighlights.map((category, idx) => (
                          <div key={idx} className="p-3 bg-slate-700/50 rounded-lg border border-brand-teal/20">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-brand-teal">{category.icon}</div>
                              <p className="font-semibold text-sm text-white">{category.category}</p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {category.skills.map((skill, i) => (
                                <span key={i} className="px-2 py-1 bg-brand-teal/10 text-brand-teal text-xs rounded-md">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Metrics */}
                    {message.metrics && message.metrics.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 grid grid-cols-2 gap-2"
                      >
                        {message.metrics.map((metric, idx) => (
                          <div key={idx} className="p-2 bg-slate-700/50 rounded-lg border border-brand-teal/20 text-center">
                            <div className="flex justify-center text-brand-teal mb-1">{metric.icon}</div>
                            <p className="text-xs text-slate-400">{metric.label}</p>
                            <p className="text-sm font-bold text-brand-teal">{metric.value}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 flex flex-wrap gap-2"
                      >
                        {message.suggestions.map((suggestion, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-3 py-1.5 bg-slate-700/50 hover:bg-brand-teal/20 text-slate-300 hover:text-brand-teal text-xs rounded-full border border-slate-600 hover:border-brand-teal/40 transition-all"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-800 rounded-2xl p-3 shadow-md">
                    <div className="flex gap-1">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-brand-teal rounded-full"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/95 backdrop-blur-sm border-t border-brand-teal/20">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about projects, skills, or experience..."
                  className="flex-1 p-3 text-sm rounded-xl border border-brand-teal/20 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-3 bg-gradient-to-br from-brand-teal to-brand-primary-dark text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedPortfolioAssistant;
