import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './ProactiveSupportHero.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  delay: number;
}

const ProactiveSupportHero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);
  const crmRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [isAnimating, setIsAnimating] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const timersRef = useRef<number[]>([]);

  const chatMessages: ChatMessage[] = [
    { id: '1', text: 'Hi! I need help with my course access.', sender: 'user', delay: 1000 },
    {
      id: '2',
      text: "I'd be happy to help! Let me check your enrollment status...",
      sender: 'bot',
      delay: 2000,
    },
    {
      id: '3',
      text: "I can see you're enrolled in GT101. Your course is ready to go!",
      sender: 'bot',
      delay: 3000,
    },
    {
      id: '4',
      text: 'Perfect! Can you also check my certificate status?',
      sender: 'user',
      delay: 4000,
    },
    {
      id: '5',
      text: "Your certificate will be available after course completion. You're 60% through!",
      sender: 'bot',
      delay: 5000,
    },
  ];

  const metrics = [
    { label: 'Ticket Reduction', value: '70%', color: '#10B981' },
    { label: 'Response Time', value: 'Instant', color: '#3B82F6' },
    { label: 'Customer Satisfaction', value: '+45%', color: '#8B5CF6' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide all elements
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          chatbotRef.current,
          crmRef.current,
          metricsRef.current,
          ctaRef.current,
        ],
        {
          opacity: 0,
          y: 50,
        }
      );

      // Create the main timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Title animation
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      });

      // Subtitle animation
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      // Chatbot interface animation
      tl.to(
        chatbotRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // Start chatbot conversation
      tl.call(() => {
        startChatbotAnimation();
      });

      // CRM integration visualization
      tl.to(
        crmRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );

      // Metrics animation
      tl.to(
        metricsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      );

      // CTA buttons
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const startChatbotAnimation = () => {
    setIsAnimating(true);
    let messageIndex = 0;

    // Helper to track and enqueue timer IDs
    const enqueue = (callback: () => void, delay: number): void => {
      const id = window.setTimeout(callback, delay);
      timersRef.current.push(id);
    };

    const showNextMessage = () => {
      if (messageIndex < chatMessages.length) {
        setCurrentMessage(messageIndex);
        messageIndex++;

        if (messageIndex < chatMessages.length) {
          enqueue(showNextMessage, chatMessages[messageIndex].delay);
        } else {
          // Loop the conversation
          enqueue(() => {
            messageIndex = 0;
            setCurrentMessage(0);
            enqueue(showNextMessage, 1000);
          }, 3000);
        }
      }
    };

    enqueue(showNextMessage, 1000);
  };

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(timerId => clearTimeout(timerId));
      timersRef.current = [];
    };
  }, []);

  const animateMetrics = () => {
    // Metrics animation is scoped via gsap.context(..., heroRef) above
    // Selector `.metric-${index}` is already scoped to heroRef.current
    metrics.forEach((metric, index) => {
      gsap.fromTo(
        `.metric-${index}`,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.2,
          ease: 'back.out(1.7)',
        }
      );
    });
  };

  useEffect(() => {
    if (metricsRef.current) {
      animateMetrics();
    }
  }, []);

  return (
    <section ref={heroRef} className="proactive-support-hero">
      <div className="hero-container">
        {/* Main Content */}
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">
            Hello, I'm Jacob Darling
            <span className="gradient-text">Marketing Strategist & Systems Architect</span>
          </h1>

          <p ref={subtitleRef} className="hero-subtitle">
            15+ years transforming marketing challenges into scalable solutions. I build the systems
            and strategies that drive measurable growth—from marketing automation and CRM campaigns
            to SEO/SEM optimization and analytics-driven decision making. Currently seeking senior
            marketing leadership roles where I can combine strategic vision with technical
            execution.
          </p>

          {/* Interactive Demo Area */}
          <div className="demo-container">
            {/* Chatbot Interface */}
            <div ref={chatbotRef} className="chatbot-demo">
              <div className="chatbot-header">
                <div className="chatbot-avatar">
                  <div className="avatar-ring"></div>
                  <div className="avatar-icon">🤖</div>
                </div>
                <div className="chatbot-info">
                  <h3>AI Support Assistant</h3>
                  <span className="status online">Online</span>
                </div>
              </div>

              <div className="chatbot-messages">
                {chatMessages.slice(0, currentMessage + 1).map((message, index) => (
                  // CSS custom properties must be set inline - this is a valid exception
                  // eslint-disable-next-line react/no-inline-styles
                  <div
                    key={message.id}
                    className={`message ${message.sender}`}
                    style={{ '--delay': index * 0.3 } as React.CSSProperties}
                  >
                    <div className="message-content">{message.text}</div>
                    <div className="message-time">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                {isAnimating && currentMessage < chatMessages.length - 1 && (
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                )}
              </div>
            </div>

            {/* System Impact Visualization */}
            <div ref={crmRef} className="system-impact">
              <div className="impact-header">
                <h4>System Impact</h4>
                <div className="impact-indicator">
                  <div className="impact-dot"></div>
                  <span>Active</span>
                </div>
              </div>

              <div className="impact-metrics">
                <div className="impact-item">
                  <div className="impact-icon">⚡</div>
                  <span>Instant Response</span>
                </div>
                <div className="impact-item">
                  <div className="impact-icon">📊</div>
                  <span>Real-time Analytics</span>
                </div>
                <div className="impact-item">
                  <div className="impact-icon">🎯</div>
                  <span>Smart Routing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Display */}
          <div ref={metricsRef} className="metrics-display">
            {metrics.map((metric, index) => (
              <div key={index} className={`metric-card metric-${index}`}>
                <div className="metric-value" data-color={metric.color}>
                  {metric.value}
                </div>
                <div className="metric-label">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="hero-cta">
            <Link
              to="/resume"
              className="btn-primary"
              style={{ position: 'relative', zIndex: 10, cursor: 'pointer' }}
            >
              <span>Download My Resume</span>
            </Link>
            <Link
              to="/case-studies"
              className="btn-secondary"
              style={{ position: 'relative', zIndex: 10, cursor: 'pointer' }}
            >
              <span>View My Work</span>
            </Link>
          </div>
        </div>

        {/* Background Elements */}
        <div className="hero-background">
          <div className="tech-grid"></div>
          <div className="floating-elements">
            <div className="element element-1">⚡</div>
            <div className="element element-2">🔗</div>
            <div className="element element-3">📊</div>
            <div className="element element-4">🤖</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProactiveSupportHero;
