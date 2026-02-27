import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Clock } from 'lucide-react';

interface Commit {
  repo: string;
  message: string;
  timeAgo: string;
  url: string;
}

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

const parseCommitMessage = (message: string): string => {
  // Remove common prefixes and clean up
  return message
    .replace(/^(feat|fix|docs|style|refactor|test|chore|perf|ci|build|revert)(\(.+\))?:?\s*/i, '')
    .trim()
    .substring(0, 60);
};

export const LiveCommitTicker: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch GitHub events for the user
        const response = await fetch('https://api.github.com/users/yesmannow/events/public', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub events');
        }

        const events = await response.json();

        // Filter and map PushEvents to commits
        const commitList: Commit[] = events
          .filter((event: { type: string }) => event.type === 'PushEvent')
          .slice(0, 5)
          .map((event: {
            repo: { name: string };
            payload: { commits?: Array<{ message: string; sha: string }> };
            created_at: string;
          }) => {
            const repo = event.repo.name;
            const pushPayload = event.payload;
            const commits = pushPayload.commits || [];

            if (commits.length === 0) return null;

            const latestCommit = commits[commits.length - 1];
            const commitDate = new Date(event.created_at);

            return {
              repo: repo.split('/')[1] || repo,
              message: parseCommitMessage(latestCommit.message),
              timeAgo: formatTimeAgo(commitDate),
              url: `https://github.com/${repo}/commit/${latestCommit.sha}`,
            };
          })
          .filter((commit: Commit | null): commit is Commit => commit !== null);

        // If no commits found, use fallback data
        if (commitList.length === 0) {
          setCommits([
            {
              repo: 'portfolio',
              message: 'Updated Home.tsx with Systems Architect aesthetic',
              timeAgo: '2 hours ago',
              url: 'https://github.com/yesmannow',
            },
            {
              repo: 'portfolio',
              message: 'Refactored component architecture',
              timeAgo: '1 day ago',
              url: 'https://github.com/yesmannow',
            },
            {
              repo: 'portfolio',
              message: 'Added Live Terminal component',
              timeAgo: '2 days ago',
              url: 'https://github.com/yesmannow',
            },
          ]);
        } else {
          setCommits(commitList);
        }
      } catch (err) {
        console.error('Error fetching GitHub commits:', err);
        setError('Unable to load commits');
        // Use fallback data on error
        setCommits([
          {
            repo: 'portfolio',
            message: 'Building Systems Architect portfolio',
            timeAgo: 'recently',
            url: 'https://github.com/yesmannow',
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommits();

    // Refresh every 5 minutes
    const interval = setInterval(fetchCommits, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Duplicate commits for seamless scroll
  const duplicatedCommits = [...commits, ...commits];

  return (
    <div className="w-full overflow-hidden relative">
      <style>{`
        @keyframes commit-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .commit-track {
          animation: commit-scroll ${commits.length * 15}s linear infinite;
        }
        .commit-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className="flex gap-6 commit-track"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
      >
        {isLoading ? (
          <div className="flex-shrink-0 flex items-center gap-2 text-brand-muted">
            <div className="w-4 h-4 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono">Loading commits...</span>
          </div>
        ) : error ? (
          <div className="flex-shrink-0 text-brand-muted text-xs font-mono">
            {error}
          </div>
        ) : (
          duplicatedCommits.map((commit, index) => (
            <motion.a
              key={`${commit.repo}-${commit.message}-${index}`}
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex items-center gap-3 px-4 py-2 bg-slate-900/60 backdrop-blur-sm border border-white/10 rounded-lg hover:border-brand-teal/50 hover:bg-slate-900/80 transition-all duration-300 group"
              whileHover={{ scale: 1.02 }}
            >
              <GitCommit size={14} className="text-brand-teal flex-shrink-0" />
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-mono text-brand-teal font-semibold">
                  {commit.repo}:
                </span>
                <span className="text-xs text-brand-text truncate">
                  {commit.message}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-brand-muted">
                <Clock size={12} />
                <span className="font-mono">{commit.timeAgo}</span>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveCommitTicker;
