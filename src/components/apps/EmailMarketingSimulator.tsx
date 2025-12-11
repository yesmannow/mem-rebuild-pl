import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  TrendingUp,
  Users,
  Target,
  Clock,
  Zap,
  BarChart3,
  Eye,
  MousePointer,
  CheckCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface EmailVariant {
  id: string;
  name: string;
  subjectLine: string;
  preheader: string;
  sendTime: string;
  personalization: boolean;
  emoji: boolean;
}

interface CampaignMetrics {
  openRate: number;
  clickRate: number;
  conversionRate: number;
  revenue: number;
  subscribers: number;
}

const EmailMarketingSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'builder' | 'testing' | 'segments' | 'analytics'>('builder');
  const [variants, setVariants] = useState<EmailVariant[]>([
    {
      id: 'A',
      name: 'Variant A (Control)',
      subjectLine: '🎯 Limited Time Offer - Save 30%',
      preheader: 'Don\'t miss out on our biggest sale',
      sendTime: '09:00',
      personalization: true,
      emoji: true,
    },
    {
      id: 'B',
      name: 'Variant B',
      subjectLine: 'Exclusive Deal Just for You',
      preheader: 'Your personalized discount inside',
      sendTime: '14:00',
      personalization: true,
      emoji: false,
    },
    {
      id: 'C',
      name: 'Variant C',
      subjectLine: 'Save Big This Week Only',
      preheader: 'Limited inventory - shop now',
      sendTime: '18:00',
      personalization: false,
      emoji: false,
    },
  ]);

  const [selectedSegment, setSelectedSegment] = useState('engaged');
  const [testDuration, setTestDuration] = useState(7);

  const segments = [
    { id: 'engaged', name: 'Engaged Subscribers', size: 45000, avgConversion: 3.2 },
    { id: 'inactive', name: 'Inactive (30+ days)', size: 15000, avgConversion: 0.8 },
    { id: 'new', name: 'New Subscribers', size: 8000, avgConversion: 5.1 },
    { id: 'vip', name: 'VIP Customers', size: 2500, avgConversion: 12.5 },
  ];

  // Calculate email performance based on various factors
  const calculateMetrics = (variant: EmailVariant, segment: typeof segments[0]): CampaignMetrics => {
    let baseOpenRate = 22; // Industry average
    let baseClickRate = 2.8;
    let baseConversionRate = segment.avgConversion;

    // Subject line impact
    if (variant.emoji) baseOpenRate += 3;
    if (variant.personalization) baseOpenRate += 5;
    if (variant.subjectLine.length < 50) baseOpenRate += 2;
    
    // Send time impact
    const hour = parseInt(variant.sendTime.split(':')[0]);
    if (hour >= 9 && hour <= 11) baseOpenRate += 4; // Morning peak
    if (hour >= 14 && hour <= 16) baseOpenRate += 2; // Afternoon peak
    if (hour >= 18 && hour <= 20) baseOpenRate += 3; // Evening peak

    // Preheader impact
    if (variant.preheader.length > 0) baseOpenRate += 2;
    
    // Click rate correlation with open rate
    baseClickRate = (baseOpenRate / 22) * 2.8;
    
    // Personalization impact on clicks
    if (variant.personalization) baseClickRate += 0.8;

    // Conversion rate is influenced by clicks
    baseConversionRate = (baseClickRate / 2.8) * baseConversionRate;

    const subscribers = segment.size;
    const opens = Math.round((subscribers * baseOpenRate) / 100);
    const clicks = Math.round((opens * (baseClickRate / baseOpenRate)) * 100);
    const conversions = Math.round((clicks * baseConversionRate) / 100);
    const avgOrderValue = 85;
    const revenue = conversions * avgOrderValue;

    return {
      openRate: parseFloat(baseOpenRate.toFixed(1)),
      clickRate: parseFloat(baseClickRate.toFixed(1)),
      conversionRate: parseFloat(baseConversionRate.toFixed(2)),
      revenue,
      subscribers,
    };
  };

  const variantMetrics = useMemo(() => {
    const segment = segments.find(s => s.id === selectedSegment) || segments[0];
    return variants.map(variant => ({
      variant: variant.name,
      ...calculateMetrics(variant, segment),
    }));
  }, [variants, selectedSegment]);

  // Statistical significance calculation
  const calculateSignificance = (controlMetric: number, variantMetric: number, sampleSize: number) => {
    const diff = Math.abs(variantMetric - controlMetric);
    const pooled = (controlMetric + variantMetric) / 2;
    const se = Math.sqrt((pooled * (100 - pooled)) / sampleSize);
    const zScore = diff / se;
    
    // Simplified confidence level
    if (zScore > 2.576) return { confidence: 99, significant: true };
    if (zScore > 1.96) return { confidence: 95, significant: true };
    if (zScore > 1.645) return { confidence: 90, significant: true };
    return { confidence: Math.round(Math.min(zScore * 50, 85)), significant: false };
  };

  const tabs = [
    { id: 'builder', label: 'Email Builder', icon: <Mail size={16} /> },
    { id: 'testing', label: 'A/B/C Testing', icon: <Zap size={16} /> },
    { id: 'segments', label: 'Segments', icon: <Users size={16} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} /> },
  ];

  const COLORS = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-4">
            <Mail className="text-blue-400" size={16} />
            <span className="text-xs uppercase tracking-[0.3em] text-blue-300">Campaign Lab</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mt-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Email Marketing Simulator
          </h1>
          <p className="text-brand-muted text-lg mt-2 max-w-2xl mx-auto">
            Advanced email campaign simulator with A/B testing, segment targeting, and conversion tracking
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="bg-slate-900/70 backdrop-blur-lg border border-blue-500/20 rounded-2xl p-2 inline-flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_10px_30px_rgba(59,130,246,0.4)]'
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
          >
            {/* Email Builder Tab */}
            {activeTab === 'builder' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-brand-text mb-4">Email Template Designer</h2>
                
                {variants.map((variant, index) => (
                  <motion.div
                    key={variant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-brand-text">{variant.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        variant.id === 'A' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {variant.id === 'A' ? 'Control' : 'Test'}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-brand-text mb-2">
                          Subject Line
                        </label>
                        <input
                          type="text"
                          value={variant.subjectLine}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[index].subjectLine = e.target.value;
                            setVariants(newVariants);
                          }}
                          className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 text-brand-text focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        <div className="mt-1 text-xs text-brand-muted">
                          Length: {variant.subjectLine.length} chars (Optimal: 30-50)
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-brand-text mb-2">
                          Preheader Text
                        </label>
                        <input
                          type="text"
                          value={variant.preheader}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[index].preheader = e.target.value;
                            setVariants(newVariants);
                          }}
                          className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 text-brand-text focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-brand-text mb-2">
                          Send Time
                        </label>
                        <input
                          type="time"
                          value={variant.sendTime}
                          onChange={(e) => {
                            const newVariants = [...variants];
                            newVariants[index].sendTime = e.target.value;
                            setVariants(newVariants);
                          }}
                          className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 text-brand-text focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-brand-muted cursor-pointer">
                          <input
                            type="checkbox"
                            checked={variant.personalization}
                            onChange={(e) => {
                              const newVariants = [...variants];
                              newVariants[index].personalization = e.target.checked;
                              setVariants(newVariants);
                            }}
                            className="rounded bg-slate-800 border-slate-600 text-blue-500 focus:ring-blue-500"
                          />
                          <span>Use Personalization</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm text-brand-muted cursor-pointer">
                          <input
                            type="checkbox"
                            checked={variant.emoji}
                            onChange={(e) => {
                              const newVariants = [...variants];
                              newVariants[index].emoji = e.target.checked;
                              setVariants(newVariants);
                            }}
                            className="rounded bg-slate-800 border-slate-600 text-blue-500 focus:ring-blue-500"
                          />
                          <span>Include Emoji</span>
                        </label>
                      </div>
                    </div>

                    {/* Predicted Performance */}
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={16} className="text-blue-400" />
                        <span className="text-sm font-semibold text-brand-text">Predicted Performance</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {(() => {
                          const segment = segments.find(s => s.id === selectedSegment) || segments[0];
                          const metrics = calculateMetrics(variant, segment);
                          return (
                            <>
                              <div>
                                <div className="text-xs text-brand-muted">Open Rate</div>
                                <div className="text-lg font-bold text-blue-400">{metrics.openRate}%</div>
                              </div>
                              <div>
                                <div className="text-xs text-brand-muted">Click Rate</div>
                                <div className="text-lg font-bold text-purple-400">{metrics.clickRate}%</div>
                              </div>
                              <div>
                                <div className="text-xs text-brand-muted">Est. Revenue</div>
                                <div className="text-lg font-bold text-green-400">${metrics.revenue.toLocaleString()}</div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* A/B/C Testing Tab */}
            {activeTab === 'testing' && (
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-brand-text mb-6">Multi-Variant Testing Results</h2>
                  
                  {/* Test Configuration */}
                  <div className="mb-6 grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-text mb-2">
                        Target Segment
                      </label>
                      <select
                        value={selectedSegment}
                        onChange={(e) => setSelectedSegment(e.target.value)}
                        className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 text-brand-text focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        {segments.map((segment) => (
                          <option key={segment.id} value={segment.id}>
                            {segment.name} ({segment.size.toLocaleString()} subscribers)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-text mb-2">
                        Test Duration (Days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={testDuration}
                        onChange={(e) => setTestDuration(parseInt(e.target.value))}
                        className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 text-brand-text focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Performance Comparison Chart */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-brand-text mb-4">Performance Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={variantMetrics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="variant" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Bar dataKey="openRate" fill="#3b82f6" name="Open Rate %" />
                        <Bar dataKey="clickRate" fill="#8b5cf6" name="Click Rate %" />
                        <Bar dataKey="conversionRate" fill="#10b981" name="Conversion Rate %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Statistical Significance */}
                  <div>
                    <h3 className="text-lg font-bold text-brand-text mb-4">Statistical Significance</h3>
                    <div className="space-y-3">
                      {variantMetrics.slice(1).map((variant, index) => {
                        const control = variantMetrics[0];
                        const significance = calculateSignificance(
                          control.openRate,
                          variant.openRate,
                          variant.subscribers
                        );
                        return (
                          <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
                          >
                            <div>
                              <div className="font-semibold text-brand-text">{variant.variant} vs Control</div>
                              <div className="text-sm text-brand-muted">
                                Open Rate Lift: {(variant.openRate - control.openRate).toFixed(1)}%
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-lg font-bold ${
                                significance.significant ? 'text-green-400' : 'text-yellow-400'
                              }`}>
                                {significance.confidence}% Confidence
                              </div>
                              <div className="text-xs text-brand-muted">
                                {significance.significant ? '✓ Statistically Significant' : '⚠ Not Significant'}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Segments Tab */}
            {activeTab === 'segments' && (
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-brand-text mb-6">Audience Segments</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-brand-text mb-4">Segment Distribution</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={segments}
                            dataKey="size"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={(entry) => `${entry.name}: ${entry.size.toLocaleString()}`}
                          >
                            {segments.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-brand-text mb-4">Segment Performance</h3>
                      <div className="space-y-3">
                        {segments.map((segment, index) => (
                          <div
                            key={segment.id}
                            className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer"
                            onClick={() => setSelectedSegment(segment.id)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: COLORS[index] }}
                                />
                                <span className="font-semibold text-brand-text">{segment.name}</span>
                              </div>
                              {selectedSegment === segment.id && (
                                <CheckCircle size={16} className="text-green-400" />
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <div className="text-brand-muted">Size</div>
                                <div className="font-bold text-brand-text">{segment.size.toLocaleString()}</div>
                              </div>
                              <div>
                                <div className="text-brand-muted">Avg Conversion</div>
                                <div className="font-bold text-green-400">{segment.avgConversion}%</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-brand-text mb-6">Campaign Analytics Dashboard</h2>
                  
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {(() => {
                      const totalMetrics = variantMetrics.reduce(
                        (acc, curr) => ({
                          openRate: acc.openRate + curr.openRate,
                          clickRate: acc.clickRate + curr.clickRate,
                          revenue: acc.revenue + curr.revenue,
                        }),
                        { openRate: 0, clickRate: 0, revenue: 0 }
                      );
                      const avgMetrics = {
                        openRate: totalMetrics.openRate / variantMetrics.length,
                        clickRate: totalMetrics.clickRate / variantMetrics.length,
                        revenue: totalMetrics.revenue,
                      };

                      return (
                        <>
                          <div className="p-4 bg-slate-800/50 rounded-lg border border-blue-500/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Eye size={16} className="text-blue-400" />
                              <span className="text-xs text-brand-muted">Avg Open Rate</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-400">{avgMetrics.openRate.toFixed(1)}%</div>
                          </div>
                          <div className="p-4 bg-slate-800/50 rounded-lg border border-purple-500/30">
                            <div className="flex items-center gap-2 mb-2">
                              <MousePointer size={16} className="text-purple-400" />
                              <span className="text-xs text-brand-muted">Avg Click Rate</span>
                            </div>
                            <div className="text-2xl font-bold text-purple-400">{avgMetrics.clickRate.toFixed(1)}%</div>
                          </div>
                          <div className="p-4 bg-slate-800/50 rounded-lg border border-green-500/30">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp size={16} className="text-green-400" />
                              <span className="text-xs text-brand-muted">Total Revenue</span>
                            </div>
                            <div className="text-2xl font-bold text-green-400">${avgMetrics.revenue.toLocaleString()}</div>
                          </div>
                          <div className="p-4 bg-slate-800/50 rounded-lg border border-orange-500/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Target size={16} className="text-orange-400" />
                              <span className="text-xs text-brand-muted">Best Performer</span>
                            </div>
                            <div className="text-lg font-bold text-orange-400">
                              {variantMetrics.reduce((max, curr) => 
                                curr.openRate > max.openRate ? curr : max
                              ).variant.split(' ')[0]}
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  {/* Funnel Visualization */}
                  <div>
                    <h3 className="text-lg font-bold text-brand-text mb-4">Campaign Funnel</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={variantMetrics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="variant" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="openRate" stroke="#3b82f6" strokeWidth={2} name="Open Rate %" />
                        <Line type="monotone" dataKey="clickRate" stroke="#8b5cf6" strokeWidth={2} name="Click Rate %" />
                        <Line type="monotone" dataKey="conversionRate" stroke="#10b981" strokeWidth={2} name="Conversion %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmailMarketingSimulator;
