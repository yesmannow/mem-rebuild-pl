import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
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
import StudioGridItem from '../components/ui/StudioGridItem';

gsap.registerPlugin(ScrollTrigger);

/**
 * Studio Page - Visual Engineering
 */
const Studio: React.FC = () => {
  const [photos, setPhotos] = useState<StudioItem[]>([]);
  const [designs, setDesigns] = useState<StudioItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [useFallback, setUseFallback] = useState<boolean>(false);
  const [loupe, setLoupe] = useState<{ x: number; y: number; bgX: number; bgY: number; src: string; exif: string } | null>(null);
  const [loupeEnabled, setLoupeEnabled] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'photography' | 'design'>('all');
  const reelTrackRef = useRef<HTMLDivElement>(null);
  const reelSectionRef = useRef<HTMLElement>(null);
  const cursorColor = '#00F2FF'; // Cyan accent

  const allItems = useMemo(() => [...photos, ...designs], [photos, designs]);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'photography') return photos;
    if (activeFilter === 'design') return designs;
    return allItems;
  }, [activeFilter, photos, designs, allItems]);

  const featuredReel = useMemo(() => allItems.slice(0, 4), [allItems]);

  // Generate random EXIF data for telemetry HUD
  const getRandomExif = () => {
    const isos = ['100', '200', '400', '800', '1600'];
    const apertures = ['f/1.2', 'f/1.4', 'f/1.8', 'f/2.8', 'f/4'];
    const shutters = ['1/125s', '1/250s', '1/500s', '1/1000s'];
    const iso = isos[Math.floor(Math.random() * isos.length)];
    const ap = apertures[Math.floor(Math.random() * apertures.length)];
    const shut = shutters[Math.floor(Math.random() * shutters.length)];
    return `ISO ${iso} // ${ap} // ${shut}`;
  };

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
        <title>Studio | Visual Engineering</title>
        <meta
          name="description"
          content="Immersive studio reel of cinematic photography, interaction design, and Digital Twilight brand systems engineered for premium launches."
        />
      </Helmet>

      <MagneticCursor color={cursorColor} enabled={true} />

      <div className="min-h-screen bg-slate-950 relative overflow-hidden">
        <ApiBackgroundImage
          query="creative studio design workspace photography dark cinematic"
          source="pexels"
          overlayOpacity={0.6}
          twilight
          className="absolute inset-0 z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-black pointer-events-none" />

        <main className="relative z-10 pt-24 pb-32 px-6">
          <section className="max-w-7xl mx-auto">
            <div className="mb-10 relative flex justify-between items-end">
              <div>
                <h1 className="text-white font-sans font-black tracking-tighter text-6xl">STUDIO</h1>
                <p className="font-['Geist_Mono',_monospace] text-[10px] uppercase tracking-widest text-cyan-400 mt-4">
                  Cinematic Reel + Variable Grid // STATUS: ONLINE
                </p>
                {useFallback && <p className="font-['Geist_Mono',_monospace] text-[10px] text-amber-400 mt-2">Fallback assets active</p>}
              </div>

              {/* Filter Morph Toggle */}
              <div className="flex gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-1">
                {(['all', 'photography', 'design'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`relative px-4 py-2 text-xs font-['Geist_Mono',_monospace] uppercase tracking-widest transition-colors ${
                      activeFilter === filter ? 'text-black' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {activeFilter === filter && (
                      <motion.div
                        layoutId="active-filter"
                        className="absolute inset-0 bg-cyan-400 rounded-xl"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{filter}</span>
                  </button>
                ))}
              </div>
            </div>

            {!isLoading && featuredReel.length > 0 && (
              <section ref={reelSectionRef} className="relative h-screen overflow-hidden mb-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <div ref={reelTrackRef} className="absolute inset-0 flex w-[400vw]">
                  {featuredReel.map((item) => (
                    <div key={`reel-${item.id}`} className="w-screen h-full relative">
                      <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-10 left-10">
                        <p className="font-['Geist_Mono',_monospace] text-[10px] uppercase tracking-widest text-cyan-400 mb-2">{item.type}</p>
                        <h2 className="text-white font-sans font-black tracking-tighter text-5xl max-w-xl">{item.title}</h2>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {!isLoading && filteredItems.length > 0 && (
              <section className="relative">
                <motion.div
                  layout
                  className="grid grid-cols-2 md:grid-cols-4 auto-rows-[240px] gap-4"
                  style={{ gridAutoFlow: 'dense' }}
                >
                  <AnimatePresence>
                    {filteredItems.map((item, index) => {
                      const isFeatured = index % 4 === 0;
                      return (
                        <StudioGridItem
                          key={item.id}
                          item={item}
                          isFeatured={isFeatured}
                          loupeEnabled={loupeEnabled}
                          onMouseMove={(event, studioItem) => {
                            const rect = event.currentTarget.getBoundingClientRect();
                            const x = event.clientX - rect.left;
                            const y = event.clientY - rect.top;
                            setLoupe({
                              x: event.clientX,
                              y: event.clientY,
                              bgX: (x / rect.width) * 100,
                              bgY: (y / rect.height) * 100,
                              src: studioItem.src,
                              exif: getRandomExif(),
                            });
                          }}
                          onMouseLeave={() => setLoupe(null)}
                        />
                      );
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* Digital Loupe 2.0 with Telemetry HUD */}
                {loupe && loupeEnabled && (
                  <div
                    className="fixed z-[120] pointer-events-none rounded-full border border-cyan-400/50 overflow-visible"
                    style={{
                      width: 180,
                      height: 180,
                      left: loupe.x - 90,
                      top: loupe.y - 90,
                      boxShadow: '0 0 30px rgba(0, 242, 255, 0.2), inset 0 0 20px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* The magnified image */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundImage: `url(${loupe.src})`,
                        backgroundSize: '250%',
                        backgroundPosition: `${loupe.bgX}% ${loupe.bgY}%`,
                      }}
                    />
                    {/* Telemetry HUD floating on bottom right */}
                    <div className="absolute -bottom-4 -right-12 bg-black/80 backdrop-blur-md border border-cyan-400/30 px-3 py-1.5 rounded text-[10px] font-['Geist_Mono',_monospace] text-cyan-400 whitespace-nowrap shadow-lg">
                      <span className="opacity-50 mr-2">[SYS]</span>{loupe.exif}
                    </div>
                  </div>
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
