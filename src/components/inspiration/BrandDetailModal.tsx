import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Palette, Type, Lightbulb, Info, ExternalLink, BookOpen, TrendingUp, BarChart3 } from 'lucide-react';
import OptimizedImage from '../common/OptimizedImage';
import BrandColorPalette from './BrandColorPalette';
import TypographyShowcase from './TypographyShowcase';
import RelatedBrands from './RelatedBrands';
import { BrandQuiz, LearningPath, BrandComparisonInsights } from './LearningComponents';
import inspirationsData from '../../data/inspirations.json';
import brandIdentitiesData from '../../data/brand-identities.json';

interface BrandInfo {
  colors?: any;
  typography?: any;
  grid?: any;
}

interface DesignPrinciple {
  [key: string]: string;
}

interface EducationalContent {
  history?: string;
  philosophy?: string;
  applications?: string;
}

interface VisualSpecs {
  logo?: {
    type?: string;
    style?: string;
    usage?: string;
    variations?: string;
    flexibility?: string;
    symbolism?: string;
    alternate?: string;
    clearspace?: string;
    packaging?: string;
    motif?: string;
    theme?: string;
    aesthetic?: string;
  };
  spacing?: string;
  style?: string;
  packaging?: string;
  layout?: string;
}

interface BrandIdentity {
  id: string;
  title: string;
  category: string;
  image: string;
  reflection: string;
  details: string;
  brandId?: string;
  sourceUrl?: string;
  year?: number;
  designer?: string;
  brandInfo?: BrandInfo;
  designPrinciples?: string[];
  visualSpecs?: VisualSpecs;
  educationalContent?: EducationalContent;
  quiz?: any[];
  comparisonData?: any;
}

interface BrandDetailModalProps {
  item: BrandIdentity;
  brandData?: BrandIdentity | null;
  onClose: () => void;
  onBrandClick?: (brand: BrandIdentity) => void;
}

const BrandDetailModal: React.FC<BrandDetailModalProps> = ({
  item,
  brandData,
  onClose,
  onBrandClick,
}) => {
  const allBrands = inspirationsData as any[];
  const allBrandIdentities = brandIdentitiesData as any[];
  const [activeTab, setActiveTab] = useState<'overview' | 'colors' | 'typography' | 'principles' | 'learn'>(
    'overview'
  );
  const [learnSubTab, setLearnSubTab] = useState<'quiz' | 'path' | 'compare'>('quiz');
  const [comparisonBrand, setComparisonBrand] = useState<BrandIdentity | null>(null);

  const fullBrandData = brandData || item;

  // Get quiz data from brand identities if available
  const quizData = useMemo(() => {
    const brandIdentity = allBrandIdentities.find((b: any) => b.id === fullBrandData.id);
    return brandIdentity?.quiz || fullBrandData.quiz || [];
  }, [fullBrandData, allBrandIdentities]);

  // Get comparison data
  const comparisonData = useMemo(() => {
    if (!comparisonBrand) return null;
    const brandIdentity1 = allBrandIdentities.find((b: any) => b.id === fullBrandData.id);
    const brandIdentity2 = allBrandIdentities.find((b: any) => b.id === comparisonBrand.id);
    return brandIdentity1?.comparisonData || brandIdentity2?.comparisonData || null;
  }, [comparisonBrand, fullBrandData, allBrandIdentities]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'principles', label: 'Principles', icon: Lightbulb },
    { id: 'learn', label: 'Learn', icon: BookOpen },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header with Image */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="h-64 overflow-hidden">
            <OptimizedImage
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                {item.category}
              </span>
              {fullBrandData.year && (
                <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                  {fullBrandData.year}
                </span>
              )}
              {fullBrandData.designer && (
                <span className="px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                  by {fullBrandData.designer}
                </span>
              )}
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
            {fullBrandData.sourceUrl && (
              <a
                href={fullBrandData.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm transition-colors"
              >
                View Source <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                    isActive
                      ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Reflection
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {item.reflection}
                  </p>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Deeper Insights
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {item.details}
                  </p>
                </div>

                {fullBrandData.educationalContent && (
                  <div className="space-y-6">
                    {fullBrandData.educationalContent.history && (
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          History
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {fullBrandData.educationalContent.history}
                        </p>
                      </div>
                    )}

                    {fullBrandData.educationalContent.philosophy && (
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          Philosophy
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {fullBrandData.educationalContent.philosophy}
                        </p>
                      </div>
                    )}

                    {fullBrandData.educationalContent.applications && (
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          Applications
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {fullBrandData.educationalContent.applications}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {fullBrandData.visualSpecs && (
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Visual Specifications
                    </h4>
                    {fullBrandData.visualSpecs.logo && (
                      <div className="space-y-2 mb-4">
                        {fullBrandData.visualSpecs.logo.type && (
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Logo Type:{' '}
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {fullBrandData.visualSpecs.logo.type}
                            </span>
                          </div>
                        )}
                        {fullBrandData.visualSpecs.logo.style && (
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Style:{' '}
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {fullBrandData.visualSpecs.logo.style}
                            </span>
                          </div>
                        )}
                        {fullBrandData.visualSpecs.logo.usage && (
                          <div>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Usage:{' '}
                            </span>
                            <span className="text-gray-900 dark:text-white">
                              {fullBrandData.visualSpecs.logo.usage}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    {fullBrandData.visualSpecs.spacing && (
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Spacing:{' '}
                        </span>
                        <span className="text-gray-900 dark:text-white">
                          {fullBrandData.visualSpecs.spacing}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'colors' && (
              <motion.div
                key="colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {fullBrandData.brandInfo?.colors ? (
                  <BrandColorPalette colors={fullBrandData.brandInfo.colors} brandName={item.title} />
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No color information available
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'typography' && (
              <motion.div
                key="typography"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {fullBrandData.brandInfo?.typography ? (
                  <TypographyShowcase
                    typography={fullBrandData.brandInfo.typography}
                    brandName={item.title}
                  />
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No typography information available
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'principles' && (
              <motion.div
                key="principles"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {fullBrandData.designPrinciples && fullBrandData.designPrinciples.length > 0 ? (
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Design Principles
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {fullBrandData.designPrinciples.map((principle, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800"
                        >
                          <div className="flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                            <p className="text-gray-900 dark:text-white font-medium">{principle}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No design principles available
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'learn' && (
              <motion.div
                key="learn"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Learn Sub-tabs */}
                <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-4">
                  <button
                    onClick={() => setLearnSubTab('quiz')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      learnSubTab === 'quiz'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <BookOpen className="inline-block h-4 w-4 mr-2" />
                    Quiz
                  </button>
                  <button
                    onClick={() => setLearnSubTab('path')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      learnSubTab === 'path'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <TrendingUp className="inline-block h-4 w-4 mr-2" />
                    Learning Path
                  </button>
                  <button
                    onClick={() => setLearnSubTab('compare')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      learnSubTab === 'compare'
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <BarChart3 className="inline-block h-4 w-4 mr-2" />
                    Compare
                  </button>
                </div>

                {/* Quiz Sub-tab */}
                {learnSubTab === 'quiz' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BrandQuiz brandId={fullBrandData.id} quizData={quizData} />
                  </motion.div>
                )}

                {/* Learning Path Sub-tab */}
                {learnSubTab === 'path' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <LearningPath brandId={fullBrandData.id} />
                  </motion.div>
                )}

                {/* Compare Sub-tab */}
                {learnSubTab === 'compare' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {!comparisonBrand ? (
                      <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                          Compare with Another Brand
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Select a brand to compare with {fullBrandData.title}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                          {allBrands
                            .filter((brand: any) => brand.id !== fullBrandData.id)
                            .slice(0, 10)
                            .map((brand: any) => (
                              <button
                                key={brand.id}
                                onClick={() => {
                                  const fullBrand = allBrands.find((b: any) => b.id === brand.id);
                                  if (fullBrand) {
                                    setComparisonBrand(fullBrand as BrandIdentity);
                                  }
                                }}
                                className="p-3 text-left bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-amber-500 dark:hover:border-amber-500 transition-colors"
                              >
                                <p className="font-medium text-gray-900 dark:text-white text-sm">
                                  {brand.title}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {brand.category}
                                </p>
                              </button>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Comparing {fullBrandData.title} vs {comparisonBrand.title}
                          </h4>
                          <button
                            onClick={() => setComparisonBrand(null)}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                          >
                            Change Brand
                          </button>
                        </div>
                        {comparisonData ? (
                          <BrandComparisonInsights comparison={comparisonData} />
                        ) : (
                          <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-blue-800 dark:text-blue-200 text-sm">
                              Comparison insights are being generated. This feature uses AI to analyze
                              similarities and differences between brands.
                            </p>
                            <p className="text-blue-600 dark:text-blue-300 text-xs mt-2">
                              To generate comparison data, use the enhanced extraction tools.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Related Brands */}
          {activeTab === 'overview' && (
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <RelatedBrands
                currentBrand={item}
                allBrands={allBrands}
                onBrandClick={brand => {
                  const fullBrand = allBrands.find(b => b.id === brand.id);
                  if (fullBrand) {
                    onBrandClick?.(fullBrand as BrandIdentity);
                    onClose();
                  }
                }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BrandDetailModal;

