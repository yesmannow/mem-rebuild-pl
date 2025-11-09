import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, Zap, MessageSquare, Mail, ArrowRight, Sparkles } from 'lucide-react';
import './AIAutomationShowcase.css';

interface AutomationCard {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  color: string;
  example: string;
}

const automations: AutomationCard[] = [
  {
    id: 'fluentcrm-ai',
    title: 'FluentCRM + OpenAI Email Personalization Bot',
    description:
      'AI-powered email personalization engine that dynamically generates personalized email content based on customer behavior, purchase history, and engagement patterns. Integrates FluentCRM workflows with OpenAI GPT to create hyper-relevant messaging at scale.',
    technologies: ['FluentCRM', 'OpenAI GPT', 'Python', 'REST APIs', 'WordPress'],
    icon: <Mail className="w-8 h-8" />,
    color: '#10b981',
    example:
      'Analyzes customer purchase history and generates personalized product recommendations in email campaigns, increasing open rates by 35%.',
  },
  {
    id: 'wp-fusion-routing',
    title: 'WP Fusion Lead Routing Logic',
    description:
      'Intelligent lead scoring and routing system that automatically segments leads based on behavior, demographics, and engagement scores. Routes qualified leads to appropriate sales reps while nurturing cold leads through automated sequences.',
    technologies: ['WP Fusion', 'FluentCRM', 'Gravity Forms', 'Custom PHP', 'JavaScript'],
    icon: <Zap className="w-8 h-8" />,
    color: '#f59e0b',
    example:
      'Automatically routes high-intent leads to sales within 5 minutes, while nurturing lower-intent leads through 30-day email sequences.',
  },
  {
    id: 'chatbot-bundles',
    title: 'AI Chatbot Training Bundle Recommender',
    description:
      'CRM-aware chatbot that recommends personalized training bundles based on customer profile, previous purchases, and learning goals. Integrates with WooCommerce and LearnDash to provide intelligent product recommendations.',
    technologies: [
      'Cloudflare Workers',
      'OpenAI API',
      'WooCommerce API',
      'LearnDash API',
      'FluentCRM',
    ],
    icon: <MessageSquare className="w-8 h-8" />,
    color: '#0ea5e9',
    example:
      'Reduced support tickets by 70% while increasing average order value by 25% through intelligent product recommendations.',
  },
  {
    id: 'ai-support-engine',
    title: 'Proactive Support Engine',
    description:
      'AI-powered customer support system with deep CRM integration. Handles order status inquiries, course recommendations, and certification questions with personalized responses based on customer data.',
    technologies: [
      'Cloudflare Workers',
      'OpenAI',
      'WooCommerce API',
      'LearnDash API',
      'FluentCRM API',
    ],
    icon: <Bot className="w-8 h-8" />,
    color: '#8b5cf6',
    example:
      'Provides instant, personalized support 24/7, handling 70% of common inquiries automatically while routing complex issues to human agents.',
  },
];

const sampleChatMessages = [
  { role: 'user', text: "What's my order status for GT101?" },
  {
    role: 'bot',
    text: "I can see you're enrolled in GT101 and you're 60% through the course! Your certificate will be available upon completion.",
  },
  { role: 'user', text: 'Can you recommend what I should take next?' },
  {
    role: 'bot',
    text: "Based on your profile and completion of GT101, I'd recommend GT201 Advanced Techniques or GT301 Clinical Applications. Both would build perfectly on your current progress!",
  },
];

const AIAutomationShowcase: React.FC = () => {
  const [selectedAutomation, setSelectedAutomation] = useState<string | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatMessages] = useState(sampleChatMessages);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="ai-automation-showcase">
      <div className="showcase-container">
        <motion.div
          className="showcase-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="header-icon">
            <Sparkles className="w-12 h-12" />
          </div>
          <h2>AI + Automation Showpiece</h2>
          <p>
            Hands-on innovation: Real AI automations I've built that drive measurable business
            results
          </p>
        </motion.div>

        <div className="automations-grid">
          {automations.map((automation, index) => {
            const cardRef = useRef<HTMLDivElement>(null);
            const cardInView = useInView(cardRef, { once: true, amount: 0.2 });

            return (
              <motion.div
                key={automation.id}
                ref={cardRef}
                className={`automation-card ${selectedAutomation === automation.id ? 'expanded' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() =>
                  setSelectedAutomation(selectedAutomation === automation.id ? null : automation.id)
                }
              >
                <div className="card-icon" data-color={automation.color}>
                  {automation.icon}
                </div>

                <div className="card-content">
                  <h3>{automation.title}</h3>
                  <p className="card-description">{automation.description}</p>

                  <div className="card-example">
                    <strong>Example:</strong> {automation.example}
                  </div>

                  <div className="card-technologies">
                    {automation.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="card-expand-indicator">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mini Chatbot Demo */}
        <motion.div
          className="chatbot-demo-section"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="demo-header">
            <h3>Live Demo: AI Chatbot</h3>
            <p>See how the AI Support Engine works with real CRM integration</p>
          </div>

          <motion.div
            className={`chatbot-widget ${isChatbotOpen ? 'open' : ''}`}
            initial={false}
            animate={{ height: isChatbotOpen ? '400px' : '60px' }}
            transition={{ duration: 0.3 }}
          >
            <button className="chatbot-toggle" onClick={() => setIsChatbotOpen(!isChatbotOpen)}>
              <Bot className="w-5 h-5" />
              <span>Try the AI Assistant</span>
              <ArrowRight className={`w-4 h-4 ${isChatbotOpen ? 'rotated' : ''}`} />
            </button>

            {isChatbotOpen && (
              <motion.div
                className="chatbot-messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {chatMessages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    className={`chat-message ${msg.role}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.3 }}
                  >
                    <div className="message-avatar">
                      {msg.role === 'bot' ? <Bot size={16} /> : 'U'}
                    </div>
                    <div className="message-text">{msg.text}</div>
                  </motion.div>
                ))}
                <div className="chatbot-input-area">
                  <input type="text" placeholder="Ask me anything about your account..." disabled />
                  <button disabled aria-label="Send message">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAutomationShowcase;
