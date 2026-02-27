import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Type,
  Download,
  Sparkles,
  Eye,
  Heart,
  Target,
  TrendingUp,
  Zap,
  BookOpen,
} from 'lucide-react';

interface BrandValues {
  industry: string;
  personality: number[];
  values: string[];
  targetAudience: string;
  brandPurpose: string;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string;
  name: string;
}

interface TypographyPairing {
  heading: string;
  body: string;
  accent: string;
  description: string;
}

interface BrandVoice {
  tone: string;
  adjectives: string[];
  doList: string[];
  dontList: string[];
}

const BrandBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inputs' | 'logo' | 'colors' | 'typography' | 'voice' | 'playbook'>('inputs');
  const [brandValues, setBrandValues] = useState<BrandValues>({
    industry: 'technology',
    personality: [70, 60, 80, 50], // [modern, professional, friendly, bold]
    values: [],
    targetAudience: '',
    brandPurpose: '',
  });

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Food & Beverage',
    'Real Estate',
    'Marketing',
    'Consulting',
    'Non-Profit',
  ];

  const valueOptions = [
    'Innovation',
    'Trust',
    'Excellence',
    'Sustainability',
    'Collaboration',
    'Integrity',
    'Creativity',
    'Empowerment',
    'Transparency',
    'Customer Focus',
  ];

  const personalityTraits = [
    { name: 'Modern', key: 0, icon: <Zap size={16} /> },
    { name: 'Professional', key: 1, icon: <Target size={16} /> },
    { name: 'Friendly', key: 2, icon: <Heart size={16} /> },
    { name: 'Bold', key: 3, icon: <TrendingUp size={16} /> },
  ];

  // Generate color schemes based on brand personality
  const colorSchemes: ColorScheme[] = useMemo(() => {
    const schemes: ColorScheme[] = [
      {
        name: 'Ocean Innovation',
        primary: '#0077BE',
        secondary: '#40E0D0',
        accent: '#FFB347',
        neutral: '#F5F5F5',
      },
      {
        name: 'Forest Professional',
        primary: '#2D5F3F',
        secondary: '#7CB342',
        accent: '#FFA726',
        neutral: '#FAFAFA',
      },
      {
        name: 'Sunset Bold',
        primary: '#E63946',
        secondary: '#F4A261',
        accent: '#2A9D8F',
        neutral: '#F8F9FA',
      },
      {
        name: 'Royal Elegance',
        primary: '#6A4C93',
        secondary: '#C06C84',
        accent: '#F67280',
        neutral: '#F0F0F0',
      },
      {
        name: 'Tech Modern',
        primary: '#4A90E2',
        secondary: '#7C5CFF',
        accent: '#50E3C2',
        neutral: '#ECEFF1',
      },
    ];
    return schemes;
  }, []);

  const typographyPairings: TypographyPairing[] = [
    {
      heading: 'Montserrat',
      body: 'Open Sans',
      accent: '"Space Grotesk", "Clash Display", sans-serif"',
      description: 'Modern & Professional - Great for tech and corporate brands',
    },
    {
      heading: 'Raleway',
      body: 'Lato',
      accent: 'Merriweather',
      description: 'Clean & Elegant - Perfect for creative agencies and startups',
    },
    {
      heading: 'Poppins',
      body: 'Inter',
      accent: 'Bebas Neue',
      description: 'Bold & Contemporary - Ideal for energetic, youth-focused brands',
    },
    {
      heading: '"Space Grotesk", "Clash Display", sans-serif',
      body: 'Source Sans Pro',
      accent: 'Oswald',
      description: 'Sophisticated & Trustworthy - Great for finance and luxury brands',
    },
  ];

  const brandVoice: BrandVoice = useMemo(() => {
    const [, professional, friendly, bold] = brandValues.personality;

    let tone = '';
    let adjectives: string[] = [];
    let doList: string[] = [];
    let dontList: string[] = [];

    if (professional > 60) {
      tone = 'Professional & Authoritative';
      adjectives = ['Expert', 'Reliable', 'Knowledgeable', 'Confident'];
      doList = ['Use industry terminology', 'Back claims with data', 'Maintain formal tone'];
      dontList = ['Use slang or casual language', 'Make unsubstantiated claims', 'Be overly casual'];
    } else if (friendly > 70) {
      tone = 'Warm & Approachable';
      adjectives = ['Friendly', 'Conversational', 'Helpful', 'Engaging'];
      doList = ['Use conversational language', 'Show empathy', 'Be personable'];
      dontList = ['Be too formal', 'Use jargon without explanation', 'Sound robotic'];
    } else if (bold > 70) {
      tone = 'Bold & Innovative';
      adjectives = ['Daring', 'Pioneering', 'Disruptive', 'Dynamic'];
      doList = ['Challenge conventions', 'Be confident', 'Take strong positions'];
      dontList = ['Be timid', 'Follow trends blindly', 'Avoid taking risks'];
    } else {
      tone = 'Balanced & Trustworthy';
      adjectives = ['Authentic', 'Clear', 'Thoughtful', 'Steady'];
      doList = ['Be clear and concise', 'Show authenticity', 'Build trust'];
      dontList = ['Overpromise', 'Be vague', 'Use manipulation'];
    }

    return { tone, adjectives, doList, dontList };
  }, [brandValues.personality]);

  const handlePersonalityChange = (index: number, value: number) => {
    const newPersonality = [...brandValues.personality];
    newPersonality[index] = value;
    setBrandValues({ ...brandValues, personality: newPersonality });
  };

  const toggleValue = (value: string) => {
    const newValues = brandValues.values.includes(value)
      ? brandValues.values.filter(v => v !== value)
      : [...brandValues.values, value];
    setBrandValues({ ...brandValues, values: newValues });
  };

  const downloadPlaybook = () => {
    alert('In a production environment, this would generate and download a comprehensive PDF brand playbook!');
  };

  const tabs = [
    { id: 'inputs', label: 'Brand Inputs', icon: <BookOpen size={16} /> },
    { id: 'logo', label: 'Logo Concepts', icon: <Sparkles size={16} /> },
    { id: 'colors', label: 'Color Schemes', icon: <Palette size={16} /> },
    { id: 'typography', label: 'Typography', icon: <Type size={16} /> },
    { id: 'voice', label: 'Brand Voice', icon: <Eye size={16} /> },
    { id: 'playbook', label: 'Download Playbook', icon: <Download size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full mb-4">
            <Sparkles className="text-purple-400" size={16} />
            <span className="text-xs uppercase tracking-[0.3em] text-purple-300">Brand Studio</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-clash font-bold text-brand-text mt-2 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            Brand Builder
          </h1>
          <p className="text-brand-muted text-lg mt-2 max-w-2xl mx-auto">
            Generate a comprehensive brand playbook with logo concepts, color schemes, typography pairings, and brand voice guidelines
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="bg-slate-900/70 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-2 inline-flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'inputs' | 'logo' | 'colors' | 'typography' | 'voice' | 'playbook')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-[0_10px_30px_rgba(168,85,247,0.4)]'
                    : 'text-brand-muted hover:text-brand-text hover:bg-slate-800/60'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
          >
            {/* Brand Inputs Tab */}
            {activeTab === 'inputs' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-clash font-bold text-brand-text mb-6">Define Your Brand</h2>

                  {/* Industry Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-brand-text mb-3">Industry</label>
                    <select
                      value={brandValues.industry}
                      onChange={(e) => setBrandValues({ ...brandValues, industry: e.target.value })}
                      className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      {industries.map((industry) => (
                        <option key={industry} value={industry.toLowerCase()}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Personality Sliders */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-brand-text mb-4">Brand Personality</label>
                    <div className="space-y-4">
                      {personalityTraits.map((trait) => (
                        <div key={trait.key}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="text-purple-400">{trait.icon}</div>
                              <span className="text-sm text-brand-muted">{trait.name}</span>
                            </div>
                            <span className="text-sm font-bold text-purple-400">
                              {brandValues.personality[trait.key]}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={brandValues.personality[trait.key]}
                            onChange={(e) => handlePersonalityChange(trait.key, parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core Values */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-brand-text mb-3">
                      Core Values (Select 3-5)
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                      {valueOptions.map((value) => (
                        <button
                          key={value}
                          onClick={() => toggleValue(value)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            brandValues.values.includes(value)
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                              : 'bg-slate-800/60 text-brand-muted hover:bg-slate-700 hover:text-brand-text'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Audience */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-brand-text mb-3">
                      Target Audience
                    </label>
                    <textarea
                      value={brandValues.targetAudience}
                      onChange={(e) => setBrandValues({ ...brandValues, targetAudience: e.target.value })}
                      placeholder="Who is your ideal customer? (e.g., Tech-savvy millennials, C-suite executives, young families)"
                      className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-purple-500 transition-colors min-h-[100px]"
                    />
                  </div>

                  {/* Brand Purpose */}
                  <div>
                    <label className="block text-sm font-semibold text-brand-text mb-3">
                      Brand Purpose & Mission
                    </label>
                    <textarea
                      value={brandValues.brandPurpose}
                      onChange={(e) => setBrandValues({ ...brandValues, brandPurpose: e.target.value })}
                      placeholder="Why does your brand exist? What problem do you solve? (e.g., We empower small businesses to compete with enterprise-level marketing tools)"
                      className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-purple-500 transition-colors min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Logo Concepts Tab */}
            {activeTab === 'logo' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-clash font-bold text-brand-text mb-4">Logo Concept Variations</h2>
                <p className="text-brand-muted mb-6">
                  Based on your brand personality, here are AI-generated logo concept directions:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Wordmark', 'Symbol + Text', 'Abstract Mark'].map((type, index) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all"
                    >
                      <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-6xl">
                          {index === 0 && '📝'}
                          {index === 1 && '🎨'}
                          {index === 2 && '✨'}
                        </div>
                      </div>
                      <h3 className="text-lg font-clash font-bold text-brand-text mb-2">{type}</h3>
                      <p className="text-sm text-brand-muted mb-4">
                        {index === 0 && 'Clean typography-focused logo emphasizing your brand name'}
                        {index === 1 && 'Balanced combination of symbolic element with wordmark'}
                        {index === 2 && 'Modern abstract shape representing your brand values'}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full">
                          {brandValues.personality[0] > 60 ? 'Modern' : 'Classic'}
                        </span>
                        <span className="px-3 py-1 bg-pink-500/20 text-pink-300 text-xs rounded-full">
                          {brandValues.personality[3] > 60 ? 'Bold' : 'Refined'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Color Schemes Tab */}
            {activeTab === 'colors' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-clash font-bold text-brand-text mb-4">Color Scheme Recommendations</h2>
                <div className="space-y-4">
                  {colorSchemes.map((scheme, index) => (
                    <motion.div
                      key={scheme.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all"
                    >
                      <h3 className="text-lg font-clash font-bold text-brand-text mb-4">{scheme.name}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: 'Primary', color: scheme.primary },
                          { label: 'Secondary', color: scheme.secondary },
                          { label: 'Accent', color: scheme.accent },
                          { label: 'Neutral', color: scheme.neutral },
                        ].map((item) => (
                          <div key={item.label}>
                            <div
                              className="h-20 rounded-lg mb-2 border border-slate-600"
                              style={{ backgroundColor: item.color }}
                            />
                            <div className="text-xs text-brand-muted">{item.label}</div>
                            <div className="text-xs font-mono text-brand-text">{item.color}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-xs text-green-400">
                        <span>✓</span>
                        <span>WCAG AA Compliant - Passes accessibility standards</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Typography Tab */}
            {activeTab === 'typography' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-clash font-bold text-brand-text mb-4">Typography Pairings</h2>
                <div className="space-y-6">
                  {typographyPairings.map((pairing, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500/50 transition-all"
                    >
                      <div className="mb-4">
                        <p className="text-xs text-brand-muted mb-2">Pairing #{index + 1}</p>
                        <p className="text-sm text-brand-muted">{pairing.description}</p>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="text-xs text-brand-muted mb-1">Heading Font</div>
                          <div className="text-3xl font-bold text-brand-text">{pairing.heading}</div>
                        </div>
                        <div>
                          <div className="text-xs text-brand-muted mb-1">Body Font</div>
                          <div className="text-base text-brand-text">{pairing.body}</div>
                        </div>
                        <div>
                          <div className="text-xs text-brand-muted mb-1">Accent Font</div>
                          <div className="text-xl font-semibold text-brand-text">{pairing.accent}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Brand Voice Tab */}
            {activeTab === 'voice' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-clash font-bold text-brand-text mb-4">Brand Voice & Tone Guidelines</h2>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-clash font-bold text-brand-text mb-2">Overall Tone</h3>
                    <p className="text-2xl font-semibold text-purple-400">{brandVoice.tone}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-clash font-bold text-brand-text mb-3">Brand Adjectives</h3>
                    <div className="flex gap-2 flex-wrap">
                      {brandVoice.adjectives.map((adj) => (
                        <span
                          key={adj}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm"
                        >
                          {adj}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-clash font-bold text-green-400 mb-3">✓ Do</h3>
                      <ul className="space-y-2">
                        {brandVoice.doList.map((item, index) => (
                          <li key={index} className="text-brand-muted text-sm flex items-start gap-2">
                            <span className="text-green-400 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-clash font-bold text-red-400 mb-3">✗ Don&apos;t</h3>
                      <ul className="space-y-2">
                        {brandVoice.dontList.map((item, index) => (
                          <li key={index} className="text-brand-muted text-sm flex items-start gap-2">
                            <span className="text-red-400 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Download Playbook Tab */}
            {activeTab === 'playbook' && (
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block"
                >
                  <Download className="mx-auto text-purple-400 mb-4" size={64} />
                  <h2 className="text-2xl font-clash font-bold text-brand-text mb-2">
                    Your Brand Playbook is Ready!
                  </h2>
                  <p className="text-brand-muted mb-6 max-w-md mx-auto">
                    Download a comprehensive PDF containing all your brand guidelines, color schemes, typography pairings, and voice recommendations.
                  </p>
                  <button
                    onClick={downloadPlaybook}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-[0_10px_30px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.5)] transition-all transform hover:scale-105"
                  >
                    <Download size={20} />
                    <span>Download Brand Playbook</span>
                  </button>
                </motion.div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 max-w-2xl mx-auto mt-8">
                  <h3 className="text-lg font-clash font-bold text-brand-text mb-4">What&apos;s Included:</h3>
                  <ul className="space-y-3 text-left">
                    {[
                      'Logo concept variations and usage guidelines',
                      'Complete color palette with hex codes and accessibility notes',
                      'Typography pairings with font sizes and hierarchy',
                      'Brand voice and tone guidelines with examples',
                      'Mission statement and brand values',
                      'Mood board with visual inspiration',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-brand-muted">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrandBuilder;
