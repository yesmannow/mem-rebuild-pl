import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, GitCommit, Signal, Mail, Linkedin, Github } from 'lucide-react';
import './Footer.css';

// ─── Kinetic ticker tape ─────────────────────────────────────────────────
const TICKER_ITEMS = [
  'STRATEGY', 'AUTOMATION', 'GROWTH', 'ARCHITECTURE',
  'STRATEGY', 'AUTOMATION', 'GROWTH', 'ARCHITECTURE',
  'STRATEGY', 'AUTOMATION', 'GROWTH', 'ARCHITECTURE',
];

const KineticTicker: React.FC = () => (
  <div
    className="overflow-hidden border-y border-white/[0.06] py-4 bg-[#050507]"
    aria-hidden="true"
  >
    <div
      className="flex whitespace-nowrap"
      style={{ animation: 'ticker-scroll 18s linear infinite' }}
    >
      {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
        <span key={i} className="inline-flex items-center">
          <span
            className="text-xs font-mono font-bold uppercase tracking-[0.4em] text-white/18 px-8"
          >
            {item}
          </span>
          <span className="text-[#22d3ee]/20 text-xs select-none" aria-hidden="true">{'//'}&#8203;</span>
        </span>
      ))}
    </div>
  </div>
);

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
  };
}

const Footer: React.FC = () => {
  const [commitHash, setCommitHash] = useState<string>('0000000');
  const [latency, setLatency] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch latest GitHub commit
  useEffect(() => {
    const fetchCommit = async () => {
      const startTime = Date.now();
      try {
        const response = await fetch(
          'https://api.github.com/repos/yesmannow/mem-rebuild-pl/commits',
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (response.status === 403) {
          setCommitHash('LOCAL-BLD');
          setIsLive(false);
          return;
        }
        if (!response.ok) throw new Error('Telemetry Offline');
        const commits: GitHubCommit[] = await response.json();
        if (commits.length > 0) {
          setCommitHash(commits[0].sha.slice(0, 7));
          setIsLive(true);
        }
      } catch {
        setCommitHash('LOCAL-BLD');
        setIsLive(false);
      } finally {
        const endTime = Date.now();
        setLatency(endTime - startTime);
      }
    };

    fetchCommit();
    // Refresh every 30 seconds
    const interval = setInterval(fetchCommit, 30000);
    return () => clearInterval(interval);
  }, []);

  // Mock key press sound (can be replaced with use-sound)
  const playKeySound = () => {
    // Create a simple beep sound using Web Audio API
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioCtx();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Silently fail if audio context is not available
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    playKeySound();
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail('');
  };

  const directoryLinks = [
    { name: '/home', path: '/' },
    { name: '/work', path: '/case-studies' },
    { name: '/lab', path: '/apps' },
    { name: '/bio', path: '/resume' },
    { name: '/contact', path: '/contact' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: 'https://linkedin.com/in/jacobdarling', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com/yesmannow', icon: Github },
    { name: 'Email', href: '/contact', icon: Mail },
  ];

  return (
    <>
    <KineticTicker />
    <footer className="footer-command-console" role="contentinfo">
      {/* Terminal Window Container */}
      <div className="terminal-window">
        {/* Live Status Bar */}
        <div className="status-bar">
          <div className="status-indicator">
            <span className={`status-dot ${isLive ? 'live' : 'offline'}`}>●</span>
            <span className="status-text">{isLive ? 'LIVE' : 'OFFLINE'}</span>
          </div>
          <div className="status-separator">::</div>
          <div className="status-item">
            <GitCommit size={12} className="status-icon" />
            <span className="status-label">Build:</span>
            <span className="status-value font-mono">{commitHash}</span>
          </div>
          <div className="status-separator">::</div>
          <div className="status-item">
            <Signal size={12} className="status-icon" />
            <span className="status-label">Latency:</span>
            <span className="status-value font-mono">{latency}ms</span>
          </div>
        </div>

        {/* Main Terminal Content */}
        <div className="terminal-content">
          {/* Directory Grid */}
          <div className="directory-grid">
            <div className="directory-header">
              <Cpu size={14} />
              <span className="directory-title">Directory Tree</span>
            </div>
            <div className="directory-links">
              {directoryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="directory-link"
                  onMouseEnter={() => setHoveredLink(link.path)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <span className="directory-prefix">├──</span>
                  <span className="directory-name">{link.name}</span>
                  {hoveredLink === link.path && (
                    <span className="directory-cursor">_</span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Input Terminal */}
          <div className="input-terminal">
            <div className="terminal-prompt">
              <span className="prompt-user">root@user</span>
              <span className="prompt-separator">:</span>
              <span className="prompt-path">~</span>
              <span className="prompt-symbol">$</span>
            </div>
            <form onSubmit={handleSubscribe} className="terminal-input-form">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Email"
                className="terminal-input"
                aria-label="Subscribe email"
              />
            </form>
          </div>

          {/* Social Links */}
          <div className="terminal-social">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="terminal-social-link"
                aria-label={social.name}
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="terminal-footer">
          <span className="terminal-copyright font-mono">
            © {new Date().getFullYear()} Jacob Darling — Systems Architect
          </span>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
