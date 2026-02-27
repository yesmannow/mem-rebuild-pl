import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

interface CodeHighlight {
  title: string;
  description: string;
  language: string;
  snippet?: string;
}

interface CodeVaultProps {
  codeHighlights: CodeHighlight[];
  className?: string;
}

/**
 * CodeVault - Sleek dark-mode IDE window with syntax highlighting and typewriter effect
 * Showcases technical depth with a polished developer experience
 */
export const CodeVault: React.FC<CodeVaultProps> = ({
  codeHighlights,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [typedCode, setTypedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const activeHighlight = codeHighlights[activeTab];

  // Simple RegEx-based syntax highlighting
  const highlightCode = (code: string): React.ReactNode => {
    if (!code) return null;

    // Keywords to highlight (pink-400) - sorted by length (longest first) to avoid partial matches
    const keywords = [
      'undefined', 'instanceof', 'getElementById', 'querySelector', 'addEventListener',
      'const', 'let', 'var', 'function', 'return', 'class', 'extends', 'import', 'export',
      'default', 'async', 'await', 'try', 'catch', 'throw', 'if', 'else', 'for', 'while',
      'switch', 'case', 'break', 'continue', 'return', 'true', 'false', 'null',
      'this', 'new', 'typeof', 'interface', 'type', 'enum', 'namespace', 'module', 'declare',
    ].sort((a, b) => b.length - a.length);

    // Function names and method calls (blue-400)
    const functionPattern = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g;

    // Find all matches
    const matches: Array<{ start: number; end: number; type: 'keyword' | 'function'; text: string }> = [];

    // Find function calls
    let match;
    while ((match = functionPattern.exec(code)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[1].length,
        type: 'function',
        text: match[1],
      });
    }

    // Find keywords (check word boundaries)
    keywords.forEach(keyword => {
      const keywordRegex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      let keywordMatch;
      while ((keywordMatch = keywordRegex.exec(code)) !== null) {
        // Check if not already matched as function
        const isFunctionMatch = matches.some(
          m => m.start <= keywordMatch!.index && m.end > keywordMatch!.index
        );

        if (!isFunctionMatch) {
          matches.push({
            start: keywordMatch.index,
            end: keywordMatch.index + keyword.length,
            type: 'keyword',
            text: keyword,
          });
        }
      }
    });

    // Sort matches by position
    matches.sort((a, b) => a.start - b.start);

    // Remove overlaps (keep first match)
    const nonOverlapping: typeof matches = [];
    matches.forEach(match => {
      if (nonOverlapping.length === 0 || match.start >= nonOverlapping[nonOverlapping.length - 1].end) {
        nonOverlapping.push(match);
      }
    });

    // Build parts
    const parts: Array<{ text: string; className: string }> = [];
    let index = 0;

    nonOverlapping.forEach(match => {
      // Add text before match
      if (match.start > index) {
        parts.push({
          text: code.substring(index, match.start),
          className: 'text-slate-200',
        });
      }
      // Add highlighted match
      parts.push({
        text: match.text,
        className: match.type === 'keyword' ? 'text-pink-400' : 'text-blue-400',
      });
      index = match.end;
    });

    // Add remaining text
    if (index < code.length) {
      parts.push({
        text: code.substring(index),
        className: 'text-slate-200',
      });
    }

    // If no matches, return plain text
    if (nonOverlapping.length === 0) {
      parts.push({
        text: code,
        className: 'text-slate-200',
      });
    }

    return (
      <>
        {parts.map((part, idx) => (
          <span key={idx} className={part.className}>
            {part.text}
          </span>
        ))}
      </>
    );
  };

  // character by character typewriter effect
  useEffect(() => {
    if (isInView && activeHighlight?.snippet) {
      setIsTyping(true);
      setTypedCode('');
      let currentText = '';
      const fullText = activeHighlight.snippet;
      let charIndex = 0;

      const timer = setInterval(() => {
        if (charIndex < fullText.length) {
          currentText += fullText[charIndex];
          setTypedCode(currentText);
          charIndex++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 5);

      return () => clearInterval(timer);
    } else if (activeHighlight?.snippet) {
      setTypedCode(activeHighlight.snippet);
      setIsTyping(false);
    }
  }, [isInView, activeTab, activeHighlight]);

  // Update displayed lines when typedCode changes
  useEffect(() => {
    setDisplayedLines(typedCode.split('\n'));
  }, [typedCode]);

  const handleCopy = async () => {
    if (!activeHighlight?.snippet) return;

    try {
      await navigator.clipboard.writeText(activeHighlight.snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!codeHighlights || codeHighlights.length === 0) {
    return null;
  }

  // Get file extension from language
  const getFileExtension = (language: string): string => {
    const extMap: Record<string, string> = {
      typescript: 'ts',
      javascript: 'js',
      jsx: 'tsx',
      tsx: 'tsx',
      python: 'py',
      graphql: 'graphql',
      sql: 'sql',
      css: 'css',
      html: 'html',
    };
    return extMap[language.toLowerCase()] || 'ts';
  };

  return (
    <div ref={containerRef} className={`code-vault ${className}`}>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-brand-text mb-2 font-clash">The Code Vault</h2>
        <p className="text-brand-muted font-mono text-sm">
          Implementation details and code highlights from this application
        </p>
      </div>

      {/* IDE Window */}
      <div className="bg-[#1e1e1e] rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Mac-style Window Controls + Header */}
        <div className="bg-[#252526] border-b border-slate-700/50 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mac-style window controls */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-slate-400 font-mono ml-2">code-vault</span>
          </div>

          {/* Copy Button */}
          {activeHighlight?.snippet && (
            <motion.button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs text-slate-400 hover:text-brand-turquoise transition-colors hover:bg-slate-700/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check className="w-4 h-4 text-green-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Copy className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="font-mono">{copied ? 'Copied!' : 'Copy'}</span>
            </motion.button>
          )}
        </div>

        {/* File Tabs */}
        <div className="bg-[#2d2d30] border-b border-slate-700/50 flex overflow-x-auto">
          {codeHighlights.map((highlight, index) => {
            const ext = getFileExtension(highlight.language);
            const fileName = highlight.title.toLowerCase().replace(/\s+/g, '-') || `file-${index + 1}`;

            return (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-mono transition-all whitespace-nowrap border-b-2 relative ${
                  activeTab === index
                    ? 'text-brand-turquoise border-brand-turquoise bg-[#1e1e1e]'
                    : 'text-slate-400 border-transparent hover:text-slate-300 hover:bg-[#252526]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{fileName}.{ext}</span>
                  {activeTab === index && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-turquoise"
                      layoutId="activeTab"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Code Body */}
        <div className="p-6 bg-[#1e1e1e]">
          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-slate-300 leading-relaxed">{activeHighlight.description}</p>
          </div>

          {/* Code Snippet */}
          {activeHighlight.snippet ? (
            <div className="relative">
              <pre className="bg-[#0d0d0d] rounded-lg p-4 overflow-x-auto border border-slate-800/50">
                <code
                  className="text-sm leading-relaxed block font-mono"
                  style={{ fontFamily: "'Fira Code', 'Monaco', 'Courier New', monospace" }}
                >
                  {displayedLines.map((line, lineIdx) => (
                    <React.Fragment key={lineIdx}>
                      {highlightCode(line)}
                      {lineIdx < displayedLines.length - 1 && '\n'}
                    </React.Fragment>
                  ))}
                  {isTyping && (
                    <motion.span
                      className="inline-block w-2 h-4 bg-brand-turquoise ml-1"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                </code>
              </pre>
              <div className="absolute top-2 right-2 text-xs text-slate-500 font-mono px-2 py-1 bg-slate-800/50 rounded">
                {activeHighlight.language}
              </div>
            </div>
          ) : (
            <div className="bg-[#0d0d0d] rounded-lg p-4 border border-slate-800/50">
              <p className="text-sm text-slate-400 font-mono">No code snippet available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeVault;
