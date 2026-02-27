import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import MagneticCursor from '../components/ui/MagneticCursor';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  photographyItems,
  designItems,
  fallbackPhotographyItems,
  fallbackDesignItems,
  type StudioItem,
} from '../data/studioData';
import { manifestToStudioItems } from '../utils/studioManifest';
import { ApiBackgroundImage } from '../components/ui/ApiBackgroundImage';

gsap.registerPlugin(ScrollTrigger);

/**
 * Studio Page - Visual Engineering
 *
 * A data-driven visual showcase featuring:
 * - Deep Slate background with proper layout structure
 * - Tabbed masonry gallery with context-aware HUD overlays
 * - Photography mode: Shows descriptive metadata
 * - Design mode: Shows color palettes (Hex codes)
 */
const Studio: React.FC = () => {
  const [photos, setPhotos] = useState<StudioItem[]>([]);
  const [designs, setDesigns] = useState<StudioItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const [loupe, setLoupe] = useState<{ x: number; y: number; bgX: number; bgY: number; src: string } | null>(null);
  const [loupeEnabled, setLoupeEnabled] = useState(false);
  const reelTrackRef = useRef<HTMLDivElement>(null);
  const reelSectionRef = useRef<HTMLElement>(null);
  const cursorColor = '#40E0D0';

  const studioItems = useMemo(() => [...photos, ...designs], [photos, designs]);
  const featuredReel = useMemo(() => studioItems.slice(0, 4), [studioItems]);
  const featuredSpans = useMemo(() => new Set([0, 5, 8, 14, 19, 22, 27, 33, 38]), []);

  useEffect(() => {
    let mounted = true;

    const fetchManifest = async (path: string): Promise<string[] | null> => {
      try {
        const response = await fetch(path, { cache: 'no-store' });
        if (!response.ok) return null;
        const payload = await response.json();
        return Array.isArray(payload) ? payload : null;
      } catch {
        return null;
      }
    };

    const loadAssets = async () => {
      try {
        const [photoManifest, designManifest] = await Promise.all([
          fetchManifest('/images/photography/manifest.json'),
          fetchManifest('/images/design/manifest.json'),
        ]);

        if (!mounted) return;

        const manifestPhotos = manifestToStudioItems(photoManifest, 'photography');
        const manifestDesigns = manifestToStudioItems(designManifest, 'design');

        const resolvedPhotos = manifestPhotos.length
          ? manifestPhotos
          : photographyItems.length
            ? photographyItems
            : fallbackPhotographyItems;

        const resolvedDesigns = manifestDesigns.length
          ? manifestDesigns
          : designItems.length
            ? designItems
            : fallbackDesignItems;

        setPhotos(resolvedPhotos);
        setDesigns(resolvedDesigns);
        setUseFallback(!(manifestPhotos.length && manifestDesigns.length));
      } catch {
        if (!mounted) return;
        setPhotos(fallbackPhotographyItems);
        setDesigns(fallbackDesignItems);
        setUseFallback(true);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    void loadAssets();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setLoupeEnabled(mq.matches);
    const handler = (e: MediaQueryListEvent) => setLoupeEnabled(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!reelTrackRef.current || !reelSectionRef.current || featuredReel.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const anim = gsap.to(reelTrackRef.current, {
        x: '-300vw',
        ease: 'none',
        scrollTrigger: {
          trigger: reelSectionRef.current,
          start: 'top top',
          end: '+=4000',
          scrub: 0.6,
          pin: true,
        },
      });
      return () => { anim.scrollTrigger?.kill(); anim.kill(); };
    });

    mm.add('(max-width: 767px)', () => {
      const anim = gsap.to(reelTrackRef.current, {
        x: '-150vw',
        ease: 'none',
        scrollTrigger: {
          trigger: reelSectionRef.current,
          start: 'top top',
          end: '+=2000',
          scrub: 0.6,
          pin: true,
        },
      });
      return () => { anim.scrollTrigger?.kill(); anim.kill(); };
    });

    return () => mm.revert();
  }, [featuredReel]);

  return (
    <>
      <Helmet>
        <title>Visual Engineering | Studio</title>
        <meta
          name="description"
          content="Visual Engineering - A cutting-edge showcase of photography and graphic design work. Featuring advanced filtering, 3D interactions, and intelligent color palette analysis."
        />
      </Helmet>

      {/* Magnetic Cursor Effect */}
      <MagneticCursor color={cursorColor} enabled={true} />

      {/* Deep Slate Background - War Room ecosystem integration */}
      <div className="min-h-screen bg-slate-900 relative overflow-hidden">
        <ApiBackgroundImage
          query="creative studio design workspace photography"
          source="pexels"
          overlayColor="dark"
          overlayOpacity={0.7}
          className="absolute inset-0 z-0"
          priority
        />
        {/* Animated gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 pointer-events-none" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden" />

        <main className="relative z-10 pt-24 pb-32 px-6">
          <section className="max-w-7xl mx-auto">
            <div className="mb-10 relative">
              <h1 className="text-white">STUDIO</h1>
              <div className="absolute inset-0 pointer-events-none text-[22vw] leading-none text-white/5 font-black" style={{ mixBlendMode: 'difference' }}>
                STUDIO
              </div>
              <p className="text-sm text-slate-400 tech-label uppercase tracking-[0.22em] mt-4">Cinematic Reel + Variable Grid</p>
              {useFallback && <p className="text-xs text-amber-400 mt-2 tech-label">Fallback assets active</p>}
            </div>

            {!isLoading && featuredReel.length > 0 && (
              <section ref={reelSectionRef} className="relative h-screen overflow-hidden mb-20 rounded-3xl border border-white/10">
                <div ref={reelTrackRef} className="absolute inset-0 flex w-[400vw]">
                  {featuredReel.map((item) => (
                    <div key={`reel-${item.id}`} className="w-screen h-full relative">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/45" />
                      <div className="absolute bottom-10 left-10">
                        <p className="text-xs tech-label uppercase tracking-[0.2em] text-cyan-300">{item.type}</p>
                        <h2 className="text-white text-5xl max-w-xl">{item.title}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!isLoading && studioItems.length > 0 && (
              <section className="relative">
                <motion.div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] gap-3" style={{ gridAutoFlow: 'dense' }}>
                  {studioItems.map((item, index) => {
                    const featured = featuredSpans.has(index);
                    return (
                      <motion.article
                        key={item.id}
                        className={`relative overflow-hidden rounded-2xl border border-white/10 ${featured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
                        onMouseMove={(event) => {
                          if (!loupeEnabled) return;
                          const rect = event.currentTarget.getBoundingClientRect();
                          const x = event.clientX - rect.left;
                          const y = event.clientY - rect.top;
                          setLoupe({
                            x: event.clientX,
                            y: event.clientY,
                            bgX: (x / rect.width) * 100,
                            bgY: (y / rect.height) * 100,
                            src: item.src,
                          });
                        }}
                        onMouseLeave={() => setLoupe(null)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <img src={item.src} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-[10px] tech-label uppercase tracking-[0.16em] text-cyan-300">{item.meta}</p>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>

                {loupe && loupeEnabled && (
                  <div
                    className="fixed z-[120] pointer-events-none rounded-full border border-cyan-300/50"
                    style={{
                      width: 150,
                      height: 150,
                      left: loupe.x - 75,
                      top: loupe.y - 75,
                      backgroundImage: `url(${loupe.src})`,
                      backgroundSize: '200%',
                      backgroundPosition: `${loupe.bgX}% ${loupe.bgY}%`,
                      boxShadow: '0 0 24px rgba(34,211,238,0.45)',
                    }}
                  />
                )}
              </section>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default Studio;
