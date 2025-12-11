/**
 * Cloudflare Pages Function: AI-Powered Case Study Explainer
 * 
 * Endpoint: /api/explain-case-study
 * Method: POST
 * 
 * Uses OpenAI or Gemini to generate persona-specific explanations of case studies
 * 
 * Request body:
 * {
 *   title: string;
 *   context: string;
 *   problem: string;
 *   solution: string;
 *   results: string;
 *   persona: 'founder' | 'cmo' | 'developer' | 'general';
 * }
 * 
 * Response:
 * {
 *   explanation: string;
 *   persona: string;
 * }
 */

interface CaseStudyData {
  title: string;
  context?: string;
  problem: string;
  solution: string;
  results: string;
  persona: 'founder' | 'cmo' | 'developer' | 'general';
}

interface Env {
  OPENAI_API_KEY?: string;
  GEMINI_API_KEY?: string;
}

// Persona-specific prompts for tailored explanations
const personaPrompts = {
  founder: `You are explaining a marketing case study to a startup founder or CEO. Focus on:
- Business impact and ROI
- Strategic decisions and why they matter
- Scalability and long-term value
- Resource efficiency and cost considerations
Keep it concise, strategic, and business-focused. Use professional but accessible language.`,
  
  cmo: `You are explaining a marketing case study to a Chief Marketing Officer. Focus on:
- Marketing strategy and execution
- Channel performance and attribution
- Team structure and workflows
- Technology stack and integration
Keep it tactical, metrics-driven, and focused on marketing operations excellence.`,
  
  developer: `You are explaining a marketing case study to a software developer or technical lead. Focus on:
- Technical architecture and implementation
- Integration patterns and APIs
- Performance optimization
- Code quality and best practices
Keep it technical, architecture-focused, and emphasize the engineering decisions.`,
  
  general: `You are explaining a marketing case study to a general audience. Focus on:
- Clear problem and solution overview
- Key outcomes and results
- Why this approach worked
- Lessons learned
Keep it accessible, engaging, and well-structured.`,
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const data: CaseStudyData = await request.json();
    const { title, context = '', problem, solution, results, persona = 'general' } = data;

    if (!title || !problem || !solution || !results) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: title, problem, solution, results' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Build the prompt
    const systemPrompt = personaPrompts[persona];
    const userPrompt = `Case Study: ${title}

${context ? `Context: ${context}` : ''}

Problem:
${problem}

Solution:
${solution}

Results:
${results}

Please provide a ${persona}-focused explanation of this case study in 2-3 concise paragraphs. Make it professional, insightful, and tailored to the ${persona} perspective.`;

    let explanation = '';

    // Try OpenAI first
    if (env.OPENAI_API_KEY) {
      try {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 500,
          }),
        });

        if (openaiResponse.ok) {
          const openaiData = await openaiResponse.json();
          explanation = openaiData.choices[0]?.message?.content || '';
        }
      } catch (error) {
        console.error('OpenAI error:', error);
      }
    }

    // Fallback to Gemini if OpenAI failed
    if (!explanation && env.GEMINI_API_KEY) {
      try {
        const geminiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `${systemPrompt}\n\n${userPrompt}`
                }]
              }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
              },
            }),
          }
        );

        if (geminiResponse.ok) {
          const geminiData = await geminiResponse.json();
          explanation = geminiData.candidates[0]?.content?.parts[0]?.text || '';
        }
      } catch (error) {
        console.error('Gemini error:', error);
      }
    }

    // Return error if both APIs failed
    if (!explanation) {
      return new Response(
        JSON.stringify({ error: 'Failed to generate explanation. Please try again later.' }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Return successful response
    return new Response(
      JSON.stringify({
        explanation: explanation.trim(),
        persona,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in explain-case-study function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
};
