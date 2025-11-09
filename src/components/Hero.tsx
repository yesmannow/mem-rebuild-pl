import React, { useEffect, useState } from 'react';
import { trackCTA } from '../utils/analytics';
import { scrollToAnchor } from '../utils/scroll';
import './home/Hero.css';

export default function Hero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduceMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
    e.preventDefault();
    scrollToAnchor(anchorId, { offset: 100 });
    trackCTA(anchorId === 'contact' ? 'start_conversation' : 'view_work', 'hero');
  };

  return (
    <section id="home" className="hero-modern" aria-labelledby="hero-heading">
      <div className="hero-media" aria-hidden="true">
        {!reduceMotion ? (
          <>
            {/* Poster image for faster initial render */}
            <img
              src="/images/hero-poster.jpg"
              alt=""
              className={`hero-media__poster ${videoLoaded ? 'hero-media__poster--hidden' : ''}`}
              loading="eager"
              onError={e => {
                // Fallback if poster doesn't exist
                e.currentTarget.style.display = 'none';
              }}
            />
            <video
              className={`hero-media__video ${videoLoaded ? 'hero-media__video--loaded' : ''}`}
              src="/hero-broll.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => {
                // Fallback to static image if video fails
                setVideoLoaded(false);
              }}
            >
              {/* TODO: replace with branded BearCave tech loop asset */}
            </video>
          </>
        ) : (
          <div className="hero-media__fallback" />
        )}
        <div className="hero-media__overlay" />
      </div>

      <div className="hero-content container-px">
        <div className="hero-inner">
          <h1 id="hero-heading" className="hero-tagline">
            Where Complexity Becomes Clarity
          </h1>
          <div className="hero-tagline-separator" />
          <p className="hero-subtitle">
            I craft systems where design and technology move as one. Turning curiosity into conversion. Chaos into clarity.
          </p>
          <div className="hero-ctas">
            <a
              href="#contact"
              className="btn-primary hero-cta hero-cta--primary"
              aria-label="Start a conversation"
              onClick={(e) => handleAnchorClick(e, 'contact')}
            >
              START A CONVERSATION
            </a>
            <a
              href="#portfolio"
              className="btn-secondary hero-cta hero-cta--secondary"
              aria-label="View my work"
              onClick={(e) => handleAnchorClick(e, 'portfolio')}
            >
              View My Work
            </a>
          </div>
          {/* Tagline */}
          <div className="hero-tags" aria-label="Core competencies">
            <span className="hero-tag">STRATEGY</span>
            <span className="hero-tag-separator">•</span>
            <span className="hero-tag">AUTOMATION</span>
            <span className="hero-tag-separator">•</span>
            <span className="hero-tag hero-tag--emphasized">SYSTEMS</span>
            <span className="hero-tag-separator">•</span>
            <span className="hero-tag">STORYTELLING</span>
          </div>
        </div>
      </div>
    </section>
  );
}
