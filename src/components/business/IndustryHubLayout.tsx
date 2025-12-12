/**
 * IndustryHubLayout.tsx
 * 
 * Specialized page layout for industry-specific "microsites".
 * Dynamically pulls industry description, related attorneys, news, and key contact.
 * 
 * Features:
 * - Dynamic industry content
 * - Related attorneys filtered by industry
 * - Related news/blog posts filtered by industry
 * - Key contact card for industry partner
 * - Responsive sections with visual hierarchy
 * - Framer Motion animations
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ArrowRight, Calendar, Clock } from 'lucide-react';
import { getIndustryBySlug } from '../../data/industries';
import { Attorney, filterByIndustry as filterAttorneysByIndustry, getAttorneyById } from '../../data/attorneys';
import { NewsArticle, filterByIndustry as filterNewsByIndustry } from '../../data/newsArticles';

interface IndustryHubLayoutProps {
  industrySlug: string;
  className?: string;
}

const IndustryHubLayout: React.FC<IndustryHubLayoutProps> = ({ 
  industrySlug, 
  className = '' 
}) => {
  // Get industry data
  const industry = getIndustryBySlug(industrySlug);
  
  if (!industry) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-slate-400">Industry not found</h2>
      </div>
    );
  }

  // Get related data
  const relatedAttorneys = filterAttorneysByIndustry(industry.name);
  const relatedNews = filterNewsByIndustry(industry.name).slice(0, 3);
  const keyContactData = getAttorneyById(industry.keyContact);

  return (
    <div className={`industry-hub-layout ${className}`}>
      {/* Hero Section */}
      <motion.section 
        className="industry-hero mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700/50 overflow-hidden p-8 md:p-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-turquoise to-transparent" />
          </div>

          <div className="relative z-10 max-w-4xl">
            <motion.div
              className="inline-block px-4 py-1.5 bg-brand-turquoise/20 border border-brand-turquoise/30 rounded-full text-brand-turquoise text-sm font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Industry Focus
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {industry.name}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-brand-turquoise font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {industry.headline}
            </motion.p>
            
            <motion.p 
              className="text-lg text-slate-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {industry.description}
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        {/* Left Column - Expertise & Attorneys */}
        <div className="lg:col-span-2 space-y-8">
          {/* Expertise Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Our Expertise</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {industry.expertise.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:border-brand-turquoise/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-turquoise mt-2" />
                  <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Related Attorneys Section */}
          {relatedAttorneys.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Our {industry.name} Team</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {relatedAttorneys.map((attorney, index) => (
                  <AttorneyCard key={attorney.id} attorney={attorney} index={index} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Related News Section */}
          {relatedNews.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Latest Insights</h2>
              <div className="space-y-4">
                {relatedNews.map((article, index) => (
                  <NewsCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Key Contact Card */}
          {keyContactData && (
            <KeyContactCard attorney={keyContactData} industryName={industry.name} />
          )}

          {/* Practice Areas Card */}
          <motion.div
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl border border-slate-700/50 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Related Practice Areas</h3>
            <div className="space-y-2">
              {industry.relatedPracticeAreas.map((area, index) => (
                <motion.a
                  key={index}
                  href={`/practices/${area.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block p-3 bg-slate-800/50 rounded-lg border border-slate-700/30 hover:border-brand-turquoise/50 hover:bg-slate-800/70 transition-all group"
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                      {area}
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-turquoise opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface AttorneyCardProps {
  attorney: Attorney;
  index: number;
}

const AttorneyCard: React.FC<AttorneyCardProps> = ({ attorney, index }) => (
  <motion.div
    className="attorney-card bg-slate-800/30 rounded-lg border border-slate-700/30 p-5 hover:border-brand-turquoise/50 hover:bg-slate-800/50 transition-all group"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ y: -4 }}
  >
    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-brand-turquoise transition-colors">
      {attorney.name}
    </h3>
    <p className="text-sm text-brand-turquoise font-medium mb-3">{attorney.title}</p>
    <p className="text-sm text-slate-400 mb-4 line-clamp-2">{attorney.bio}</p>
    <div className="flex flex-col gap-2 text-xs text-slate-500">
      <a href={`mailto:${attorney.email}`} className="flex items-center gap-2 hover:text-brand-turquoise transition-colors">
        <Mail className="w-3.5 h-3.5" />
        <span>{attorney.email}</span>
      </a>
      <a href={`tel:${attorney.phone}`} className="flex items-center gap-2 hover:text-brand-turquoise transition-colors">
        <Phone className="w-3.5 h-3.5" />
        <span>{attorney.phone}</span>
      </a>
    </div>
  </motion.div>
);

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, index }) => {
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.article
      className="news-card bg-slate-800/30 rounded-lg border border-slate-700/30 p-5 hover:border-brand-turquoise/50 hover:bg-slate-800/50 transition-all group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-white group-hover:text-brand-turquoise transition-colors flex-1 leading-tight">
          {article.title}
        </h3>
      </div>
      
      <p className="text-sm text-slate-400 mb-4 line-clamp-2">{article.excerpt}</p>
      
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          {article.readTime && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime} min read
            </span>
          )}
        </div>
        <ArrowRight className="w-4 h-4 text-brand-turquoise opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.article>
  );
};

interface KeyContactCardProps {
  attorney: Attorney;
  industryName: string;
}

const KeyContactCard: React.FC<KeyContactCardProps> = ({ attorney, industryName }) => (
  <motion.div
    className="key-contact-card bg-gradient-to-br from-brand-turquoise/10 to-transparent border border-brand-turquoise/30 rounded-xl p-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
  >
    <div className="text-sm font-semibold text-brand-turquoise mb-4 uppercase tracking-wide">
      Industry Contact
    </div>
    
    <h3 className="text-2xl font-bold text-white mb-1">{attorney.name}</h3>
    <p className="text-sm text-brand-turquoise font-medium mb-4">{attorney.title}</p>
    
    <p className="text-sm text-slate-300 mb-6 leading-relaxed">
      {attorney.name.split(' ')[0]} leads our {industryName} practice and has {attorney.yearsOfExperience}+ years of experience serving clients in this industry.
    </p>
    
    <div className="space-y-3 mb-6">
      <a 
        href={`mailto:${attorney.email}`}
        className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-brand-turquoise/20 flex items-center justify-center">
          <Mail className="w-4 h-4 text-brand-turquoise" />
        </div>
        <span>{attorney.email}</span>
      </a>
      
      <a 
        href={`tel:${attorney.phone}`}
        className="flex items-center gap-3 text-sm text-slate-300 hover:text-white transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-brand-turquoise/20 flex items-center justify-center">
          <Phone className="w-4 h-4 text-brand-turquoise" />
        </div>
        <span>{attorney.phone}</span>
      </a>
    </div>
    
    <motion.button
      className="w-full px-6 py-3 bg-brand-turquoise text-slate-900 font-semibold rounded-lg hover:bg-brand-turquoise/90 transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      Schedule a Consultation
    </motion.button>
  </motion.div>
);

export default IndustryHubLayout;
