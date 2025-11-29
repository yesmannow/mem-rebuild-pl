/**
 * GitHub Stats Component
 * Displays live GitHub statistics to prove ongoing development activity
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './GitHubStats.css';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  public_gists: number;
}

interface GitHubStatsProps {
  username: string;
  className?: string;
  theme?: 'light' | 'dark';
}

export const GitHubStats: React.FC<GitHubStatsProps> = ({
  username,
  className = '',
  theme = 'dark',
}) => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [username]);

  if (loading) {
    return (
      <div className={`github-stats ${className}`}>
        <div className="github-stats__loading">
          <div className="github-stats__spinner" />
          <p>Loading GitHub stats...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className={`github-stats ${className}`}>
        <div className="github-stats__error">
          <p>Unable to load GitHub stats</p>
        </div>
      </div>
    );
  }

  const statItems = [
    {
      label: 'Public Repos',
      value: stats.public_repos,
      icon: '📦',
    },
    {
      label: 'Followers',
      value: stats.followers,
      icon: '👥',
    },
    {
      label: 'Following',
      value: stats.following,
      icon: '👤',
    },
    {
      label: 'Public Gists',
      value: stats.public_gists,
      icon: '📝',
    },
  ];

  return (
    <motion.div
      className={`github-stats github-stats--${theme} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="github-stats__header">
        <h3 className="github-stats__title">
          <span className="github-stats__icon">🐙</span>
          GitHub Activity
        </h3>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="github-stats__profile-link"
          aria-label={`View ${username}'s GitHub profile`}
        >
          View Profile →
        </a>
      </div>

      <div className="github-stats__grid">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            className="github-stats__item"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="github-stats__item-icon">{item.icon}</span>
            <div className="github-stats__item-content">
              <div className="github-stats__item-value">{item.value}</div>
              <div className="github-stats__item-label">{item.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="github-stats__footer">
        <p className="github-stats__updated">
          Updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
};

export default GitHubStats;
