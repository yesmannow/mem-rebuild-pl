import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { trackCTA } from '../utils/analytics';
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

  return (
    <section className="hero-modern" aria-labelledby="hero-heading">
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
          <div className="hero-chips" aria-label="Experience highlights">
            <span className="chip">Solo operator</span>
            <span className="chip">16+ years</span>
            <span className="chip">Hands-on</span>
          </div>
          <h1 id="hero-heading" className="hero-tagline">
            I build marketing systems that turn brands into revenue engines.
          </h1>
          <p className="hero-subtitle">
            Strategy, creative, analytics, and execution—unified under one operator. I design and
            run growth systems that create predictable pipeline.
          </p>
          <div className="hero-ctas">
            <Link
              to="/contact"
              className="btn-primary hero-cta"
              aria-label="Contact me"
              onClick={() => trackCTA('contact', 'hero')}
            >
              Contact Me
            </Link>
            <Link
              to="/case-studies"
              className="btn-secondary hero-cta"
              aria-label="See my work"
              onClick={() => trackCTA('view_case_studies', 'hero')}
            >
              See My Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
