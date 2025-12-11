import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Share2,
  TrendingUp,
  Users,
  Calendar,
  Heart,
  MessageCircle,
  Eye,
  DollarSign,
  Clock,
  Zap,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

interface Platform {
  id: string;
  name: string;
  icon: string;
  baseEngagement: number;
  audienceSize: number;
  cpm: number;
}

interface Post {
  id: string;
  platform: string;
  contentType: string;
  postTime: string;
  hashtags: number;
  influencerCollaboration: boolean;
}

interface CampaignMetrics {
  reach: number;
  impressions: number;
  engagement: number;
  clicks: number;
  conversions: number;
  revenue: number;
  roi: number;
}

const SocialMediaSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'planner' | 'content' | 'analytics' | 'influencer'>('planner');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram', 'linkedin']);
  const [budget, setBudget] = useState(5000);
  const [campaignDuration, setCampaignDuration] = useState(30);

  const platforms: Platform[] = [
    { id: 'instagram', name: 'Instagram', icon: '📸', baseEngagement: 1.2, audienceSize: 150000, cpm: 8.50 },
    { id: 'linkedin', name: 'LinkedIn', icon: '💼', baseEngagement: 0.54, audienceSize: 50000, cpm: 12.00 },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦', baseEngagement: 0.045, audienceSize: 80000, cpm: 6.75 },
    { id: 'facebook', name: 'Facebook', icon: '👍', baseEngagement: 0.18, audienceSize: 200000, cpm: 7.25 },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', baseEngagement: 5.3, audienceSize: 120000, cpm: 10.00 },
  ];

  const contentTypes = [
    { id: 'image', name: 'Static Image', engagementMultiplier: 1.0, icon: '🖼️' },
    { id: 'carousel', name: 'Carousel', engagementMultiplier: 1.3, icon: '🎨' },
    { id: 'video', name: 'Video', engagementMultiplier: 1.8, icon: '🎬' },
    { id: 'story', name: 'Story/Reel', engagementMultiplier: 2.1, icon: '⚡' },
    { id: 'live', name: 'Live Stream', engagementMultiplier: 3.5, icon: '🔴' },
  ];

  const bestPostingTimes = {
    instagram: ['09:00', '12:00', '19:00'],
    linkedin: ['08:00', '12:00', '17:00'],
    twitter: ['09:00', '15:00', '21:00'],
    facebook: ['13:00', '15:00', '19:00'],
    tiktok: ['18:00', '20:00', '22:00'],
  };

  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      platform: 'instagram',
      contentType: 'video',
      postTime: '19:00',
      hashtags: 12,
      influencerCollaboration: false,
    },
    {
      id: '2',
      platform: 'linkedin',
      contentType: 'carousel',
      postTime: '08:00',
      hashtags: 5,
      influencerCollaboration: false,
    },
  ]);

  // Calculate engagement based on multiple factors
  const calculateEngagement = (
    platform: Platform,
    contentType: string,
    postTime: string,
    hashtags: number,
    influencer: boolean
  ): number => {
    const contentMultiplier = contentTypes.find(ct => ct.id === contentType)?.engagementMultiplier || 1.0;
    const timeBonus = bestPostingTimes[platform.id as keyof typeof bestPostingTimes]?.includes(postTime) ? 1.25 : 1.0;
    const hashtagBonus = Math.min(hashtags / 30, 0.15); // Max 15% boost
    const influencerBonus = influencer ? 2.5 : 1.0;

    let engagement = platform.baseEngagement * contentMultiplier * timeBonus * (1 + hashtagBonus) * influencerBonus;
    return parseFloat(engagement.toFixed(2));
  };

  // Calculate campaign metrics
  const campaignMetrics = useMemo(() => {
    const budgetPerPlatform = budget / Math.max(selectedPlatforms.length, 1);
    
    return selectedPlatforms.map(platformId => {
      const platform = platforms.find(p => p.id === platformId)!;
      const platformPosts = posts.filter(p => p.platform === platformId);
      
      // Organic metrics
      const organicReach = platform.audienceSize * 0.15; // 15% organic reach
      const organicImpressions = organicReach * 2.3;
      
      // Paid metrics
      const paidImpressions = (budgetPerPlatform / platform.cpm) * 1000;
      const paidReach = paidImpressions * 0.85;
      
      // Total reach and impressions
      const totalReach = organicReach + paidReach;
      const totalImpressions = organicImpressions + paidImpressions;
      
      // Calculate average engagement rate for platform posts
      const avgEngagement = platformPosts.length > 0
        ? platformPosts.reduce((sum, post) => {
            return sum + calculateEngagement(
              platform,
              post.contentType,
              post.postTime,
              post.hashtags,
              post.influencerCollaboration
            );
          }, 0) / platformPosts.length
        : platform.baseEngagement;
      
      const engagement = Math.round(totalImpressions * (avgEngagement / 100));
      const clicks = Math.round(engagement * 0.12); // 12% of engaged users click
      const conversions = Math.round(clicks * 0.025); // 2.5% conversion rate
      const avgOrderValue = 125;
      const revenue = conversions * avgOrderValue;
      const roi = ((revenue - budgetPerPlatform) / budgetPerPlatform) * 100;
      
      return {
        platform: platform.name,
        reach: Math.round(totalReach),
        impressions: Math.round(totalImpressions),
        engagement,
        clicks,
        conversions,
        revenue,
        roi: parseFloat(roi.toFixed(1)),
        engagementRate: avgEngagement,
      };
    });
  }, [selectedPlatforms, budget, posts]);

  // Calculate viral coefficient
  const viralCoefficient = useMemo(() => {
    const avgShares = campaignMetrics.reduce((sum, m) => sum + (m.engagement * 0.03), 0) / Math.max(campaignMetrics.length, 1);
    const avgNewFollowers = avgShares * 0.15;
    const coefficient = avgNewFollowers / Math.max(selectedPlatforms.length, 1);
    return parseFloat(coefficient.toFixed(2));
  }, [campaignMetrics, selectedPlatforms]);

  const tabs = [
    { id: 'planner', label: 'Campaign Planner', icon: <Calendar size={16} /> },
    { id: 'content', label: 'Content Calendar', icon: <Share2 size={16} /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={16} /> },
    { id: 'influencer', label: 'Influencer ROI', icon: <Users size={16} /> },
  ];

  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platformId));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 rounded-full mb-4">
            <Share2 className="text-pink-400" size={16} />
            <span className="text-xs uppercase tracking-[0.3em] text-pink-300">Social Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-text mt-2 bg-gradient-to-r from-pink-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            Social Media Campaign Simulator
          </h1>
          <p className="text-brand-muted text-lg mt-2 max-w-2xl mx-auto">
            Multi-platform campaign builder with engagement optimization, content calendar, and influencer ROI calculator
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <div className="bg-slate-900/70 backdrop-blur-lg border border-pink-500/20 rounded-2xl p-2 inline-flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-[0_10px_30px_rgba(236,72,153,0.4)]'
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
            {/* Campaign Planner Tab */}
            {activeTab === 'planner' && (
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-brand-text mb-6">Multi-Platform Campaign Setup</h2>
                  
                  {/* Platform Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-brand-text mb-4">
                      Select Platforms
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {platforms.map((platform) => (
                        <button
                          key={platform.id}
                          onClick={() => togglePlatform(platform.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            selectedPlatforms.includes(platform.id)
                              ? 'bg-gradient-to-br from-pink-500/20 to-orange-500/20 border-pink-500 shadow-lg'
                              : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                          }`}
                        >
                          <div className="text-4xl mb-2">{platform.icon}</div>
                          <div className="text-sm font-semibold text-brand-text">{platform.name}</div>
                          <div className="text-xs text-brand-muted mt-1">
                            {(platform.audienceSize / 1000).toFixed(0)}K followers
                          </div>
                          <div className="text-xs text-brand-muted">
                            {platform.baseEngagement}% engagement
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget & Duration */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-brand-text mb-2">
                        Campaign Budget
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted">$</span>
                        <input
                          type="number"
                          min="100"
                          max="100000"
                          value={budget}
                          onChange={(e) => setBudget(parseInt(e.target.value) || 0)}
                          className="w-full pl-8 bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-pink-500 transition-colors"
                        />
                      </div>
                      <div className="mt-2 text-xs text-brand-muted">
                        ${(budget / Math.max(selectedPlatforms.length, 1)).toFixed(2)} per platform
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-text mb-2">
                        Campaign Duration (Days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="90"
                        value={campaignDuration}
                        onChange={(e) => setCampaignDuration(parseInt(e.target.value) || 1)}
                        className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-pink-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Quick Metrics Preview */}
                  <div>
                    <h3 className="text-lg font-bold text-brand-text mb-4">Campaign Projection</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {(() => {
                        const totals = campaignMetrics.reduce(
                          (acc, curr) => ({
                            reach: acc.reach + curr.reach,
                            engagement: acc.engagement + curr.engagement,
                            conversions: acc.conversions + curr.conversions,
                            revenue: acc.revenue + curr.revenue,
                          }),
                          { reach: 0, engagement: 0, conversions: 0, revenue: 0 }
                        );
                        return (
                          <>
                            <div className="p-4 bg-slate-800/50 rounded-lg border border-pink-500/30">
                              <div className="flex items-center gap-2 mb-2">
                                <Eye size={16} className="text-pink-400" />
                                <span className="text-xs text-brand-muted">Est. Reach</span>
                              </div>
                              <div className="text-2xl font-bold text-pink-400">
                                {(totals.reach / 1000).toFixed(1)}K
                              </div>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-lg border border-orange-500/30">
                              <div className="flex items-center gap-2 mb-2">
                                <Heart size={16} className="text-orange-400" />
                                <span className="text-xs text-brand-muted">Engagement</span>
                              </div>
                              <div className="text-2xl font-bold text-orange-400">
                                {(totals.engagement / 1000).toFixed(1)}K
                              </div>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-lg border border-purple-500/30">
                              <div className="flex items-center gap-2 mb-2">
                                <TrendingUp size={16} className="text-purple-400" />
                                <span className="text-xs text-brand-muted">Conversions</span>
                              </div>
                              <div className="text-2xl font-bold text-purple-400">
                                {totals.conversions}
                              </div>
                            </div>
                            <div className="p-4 bg-slate-800/50 rounded-lg border border-green-500/30">
                              <div className="flex items-center gap-2 mb-2">
                                <DollarSign size={16} className="text-green-400" />
                                <span className="text-xs text-brand-muted">Revenue</span>
                              </div>
                              <div className="text-2xl font-bold text-green-400">
                                ${(totals.revenue / 1000).toFixed(1)}K
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content Calendar Tab */}
            {activeTab === 'content' && (
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-brand-text mb-6">Content Calendar & Posting Schedule</h2>
                  
                  {/* Post List */}
                  <div className="space-y-4 mb-6">
                    {posts.map((post, index) => {
                      const platform = platforms.find(p => p.id === post.platform)!;
                      const contentType = contentTypes.find(ct => ct.id === post.contentType)!;
                      const engagement = calculateEngagement(
                        platform,
                        post.contentType,
                        post.postTime,
                        post.hashtags,
                        post.influencerCollaboration
                      );
                      const isOptimalTime = bestPostingTimes[post.platform as keyof typeof bestPostingTimes]?.includes(post.postTime);
                      
                      return (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-pink-500/50 transition-all"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="text-3xl">{platform.icon}</div>
                              <div>
                                <h3 className="text-lg font-bold text-brand-text">{platform.name} Post</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs px-2 py-1 bg-pink-500/20 text-pink-300 rounded">
                                    {contentType.icon} {contentType.name}
                                  </span>
                                  {isOptimalTime && (
                                    <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded flex items-center gap-1">
                                      <Zap size={12} />
                                      Optimal Time
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-pink-400">{engagement}%</div>
                              <div className="text-xs text-brand-muted">Est. Engagement</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-brand-muted mb-1">Post Time</div>
                              <div className="flex items-center gap-1 text-brand-text font-semibold">
                                <Clock size={14} />
                                {post.postTime}
                              </div>
                            </div>
                            <div>
                              <div className="text-brand-muted mb-1">Hashtags</div>
                              <div className="text-brand-text font-semibold">#{post.hashtags}</div>
                            </div>
                            <div>
                              <div className="text-brand-muted mb-1">Influencer</div>
                              <div className={`font-semibold ${post.influencerCollaboration ? 'text-purple-400' : 'text-brand-muted'}`}>
                                {post.influencerCollaboration ? '✓ Yes' : '✗ No'}
                              </div>
                            </div>
                            <div>
                              <div className="text-brand-muted mb-1">Content Boost</div>
                              <div className="text-orange-400 font-semibold">
                                +{((contentType.engagementMultiplier - 1) * 100).toFixed(0)}%
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Best Posting Times Reference */}
                  <div>
                    <h3 className="text-lg font-bold text-brand-text mb-4">Optimal Posting Times</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {Object.entries(bestPostingTimes).map(([platformId, times]) => {
                        const platform = platforms.find(p => p.id === platformId)!;
                        return (
                          <div key={platformId} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                            <div className="text-2xl mb-2">{platform.icon}</div>
                            <div className="text-sm font-semibold text-brand-text mb-2">{platform.name}</div>
                            <div className="space-y-1">
                              {times.map((time, idx) => (
                                <div key={idx} className="text-xs text-brand-muted flex items-center gap-1">
                                  <Clock size={10} />
                                  {time}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-brand-text mb-6">Cross-Platform Analytics Dashboard</h2>
                  
                  {/* Platform Performance Comparison */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-brand-text mb-4">Platform Performance Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={campaignMetrics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="platform" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Bar dataKey="engagement" fill="#ec4899" name="Engagement" />
                        <Bar dataKey="clicks" fill="#f97316" name="Clicks" />
                        <Bar dataKey="conversions" fill="#10b981" name="Conversions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Engagement Rate Radar */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-brand-text mb-4">Engagement Rate Analysis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={campaignMetrics}>
                        <PolarGrid stroke="#334155" />
                        <PolarAngleAxis dataKey="platform" stroke="#94a3b8" />
                        <PolarRadiusAxis stroke="#94a3b8" />
                        <Radar name="Engagement Rate" dataKey="engagementRate" stroke="#ec4899" fill="#ec4899" fillOpacity={0.6} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1e293b',
                            border: '1px solid #334155',
                            borderRadius: '8px',
                          }}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* ROI by Platform */}
                  <div>
                    <h3 className="text-lg font-bold text-brand-text mb-4">ROI by Platform</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {campaignMetrics.map((metrics, index) => (
                        <div
                          key={index}
                          className="p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-brand-text">{metrics.platform}</span>
                            <span className={`text-lg font-bold ${metrics.roi > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {metrics.roi > 0 ? '+' : ''}{metrics.roi}%
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <div className="text-brand-muted">Revenue</div>
                              <div className="text-brand-text font-semibold">${metrics.revenue.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-brand-muted">Conversions</div>
                              <div className="text-brand-text font-semibold">{metrics.conversions}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Viral Coefficient */}
                  <div className="mt-6 p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-brand-text mb-2">Viral Coefficient</h3>
                        <p className="text-sm text-brand-muted">
                          Average new followers generated per post through shares and engagement
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-4xl font-bold text-pink-400">{viralCoefficient}</div>
                        <div className="text-xs text-brand-muted">followers/post</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Influencer ROI Tab */}
            {activeTab === 'influencer' && (
              <div className="space-y-6">
                <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6">
                  <h2 className="text-2xl font-bold text-brand-text mb-6">Influencer Collaboration ROI Calculator</h2>
                  
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-brand-text mb-2">
                          Influencer Tier
                        </label>
                        <select className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 text-brand-text focus:outline-none focus:border-pink-500">
                          <option>Nano (1K-10K)</option>
                          <option>Micro (10K-100K)</option>
                          <option>Mid-tier (100K-500K)</option>
                          <option>Macro (500K-1M)</option>
                          <option>Mega (1M+)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-text mb-2">
                          Collaboration Fee
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted">$</span>
                          <input
                            type="number"
                            placeholder="5000"
                            className="w-full pl-8 bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 text-brand-text focus:outline-none focus:border-pink-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-text mb-2">
                          Est. Reach
                        </label>
                        <input
                          type="number"
                          placeholder="50000"
                          className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-4 py-2 text-brand-text focus:outline-none focus:border-pink-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ROI Projection */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-brand-text">Expected Performance</h3>
                      <div className="space-y-3">
                        {[
                          { label: 'Estimated Impressions', value: '150,000', icon: <Eye size={16} /> },
                          { label: 'Engagement Rate', value: '4.2%', icon: <Heart size={16} /> },
                          { label: 'Click-Through Rate', value: '1.8%', icon: <MousePointerClick size={16} /> },
                          { label: 'Estimated Conversions', value: '45', icon: <TrendingUp size={16} /> },
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className="text-pink-400">{item.icon}</div>
                              <span className="text-sm text-brand-muted">{item.label}</span>
                            </div>
                            <span className="font-bold text-brand-text">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-bold text-brand-text">ROI Calculation</h3>
                      <div className="p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-brand-muted">Investment</span>
                            <span className="text-brand-text font-semibold">$5,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-brand-muted">Est. Revenue</span>
                            <span className="text-brand-text font-semibold">$5,625</span>
                          </div>
                          <div className="border-t border-pink-500/20 pt-3">
                            <div className="flex justify-between">
                              <span className="font-bold text-brand-text">ROI</span>
                              <span className="text-2xl font-bold text-green-400">+12.5%</span>
                            </div>
                          </div>
                          <div className="text-xs text-brand-muted mt-2">
                            Based on 45 conversions @ $125 avg order value
                          </div>
                        </div>
                      </div>
                    </div>
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

export default SocialMediaSimulator;
