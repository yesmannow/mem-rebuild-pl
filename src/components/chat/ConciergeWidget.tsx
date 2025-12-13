import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, MessageCircle, Sparkles } from 'lucide-react';
import { attorneys } from '../../data/attorneys';
import { newsArticles } from '../../data/newsArticles';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestedAttorney?: typeof attorneys[0];
  relatedArticles?: typeof newsArticles;
}

interface ConciergeWidgetProps {
  className?: string;
}

const ConciergeWidget: React.FC<ConciergeWidgetProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your RBE Law AI Concierge. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
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

  const findMatchingAttorneys = (text: string): typeof attorneys => {
    const lowerText = text.toLowerCase();
    return attorneys.filter(attorney => {
      const practiceMatch = attorney.practiceAreas.some(area =>
        lowerText.includes(area.toLowerCase())
      );
      const industryMatch = attorney.industries.some(industry =>
        lowerText.includes(industry.toLowerCase())
      );
      return practiceMatch || industryMatch;
    });
  };

  const findRelatedArticles = (text: string): typeof newsArticles => {
    const lowerText = text.toLowerCase();
    return newsArticles.filter(article => {
      const categoryMatch = article.categories.some(cat =>
        lowerText.includes(cat.toLowerCase())
      );
      const industryMatch = article.industries.some(ind =>
        lowerText.includes(ind.toLowerCase())
      );
      const titleMatch = article.title.toLowerCase().includes(lowerText);
      return categoryMatch || industryMatch || titleMatch;
    }).slice(0, 3);
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

    await new Promise(resolve => setTimeout(resolve, 1000));

    const matchingAttorneys = findMatchingAttorneys(inputValue);
    const relatedArticles = findRelatedArticles(inputValue);

    let botResponse = '';
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: '',
      timestamp: new Date(),
    };

    if (matchingAttorneys.length > 0) {
      botResponse = `I found ${matchingAttorneys.length} attorney${matchingAttorneys.length > 1 ? 's' : ''} who can help with your needs. `;
      botMessage.suggestedAttorney = matchingAttorneys[0];
    }

    if (relatedArticles.length > 0) {
      if (botResponse) {
        botResponse += `\n\nI also found ${relatedArticles.length} related article${relatedArticles.length > 1 ? 's' : ''} that might interest you.`;
      } else {
        botResponse = `I found ${relatedArticles.length} article${relatedArticles.length > 1 ? 's' : ''} related to your query.`;
      }
      botMessage.relatedArticles = relatedArticles;
    }

    if (!botResponse) {
      botResponse = 'I\'d be happy to help you find the right attorney. Could you tell me more about your legal needs? Are you looking for help with business law, litigation, construction, healthcare, or something else?';
    }

    botMessage.content = botResponse;
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);

    if (messages.filter(m => m.type === 'user').length >= 2 && !showLeadForm) {
      setTimeout(() => {
        const leadFormMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: 'bot',
          content: 'Would you like to schedule a consultation? I can connect you with the right attorney.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, leadFormMessage]);
        setShowLeadForm(true);
      }, 2000);
    }
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
            className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#3d7eff] to-[#0e2650] text-white shadow-2xl flex items-center justify-center group ${className}`}
            aria-label="Open AI Legal Concierge"
          >
            <MessageCircle className="w-7 h-7" />
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 bg-[#f3bd4f] rounded-full"
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
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md h-[600px] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/95 dark:bg-[#0a1a3a]/95 border border-white/20"
          >
            <div className="bg-gradient-to-r from-[#0e2650] to-[#3d7eff] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#f3bd4f]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Legal Concierge</h3>
                  <p className="text-white/70 text-xs">RBE Law</p>
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

            <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-[#3d7eff] text-white'
                        : 'bg-gray-100 dark:bg-[#0e2650]/50 text-gray-900 dark:text-white'
                    } rounded-2xl p-3 shadow-md`}
                  >
                    {message.type === 'bot' && (
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-[#f3bd4f]" />
                        <span className="text-xs font-medium opacity-70">AI Concierge</span>
                      </div>
                    )}
                    <p className="text-sm whitespace-pre-line">{message.content}</p>

                    {message.suggestedAttorney && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 p-3 bg-white dark:bg-[#0a1a3a] rounded-lg border border-[#3d7eff]/20"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3d7eff] to-[#0e2650] flex items-center justify-center text-white font-semibold">
                            {message.suggestedAttorney.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                              {message.suggestedAttorney.name}
                            </h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {message.suggestedAttorney.title}
                            </p>
                            <p className="text-xs text-[#3d7eff] mt-1">
                              {message.suggestedAttorney.practiceAreas.slice(0, 2).join(', ')}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {message.relatedArticles && message.relatedArticles.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-2"
                      >
                        {message.relatedArticles.map((article) => (
                          <div
                            key={article.id}
                            className="p-2 bg-white dark:bg-[#0a1a3a] rounded-lg border border-[#3d7eff]/20 text-xs"
                          >
                            <p className="font-medium text-gray-900 dark:text-white">{article.title}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-[10px] mt-1">
                              {article.excerpt.slice(0, 80)}...
                            </p>
                          </div>
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
                  <div className="bg-gray-100 dark:bg-[#0e2650]/50 rounded-2xl p-3 shadow-md">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-[#3d7eff] rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-[#3d7eff] rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-[#3d7eff] rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {showLeadForm && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gradient-to-br from-[#3d7eff]/10 to-[#f3bd4f]/10 rounded-xl border border-[#3d7eff]/20"
                >
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-3">
                    Schedule a Consultation
                  </h4>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full p-2 mb-2 text-sm rounded-lg border border-gray-300 dark:border-[#3d7eff]/20 bg-white dark:bg-[#0a1a3a]/50 text-gray-900 dark:text-white"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full p-2 mb-2 text-sm rounded-lg border border-gray-300 dark:border-[#3d7eff]/20 bg-white dark:bg-[#0a1a3a]/50 text-gray-900 dark:text-white"
                  />
                  <button className="w-full bg-gradient-to-r from-[#3d7eff] to-[#0e2650] text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    Request Consultation
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-[#0a1a3a]/80 backdrop-blur-sm border-t border-gray-200 dark:border-[#3d7eff]/20">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our legal services..."
                  className="flex-1 p-3 text-sm rounded-xl border border-gray-300 dark:border-[#3d7eff]/20 bg-white dark:bg-[#0e2650]/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3d7eff]"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-3 bg-gradient-to-br from-[#3d7eff] to-[#0e2650] text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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

export default ConciergeWidget;
