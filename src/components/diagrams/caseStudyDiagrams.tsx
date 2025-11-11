import React from 'react';
import SystemArchitecture from './SystemArchitecture';

// Proactive Support Engine Diagrams
export const ProactiveSupportArchitecture = () => {
  const nodes = [
    {
      id: 'customer',
      label: 'Customer',
      sublabel: '24/7 Access',
      icon: '👤',
      x: 400,
      y: 80,
    },
    {
      id: 'chatbot',
      label: 'AI Chatbot',
      sublabel: 'Cloudflare Workers',
      icon: '🤖',
      x: 400,
      y: 200,
      color: 'rgba(184, 208, 217, 0.1)',
    },
    {
      id: 'api-layer',
      label: 'API Layer',
      sublabel: 'Real-time Integration',
      icon: '⚡',
      x: 400,
      y: 320,
    },
    {
      id: 'woocommerce',
      label: 'WooCommerce',
      sublabel: 'Order Data',
      icon: '🛒',
      x: 200,
      y: 480,
    },
    {
      id: 'learndash',
      label: 'LearnDash',
      sublabel: 'Course Progress',
      icon: '📚',
      x: 400,
      y: 480,
    },
    {
      id: 'fluentcrm',
      label: 'FluentCRM',
      sublabel: 'Customer Data',
      icon: '📊',
      x: 600,
      y: 480,
    },
  ];

  const connections = [
    { from: 'customer', to: 'chatbot', label: 'Question', animated: true },
    { from: 'chatbot', to: 'api-layer', label: 'Query', animated: true },
    { from: 'api-layer', to: 'woocommerce', animated: false },
    { from: 'api-layer', to: 'learndash', animated: false },
    { from: 'api-layer', to: 'fluentcrm', animated: false },
  ];

  return (
    <SystemArchitecture
      nodes={nodes}
      connections={connections}
      title="System Architecture"
      description="Deep CRM integration provides personalized, instant support"
    />
  );
};

export const ProactiveSupportDecisionFlow = () => {
  const nodes = [
    {
      id: 'question',
      label: 'User Question',
      icon: '❓',
      x: 400,
      y: 80,
    },
    {
      id: 'faq-check',
      label: 'In FAQ?',
      icon: '📋',
      x: 400,
      y: 180,
    },
    {
      id: 'instant-answer',
      label: 'Instant Answer',
      icon: '✅',
      x: 200,
      y: 280,
      color: 'rgba(16, 185, 129, 0.1)',
    },
    {
      id: 'crm-check',
      label: 'CRM Data Needed?',
      icon: '🔍',
      x: 550,
      y: 280,
    },
    {
      id: 'personalized',
      label: 'Personalized Response',
      icon: '👤',
      x: 400,
      y: 380,
      color: 'rgba(16, 185, 129, 0.1)',
    },
    {
      id: 'escalate',
      label: 'Human + Context',
      icon: '🤝',
      x: 700,
      y: 380,
      color: 'rgba(245, 158, 11, 0.1)',
    },
  ];

  const connections = [
    { from: 'question', to: 'faq-check', animated: true },
    { from: 'faq-check', to: 'instant-answer', label: 'Yes', animated: true },
    { from: 'faq-check', to: 'crm-check', label: 'No', animated: true },
    { from: 'crm-check', to: 'personalized', label: 'Yes', animated: true },
    { from: 'crm-check', to: 'escalate', label: 'No', animated: true },
  ];

  return (
    <SystemArchitecture
      nodes={nodes}
      connections={connections}
      title="Decision Flow"
      description="Smart routing ensures the right answer every time"
    />
  );
};

// Command Center Diagrams
export const CommandCenterArchitecture = () => {
  const nodes = [
    {
      id: 'woo',
      label: 'WooCommerce',
      sublabel: 'Orders',
      icon: '🛒',
      x: 200,
      y: 80,
    },
    {
      id: 'learndash',
      label: 'LearnDash',
      sublabel: 'Progress',
      icon: '📚',
      x: 400,
      y: 80,
    },
    {
      id: 'crm',
      label: 'FluentCRM',
      sublabel: 'Engagement',
      icon: '📊',
      x: 600,
      y: 80,
    },
    {
      id: 'engine',
      label: 'Aggregation Engine',
      sublabel: 'Real-time PHP',
      icon: '⚙️',
      x: 400,
      y: 220,
      color: 'rgba(184, 208, 217, 0.1)',
    },
    {
      id: 'api',
      label: 'REST API',
      sublabel: 'Secure Endpoint',
      icon: '🔌',
      x: 400,
      y: 360,
    },
    {
      id: 'ui',
      label: 'Events Hub UI',
      sublabel: 'Interactive Dashboard',
      icon: '📱',
      x: 400,
      y: 500,
      color: 'rgba(139, 92, 246, 0.1)',
    },
  ];

  const connections = [
    { from: 'woo', to: 'engine', animated: true },
    { from: 'learndash', to: 'engine', animated: true },
    { from: 'crm', to: 'engine', animated: true },
    { from: 'engine', to: 'api', label: 'Real-time', animated: true },
    { from: 'api', to: 'ui', label: 'JSON', animated: true },
  ];

  return (
    <SystemArchitecture
      nodes={nodes}
      connections={connections}
      title="Data Flow Architecture"
      description="Unified data aggregation from multiple sources into one command center"
    />
  );
};

// The Closer Diagrams
export const TheCloserPipeline = () => {
  const nodes = [
    {
      id: 'quote',
      label: 'Quote Created',
      icon: '📝',
      x: 150,
      y: 100,
    },
    {
      id: 'email',
      label: 'Email Sent',
      sublabel: 'Pay-by-Link',
      icon: '📧',
      x: 350,
      y: 100,
    },
    {
      id: 'customer',
      label: 'Customer Chooses',
      icon: '🤔',
      x: 550,
      y: 100,
      color: 'rgba(184, 208, 217, 0.1)',
    },
    {
      id: 'pay-full',
      label: 'Pay Full',
      sublabel: 'Stripe',
      icon: '💳',
      x: 400,
      y: 240,
      color: 'rgba(16, 185, 129, 0.1)',
    },
    {
      id: 'finance',
      label: 'Finance',
      sublabel: 'Affirm',
      icon: '📊',
      x: 550,
      y: 240,
      color: 'rgba(16, 185, 129, 0.1)',
    },
    {
      id: 'questions',
      label: 'Questions',
      sublabel: 'Human Follow-up',
      icon: '❓',
      x: 700,
      y: 240,
      color: 'rgba(245, 158, 11, 0.1)',
    },
    {
      id: 'order',
      label: 'Auto-Created Order',
      icon: '✅',
      x: 475,
      y: 380,
      color: 'rgba(139, 92, 246, 0.1)',
    },
    {
      id: 'fulfill',
      label: 'Fulfillment',
      icon: '📦',
      x: 475,
      y: 480,
    },
  ];

  const connections = [
    { from: 'quote', to: 'email', animated: true },
    { from: 'email', to: 'customer', animated: true },
    { from: 'customer', to: 'pay-full', label: 'Option 1', animated: false },
    { from: 'customer', to: 'finance', label: 'Option 2', animated: false },
    { from: 'customer', to: 'questions', label: 'Option 3', animated: false },
    { from: 'pay-full', to: 'order', animated: true },
    { from: 'finance', to: 'order', animated: true },
    { from: 'order', to: 'fulfill', animated: true },
  ];

  return (
    <SystemArchitecture
      nodes={nodes}
      connections={connections}
      title="Sales Pipeline Flow"
      description="Frictionless path from quote to payment with multiple flexible options"
    />
  );
};

// Export all diagrams by case study slug
export const getCaseStudyDiagrams = (slug: string) => {
  const diagrams: { [key: string]: React.FC[] } = {
    'proactive-support-engine': [ProactiveSupportArchitecture, ProactiveSupportDecisionFlow],
    'command-center': [CommandCenterArchitecture],
    'the-closer': [TheCloserPipeline],
  };

  return diagrams[slug] || [];
};
