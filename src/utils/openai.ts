/**
 * OpenAI API Integration
 * Handles chat completions with portfolio context
 */

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Portfolio context for AI
const SYSTEM_PROMPT = `You are an intelligent portfolio assistant for Jacob Darling, a seasoned Fractional CMO, Full-Stack Developer, and Marketing Technologist with 15+ years of experience.

KEY INFORMATION:
- Experience: 15+ years in technology and marketing
- Roles: Fractional CMO, Full-Stack Developer, Marketing Technologist, Systems Architect
- Industries: SaaS, Healthcare, Legal Tech, E-commerce

TECHNICAL SKILLS:
- Frontend: React, TypeScript, Next.js, Tailwind CSS, Framer Motion, Vite
- Backend: Node.js, Python, Express, FastAPI, REST APIs, GraphQL
- DevOps: Docker, AWS, CI/CD, GitHub Actions, Vercel, Netlify
- Marketing: HubSpot, Marketo, Salesforce, Google Analytics, SEO, Marketing Automation
- Design: Figma, Adobe Creative Suite, UI/UX Design, Brand Identity

FEATURED PROJECTS:
1. The Launchpad - Website redesign achieving 180% engagement increase, 92% conversion boost
2. The Conductor - Marketing automation platform with 250% efficiency gain, saving 40 hrs/month
3. The Fortress - Cybersecurity infrastructure overhaul, 98/100 security score, 100% incident reduction
4. RBE Law - Law firm digital transformation, 145% client acquisition increase, 320% ROI
5. Graston CEU System - Healthcare education platform
6. Ultimate Tech ROI - ROI calculator for technology investments

METRICS:
- Projects Completed: 24+
- Client Satisfaction: 98%
- Average ROI: 285%
- Technologies Used: 50+

CONTACT:
- Email: hoosierdarling@gmail.com
- LinkedIn: linkedin.com/in/jacobdarling
- GitHub: github.com/JdarlingGT
- Available for: Consulting, Full-time opportunities, Speaking & workshops

INSTRUCTIONS:
- Be helpful, professional, and enthusiastic
- Provide specific examples from projects when relevant
- Keep responses concise but informative (2-4 sentences ideal)
- Suggest relevant case studies or pages when appropriate
- If asked about availability, mention consulting and collaboration opportunities
- Use emojis sparingly for visual interest
- Always be accurate - don't make up information not provided above`;

/**
 * Call OpenAI API for chat completion
 */
export async function getChatCompletion(
  messages: ChatMessage[],
  temperature: number = 0.7
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    console.error('OpenAI API key not found');
    return 'I apologize, but I\'m having trouble connecting right now. Please try again later or contact Jacob directly at hoosierdarling@gmail.com.';
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cost-effective model, good for chat
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages,
        ],
        temperature,
        max_tokens: 500, // Keep responses concise
        presence_penalty: 0.6,
        frequency_penalty: 0.3,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(`API error: ${response.status}`);
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response. Please try again.';
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return 'I\'m having trouble connecting right now. Please try asking again, or feel free to contact Jacob directly at hoosierdarling@gmail.com.';
  }
}

/**
 * Generate smart suggestions based on conversation context
 */
export function generateSuggestions(lastResponse: string): string[] {
  const lowerResponse = lastResponse.toLowerCase();
  
  // Project-related suggestions
  if (lowerResponse.includes('project') || lowerResponse.includes('launchpad') || lowerResponse.includes('conductor')) {
    return [
      'Tell me more about The Launchpad',
      'What technologies were used?',
      'Show me more case studies',
    ];
  }
  
  // Skills-related suggestions
  if (lowerResponse.includes('skill') || lowerResponse.includes('technology') || lowerResponse.includes('react')) {
    return [
      'What about marketing automation?',
      'Show me projects using these skills',
      'Tell me about his experience',
    ];
  }
  
  // Experience-related suggestions
  if (lowerResponse.includes('experience') || lowerResponse.includes('years') || lowerResponse.includes('background')) {
    return [
      'View full resume',
      'See case studies',
      'What industries has he worked in?',
    ];
  }
  
  // Contact-related suggestions
  if (lowerResponse.includes('contact') || lowerResponse.includes('hire') || lowerResponse.includes('email')) {
    return [
      'What services are available?',
      'View portfolio',
      'Check availability',
    ];
  }
  
  // Default suggestions
  return [
    'Show me recent projects',
    'What are his technical skills?',
    'How can I get in touch?',
  ];
}

/**
 * Extract project links from AI response
 */
export function extractProjectLinks(response: string): Array<{ title: string; url: string }> {
  const projects = [
    { title: 'The Launchpad', url: '/case-study/the-launchpad', keywords: ['launchpad', 'website redesign', 'engagement'] },
    { title: 'The Conductor', url: '/case-study/the-conductor', keywords: ['conductor', 'automation', 'marketing'] },
    { title: 'The Fortress', url: '/case-study/the-fortress', keywords: ['fortress', 'security', 'cybersecurity'] },
    { title: 'RBE Law', url: '/case-study/rbe-law', keywords: ['rbe', 'law firm', 'legal'] },
    { title: 'Graston CEU System', url: '/case-study/graston-ceu-system', keywords: ['graston', 'healthcare', 'education'] },
  ];
  
  const lowerResponse = response.toLowerCase();
  return projects.filter(project => 
    project.keywords.some(keyword => lowerResponse.includes(keyword))
  );
}
