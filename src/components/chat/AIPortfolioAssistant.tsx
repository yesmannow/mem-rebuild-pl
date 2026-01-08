import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Sparkles, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getChatCompletion, generateSuggestions, extractProjectLinks } from '../../utils/openai';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  projectLinks?: Array<{ title: string; url: string }>;
}

interface AIPortfolioAssistantProps {
  className?: string;
}

const AIPortfolioAssistant: React.FC<AIPortfolioAssistantProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '👋 Hi! I\'m Jacob\'s AI Portfolio Assistant. I can help you explore his work, skills, and experience. What would you like to know?',
      timestamp: new Date(),
      suggestions: [
        'Show me recent projects',
        'What are your technical skills?',
        'Tell me about your experience',
        'How can I get in touch?',
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Add to conversation history
      const newHistory = [
        ...conversationHistory,
        { role: 'user' as const, content: userInput },
      ];

      // Get AI response
      const aiResponse = await getChatCompletion(newHistory);

      // Update conversation history
      setConversationHistory([
        ...newHistory,
        { role: 'assistant' as const, content: aiResponse },
      ]);

      // Create bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: aiResponse,
        timestamp: new Date(),
        suggestions: generateSuggestions(aiResponse),
        projectLinks: extractProjectLinks(aiResponse),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again, or feel free to contact Jacob directly at hoosierdarling@gmail.com.',
        timestamp: new Date(),
        suggestions: ['Try again', 'View contact page', 'See portfolio'],
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => {
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
      {/* Chat Button */}
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
            aria-label="Open AI Portfolio Assistant"
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

      {/* Chat Window */}
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
                  <h3 className="text-white font-semibold">AI Portfolio Assistant</h3>
                  <p className="text-white/70 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Powered by GPT-4
                  </p>
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
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-brand-teal/20 hover:border-brand-teal/40 transition-all group"
                          >
                            <ExternalLink className="w-4 h-4 text-brand-teal flex-shrink-0" />
                            <span className="text-sm text-white group-hover:text-brand-teal transition-colors">
                              {project.title}
                            </span>
                          </Link>
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

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-800 rounded-2xl p-3 shadow-md flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-brand-teal animate-spin" />
                    <span className="text-xs text-slate-400">Thinking...</span>
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
                  disabled={isTyping}
                  className="flex-1 p-3 text-sm rounded-xl border border-brand-teal/20 bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-teal disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
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

export default AIPortfolioAssistant;
