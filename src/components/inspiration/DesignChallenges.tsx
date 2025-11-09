import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Lightbulb, Sparkles, RotateCcw } from 'lucide-react';

interface DesignChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  principles: string[];
  timeEstimate: string;
}

const DESIGN_CHALLENGES: DesignChallenge[] = [
  {
    id: '1',
    title: 'Color Palette Extraction',
    description:
      'Choose 3 brands from the explorer and extract their primary colors. Create a new palette that combines elements from all three.',
    difficulty: 'beginner',
    principles: ['Color Theory', 'Harmony', 'Contrast'],
    timeEstimate: '30 minutes',
  },
  {
    id: '2',
    title: 'Typography Pairing Challenge',
    description:
      'Select two brands with contrasting typography styles. Design a logo that combines both approaches while maintaining readability.',
    difficulty: 'intermediate',
    principles: ['Typography', 'Hierarchy', 'Balance'],
    timeEstimate: '1 hour',
  },
  {
    id: '3',
    title: 'Brand Identity System',
    description:
      'Create a complete brand identity for a fictional company using principles from at least 3 different brands in the explorer.',
    difficulty: 'advanced',
    principles: ['System Design', 'Consistency', 'Scalability'],
    timeEstimate: '3-4 hours',
  },
  {
    id: '4',
    title: 'Principle Remix',
    description:
      'Take one design principle from a large brand (like IBM) and apply it to a small brand aesthetic (like Folklorious).',
    difficulty: 'intermediate',
    principles: ['Adaptation', 'Innovation', 'Context'],
    timeEstimate: '1.5 hours',
  },
  {
    id: '5',
    title: 'Minimalist Transformation',
    description:
      'Choose a brand with vibrant colors and transform it into a minimalist version while retaining its core identity.',
    difficulty: 'advanced',
    principles: ['Minimalism', 'Essence', 'Reduction'],
    timeEstimate: '2 hours',
  },
];

const DesignChallenges: React.FC = () => {
  const [currentChallenge, setCurrentChallenge] = useState<DesignChallenge | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  const getRandomChallenge = () => {
    const available = DESIGN_CHALLENGES.filter(c => !completedChallenges.has(c.id));
    if (available.length === 0) {
      setCompletedChallenges(new Set());
      setCurrentChallenge(DESIGN_CHALLENGES[Math.floor(Math.random() * DESIGN_CHALLENGES.length)]);
    } else {
      setCurrentChallenge(available[Math.floor(Math.random() * available.length)]);
    }
  };

  const markComplete = () => {
    if (currentChallenge) {
      setCompletedChallenges(new Set([...completedChallenges, currentChallenge.id]));
      setCurrentChallenge(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            <Target className="h-10 w-10 text-amber-500" />
            Design Challenges
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Put your learning into practice with hands-on design challenges inspired by these brands
          </p>
        </div>

        {!currentChallenge ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 border border-gray-200 dark:border-gray-700">
              <Sparkles className="h-16 w-16 text-amber-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready for a Challenge?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                Get a random design challenge based on the brands you've explored. Apply what
                you've learned and create something new!
              </p>
              <button
                onClick={getRandomChallenge}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
              >
                Get Random Challenge
              </button>
            </div>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChallenge.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentChallenge.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                        currentChallenge.difficulty
                      )}`}
                    >
                      {currentChallenge.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {currentChallenge.description}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentChallenge(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Design Principles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentChallenge.principles.map((principle, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs rounded-full"
                      >
                        {principle}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Time Estimate
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">{currentChallenge.timeEstimate}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={markComplete}
                  className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors"
                >
                  Mark as Complete
                </button>
                <button
                  onClick={getRandomChallenge}
                  className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Get Another Challenge
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {completedChallenges.size > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Completed {completedChallenges.size} of {DESIGN_CHALLENGES.length} challenges
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DesignChallenges;

