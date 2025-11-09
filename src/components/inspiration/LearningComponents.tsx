/**
 * Interactive Learning Components for Brand Inspiration Page
 * ==========================================================
 *
 * These components enhance the educational value of the inspiration page
 * by providing interactive learning experiences.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Lightbulb,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  BarChart3,
  Sparkles
} from 'lucide-react';

/**
 * Brand Quiz Component
 * Interactive quiz to test knowledge about brand identities
 */
export const BrandQuiz: React.FC<{ brandId: string; quizData?: any[] }> = ({ brandId, quizData = [] }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!quizData || quizData.length === 0) {
    return (
      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400">Quiz questions coming soon!</p>
      </div>
    );
  }

  const question = quizData[currentQuestion];
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    const percentage = Math.round((score / quizData.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg text-center"
      >
        <Award className="h-16 w-16 mx-auto mb-4 text-amber-500" />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quiz Complete!</h3>
        <p className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">{score}/{quizData.length}</p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">{percentage}% Correct</p>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setSelectedAnswer(null);
            setShowExplanation(false);
            setCompleted(false);
          }}
          className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          Retake Quiz
        </button>
      </motion.div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Brand Knowledge Quiz
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Question {currentQuestion + 1} of {quizData.length}
        </span>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
          <motion.div
            className="bg-amber-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-lg text-gray-900 dark:text-white mb-6">{question.question}</p>
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option: string, index: number) => {
          const isSelected = selectedAnswer === index;
          const isCorrectOption = index === question.correctAnswer;
          const showResult = showExplanation;

          return (
            <button
              key={index}
              onClick={() => !showExplanation && handleAnswer(index)}
              disabled={showExplanation}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                showResult && isCorrectOption
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : showResult && isSelected && !isCorrectOption
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : isSelected
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-900 dark:text-white">{option}</span>
                {showResult && isCorrectOption && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                {showResult && isSelected && !isCorrectOption && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showExplanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4"
        >
          <div className="flex items-start gap-2">
            <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200 mb-1">Explanation</p>
              <p className="text-sm text-blue-800 dark:text-blue-300">{question.explanation}</p>
            </div>
          </div>
        </motion.div>
      )}

      {showExplanation && (
        <button
          onClick={handleNext}
          className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
        >
          {currentQuestion < quizData.length - 1 ? 'Next Question' : 'View Results'}
        </button>
      )}
    </div>
  );
};

/**
 * Brand Comparison Insights Component
 * Shows AI-generated comparison between brands
 */
export const BrandComparisonInsights: React.FC<{ comparison: any }> = ({ comparison }) => {
  if (!comparison) return null;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Comparison Insights
      </h3>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Similarities
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {comparison.similarities?.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            Differences
          </h4>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {comparison.differences?.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {comparison.lessons && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              Design Lessons
            </h4>
            <p className="text-gray-700 dark:text-gray-300">{comparison.lessons}</p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Learning Path Component
 * Guides users through learning about brand identity
 */
export const LearningPath: React.FC<{ brandId: string }> = ({ brandId }) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps = [
    { id: 'colors', title: 'Explore Color Palette', icon: '🎨' },
    { id: 'typography', title: 'Study Typography', icon: '📝' },
    { id: 'principles', title: 'Understand Design Principles', icon: '💡' },
    { id: 'quiz', title: 'Take the Quiz', icon: '📚' },
    { id: 'compare', title: 'Compare with Other Brands', icon: '⚖️' }
  ];

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Learning Path
      </h3>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isCompleted
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700'
              }`}
              onClick={() => toggleStep(step.id)}
            >
              <span className="text-2xl">{step.icon}</span>
              <div className="flex-1">
                <p className={`font-medium ${isCompleted ? 'text-green-700 dark:text-green-300' : 'text-gray-900 dark:text-white'}`}>
                  {step.title}
                </p>
              </div>
              {isCompleted && (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              )}
            </motion.div>
          );
        })}
      </div>

      {completedSteps.length === steps.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg text-center"
        >
          <Award className="h-8 w-8 mx-auto mb-2 text-amber-500" />
          <p className="font-semibold text-gray-900 dark:text-white">Congratulations! You've completed the learning path!</p>
        </motion.div>
      )}
    </div>
  );
};

export default {
  BrandQuiz,
  BrandComparisonInsights,
  LearningPath
};

