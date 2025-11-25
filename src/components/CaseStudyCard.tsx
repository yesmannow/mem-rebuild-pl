import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, Zap, ArrowRight } from 'lucide-react';
import { CaseStudySimple } from '../data/caseStudies';
import AnimatedCounter from './animations/AnimatedCounter';

interface CaseStudyCardProps {
  caseStudy: CaseStudySimple;
}

// Helper to parse metric values for animation
const parseMetricValue = (value: string): number | null => {
  // Extract numeric part from strings like "+212%", "$310K", "5.8s → 1.2s"
  const match = value.match(/([+-]?)(\d+(?:\.\d+)?)/);
  if (match) {
    const num = parseFloat(match[2]);
    return isNaN(num) ? null : num;
  }
  return null;
};

const extractPrefix = (value: string): string => {
  if (value.startsWith('+') || value.startsWith('-')) return value[0];
  if (value.startsWith('$')) return '$';
  return '';
};

const extractSuffix = (value: string): string => {
  if (value.includes('%')) return '%';
  if (value.includes('K')) return 'K';
  if (value.includes('M')) return 'M';
  if (value.includes('s')) return 's';
  return '';
};

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy }) => {
  const { id, title, client, oneLiner, stats, tags, description } = caseStudy;

  // Icon mapping for stats
  const getStatIcon = (index: number) => {
    const icons = [TrendingUp, Users, Zap];
    return icons[index % icons.length];
  };

  return (
    <Link
      to={`/case-studies/${id}`}
      className="block group"
      aria-label={`View ${title} case study`}
    >
      <div className="bg-brand-surface border border-brand-muted/20 rounded-xl p-6 hover:border-brand-teal/50 transition-all duration-300 hover:shadow-lg hover:shadow-brand-teal/10 h-full flex flex-col">
        {/* Client Name */}
        <div className="mb-3">
          <span className="text-xs font-semibold text-brand-teal uppercase tracking-wide">
            {client}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-brand-text mb-3 group-hover:text-brand-teal transition-colors">
          {title}
        </h3>

        {/* One Liner */}
        <p className="text-brand-muted text-sm mb-4 line-clamp-2">
          {oneLiner}
        </p>

        {/* Description */}
        <p className="text-brand-text/80 text-sm mb-6 line-clamp-3 flex-grow">
          {description}
        </p>

        {/* Stats Grid - 3 metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.slice(0, 3).map((stat, index) => {
            const Icon = getStatIcon(index);
            return (
              <div
                key={index}
                className="bg-brand-dark/50 rounded-lg p-3 border border-brand-muted/10"
              >
                <div className="flex items-center justify-center mb-2">
                  <Icon className="w-4 h-4 text-brand-teal" />
                </div>
                <div className="text-xs text-brand-muted mb-1">{stat.label}</div>
                <div className="text-lg font-bold text-brand-text">
                  {(() => {
                    const numericValue = parseMetricValue(stat.value);
                    return numericValue !== null ? (
                      <AnimatedCounter
                        to={numericValue}
                        prefix={extractPrefix(stat.value)}
                        suffix={extractSuffix(stat.value)}
                        duration={1.5}
                      />
                    ) : (
                      stat.value
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-brand-dark/50 text-brand-muted text-xs font-medium rounded-md border border-brand-muted/20"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="px-2.5 py-1 text-brand-muted text-xs font-medium">
              +{tags.length - 4} more
            </span>
          )}
        </div>

        {/* CTA Arrow */}
        <div className="flex items-center text-brand-teal text-sm font-medium group-hover:translate-x-1 transition-transform">
          <span>View Case Study</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </div>
    </Link>
  );
};

export default CaseStudyCard;

