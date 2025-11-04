import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Filter, Grid, List, Sparkles } from "lucide-react";
import OptimizedImage from "../components/common/OptimizedImage";
import sideProjectsData from "../data/side-projects-structured.json";
import "./Inspiration.css";

/**
 * Inspiration Page (Enhanced with Side Projects)
 * ------------------------------------------
 * A refined version of the Inspiration Page showcasing:
 * - Graston Technique color palettes and design systems
 * - Side project work (branding, identity, design)
 * - Interactive filtering and view modes
 * - Smooth animations and lightbox viewing
 */

// ------------------------------
// DATA SOURCE — curated Graston palettes
// ------------------------------
const INSPIRATION_PALETTES = [
  {
    id: "gt01",
    title: "Graston Essential Training Brand System",
    categories: ["brand", "color", "campaign"],
    img: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1400&auto=format&fit=crop",
    palette: ["#0F3B82", "#A7C7E7", "#FFFFFF", "#F8FAFC", "#E4E4E7"],
    notes: "Professional navy palette conveying credibility and trust. Used in GT Essential Training brand redesign and LMS launch.",
    roi: "+23% conversion rate and +18% completion rate post-rebrand.",
    type: "palette"
  },
  {
    id: "gt02",
    title: "Advanced Training Campaign",
    categories: ["design", "color", "marketing"],
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop",
    palette: ["#001E3C", "#29ABE2", "#FFFFFF", "#F3F4F6", "#E5E7EB"],
    notes: "Contrasting dark hero with vibrant cyan for energy and motion. Used across email and social ads.",
    roi: "+40% ad engagement, +12% higher CTR.",
    type: "palette"
  },
  {
    id: "gt03",
    title: "GT University Dashboard",
    categories: ["ui", "web", "data"],
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1400&auto=format&fit=crop",
    palette: ["#FFFFFF", "#1D4ED8", "#111827", "#E5E7EB", "#A78BFA"],
    notes: "Neutral UI with a bright blue accent to guide user focus. Backed by accessible contrast for clinicians.",
    roi: "Reduced support tickets by 30%; +20% session duration.",
    type: "palette"
  },
  {
    id: "gt04",
    title: "Provider Analytics Dashboard",
    categories: ["ui", "data", "analytics"],
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1400&auto=format&fit=crop",
    palette: ["#111827", "#22C55E", "#F59E0B", "#F3F4F6", "#0EA5E9"],
    notes: "Energetic green/orange dual accent against deep gray — evokes performance and growth.",
    roi: "+28% provider engagement; dashboards viewed 2.5× more.",
    type: "palette"
  },
  {
    id: "gt05",
    title: "Clinician Portal UI System",
    categories: ["ui", "system", "accessibility"],
    img: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1400&auto=format&fit=crop",
    palette: ["#F9FAFB", "#2563EB", "#111827", "#D1D5DB", "#93C5FD"],
    notes: "Soft whites and calm blues. Designed for legibility under clinical lighting conditions.",
    roi: "+35% user satisfaction; WCAG AA compliance achieved.",
    type: "palette"
  },
  {
    id: "gt06",
    title: "Cloudflare Worker Visualization",
    categories: ["dev", "motion", "system"],
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1400&auto=format&fit=crop",
    palette: ["#0F172A", "#38BDF8", "#F3F4F6", "#0EA5E9", "#475569"],
    notes: "Cyan spectrum inspired by data flow visualization. Animated background gradient syncs with worker requests.",
    roi: "Improved response latency visualization by 18%.",
    type: "palette"
  },
  {
    id: "gt07",
    title: "AI Chatbot Assistant Brand Motion",
    categories: ["ai", "motion", "brand"],
    img: "https://images.unsplash.com/photo-1628260412297-a3377e45006f?q=80&w=1400&auto=format&fit=crop",
    palette: ["#111827", "#3B82F6", "#10B981", "#E5E7EB", "#F9FAFB"],
    notes: "Balanced cool palette to symbolize clarity and precision in conversational UX.",
    roi: "+45% chat engagement, +9% qualified lead rate.",
    type: "palette"
  },
  {
    id: "gt08",
    title: "Graston eCommerce Revamp",
    categories: ["web", "ux", "conversion"],
    img: "https://images.unsplash.com/photo-1607082349566-187342175e2d?q=80&w=1400&auto=format&fit=crop",
    palette: ["#FFFFFF", "#0EA5E9", "#0F172A", "#F59E0B", "#22C55E"],
    notes: "Conversion-optimized checkout UI. Blue trust tone with warm secondary cues for completion flow.",
    roi: "+18% checkout conversion; -22% cart abandonment.",
    type: "palette"
  },
  {
    id: "gt09",
    title: "Membership Portal Experience",
    categories: ["ux", "membership", "web"],
    img: "https://images.unsplash.com/photo-1590608897129-79da98d159f4?q=80&w=1400&auto=format&fit=crop",
    palette: ["#F3F4F6", "#334155", "#0F172A", "#2563EB", "#38BDF8"],
    notes: "Clean membership dashboard emphasizing data trust and user empowerment.",
    roi: "+60% monthly active user retention.",
    type: "palette"
  },
  {
    id: "gt10",
    title: "GT CEU Shorts Visual System",
    categories: ["content", "video", "education"],
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1400&auto=format&fit=crop",
    palette: ["#0F172A", "#EAB308", "#F9FAFB", "#A78BFA", "#10B981"],
    notes: "Vivid accents for on-demand learning assets. Modular identity fits thumbnails and motion graphics.",
    roi: "+70% CEU Shorts purchase growth.",
    type: "palette"
  },
];

// Transform side projects into inspiration items
const transformSideProjectToInspiration = (project: typeof sideProjectsData.projects[0]) => {
  const primaryImage = project.images?.[0] || "/images/placeholder.jpg";

  // Extract color palette from project (create a palette if needed)
  const defaultPalette = ["#111827", "#3B82F6", "#F9FAFB", "#E5E7EB", "#10B981"];

  // Get metrics as ROI string
  const metricsString = project.metrics
    ? Object.entries(project.metrics)
        .map(([key, value]) => `${key}: ${value}`)
        .join(" • ")
    : "Project completed successfully";

  return {
    id: project.id,
    title: project.title,
    categories: [project.category.toLowerCase().replace(/\s+/g, "-"), "branding", "design"],
    img: primaryImage,
    palette: defaultPalette,
    notes: `${project.challenge.substring(0, 100)}... ${project.approach.substring(0, 50)}...`,
    roi: metricsString,
    type: "project" as const,
    slug: project.slug,
    client: project.client,
    year: project.year,
    services: project.services,
    projectUrl: `/side-projects/${project.slug}`,
    featured: project.featured || false
  };
};

// Combine all inspiration items
const ALL_INSPIRATION = [
  ...INSPIRATION_PALETTES,
  ...sideProjectsData.projects.map(transformSideProjectToInspiration)
];

// ------------------------------
// TYPES
// ------------------------------
type InspirationItem = typeof ALL_INSPIRATION[0] & {
  type?: "palette" | "project";
  slug?: string;
  client?: string;
  year?: string;
  services?: string[];
  projectUrl?: string;
  featured?: boolean;
};

// ------------------------------
// PALETTE SWATCH — color preview component (memoized)
// ------------------------------
const PaletteSwatch = React.memo(({ hex }: { hex: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty("--palette-color", hex);
    }
  }, [hex]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className="palette-swatch w-16 h-16 rounded-lg border-2 border-neutral-200 dark:border-neutral-700 shadow-md"
        aria-label={`Color swatch: ${hex}`}
      />
      <span className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">{hex}</span>
    </div>
  );
});

PaletteSwatch.displayName = "PaletteSwatch";

// ------------------------------
// HERO with parallax + motion gradient
// ------------------------------
function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.h1
          className="font-brand text-6xl md:text-8xl font-bold text-white mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          Creative Universe
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-neutral-300 leading-relaxed mb-6"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          A living canvas of colors, patterns, and motion drawn from every project. Explore the visual DNA that shapes creative decisions across design, photography, and development.
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-4 text-sm text-neutral-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            {INSPIRATION_PALETTES.length} Color Palettes
          </span>
          <span className="w-1 h-1 bg-neutral-600 rounded-full" />
          <span className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            {sideProjectsData.projects.length} Side Projects
          </span>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

// ------------------------------
// FILTER BAR
// ------------------------------
const FilterBar = React.memo(({
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange
}: {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}) => {
  const filters = ["All", "Palettes", "Projects", "Branding", "UI/UX", "Web"];

  return (
    <div className="sticky top-20 z-40 bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-5 h-5 text-neutral-400" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-neutral-800 rounded-lg p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`p-2 rounded transition-colors ${
              viewMode === "grid" ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white"
            }`}
            aria-label="Grid view"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`p-2 rounded transition-colors ${
              viewMode === "list" ? "bg-neutral-700 text-white" : "text-neutral-400 hover:text-white"
            }`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
});

FilterBar.displayName = "FilterBar";

// ------------------------------
// HOVER CARD — with animated ROI overlay (optimized)
// ------------------------------
const InspirationCard = React.memo(({
  item,
  onOpen,
  viewMode
}: {
  item: InspirationItem;
  onOpen: (item: InspirationItem) => void;
  viewMode: "grid" | "list";
}) => {
  const handleClick = useCallback(() => {
    onOpen(item);
  }, [item, onOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(item);
    }
  }, [item, onOpen]);

  if (viewMode === "list") {
    return (
      <motion.div
        onClick={handleClick}
        whileHover={{ x: 4 }}
        className="group relative w-full rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-800/70 shadow-sm cursor-pointer backdrop-blur-sm flex items-center gap-6 p-6"
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`View ${item.title}`}
      >
        <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden">
          <OptimizedImage
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            sizes="128px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="text-white font-bold text-xl mb-1">{item.title}</h3>
              {item.client && (
                <p className="text-neutral-400 text-sm">{item.client} • {item.year}</p>
              )}
            </div>
            {item.type === "project" && item.projectUrl && (
              <Link
                to={item.projectUrl}
                onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors"
                aria-label={`View ${item.title} project details`}
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
            )}
          </div>
          <p className="text-neutral-300 text-sm mb-2 line-clamp-2">{item.notes}</p>
          <div className="flex items-center gap-2 flex-wrap">
            {item.categories.slice(0, 3).map((cat) => (
              <span key={cat} className="px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-300">
                {cat}
              </span>
            ))}
          </div>
          {item.roi && (
            <p className="text-green-400 text-xs mt-2">{item.roi}</p>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      className="group relative w-full rounded-3xl overflow-hidden border border-neutral-700 bg-neutral-800/70 shadow-sm cursor-pointer backdrop-blur-sm"
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`View ${item.title} inspiration`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <OptimizedImage
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 pointer-events-none"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
              {item.client && (
                <p className="text-neutral-300 text-xs mb-2">{item.client}</p>
              )}
              <p className="text-neutral-200 text-sm line-clamp-2">{item.roi}</p>
            </div>
            {item.type === "project" && item.projectUrl && (
              <Link
                to={item.projectUrl}
                onClick={(e) => e.stopPropagation()}
                className="flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors pointer-events-auto"
                aria-label={`View ${item.title} project details`}
              >
                <ExternalLink className="w-5 h-5" />
              </Link>
            )}
          </div>
          {item.featured && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => {
  return prevProps.item.id === nextProps.item.id && prevProps.viewMode === nextProps.viewMode;
});

InspirationCard.displayName = "InspirationCard";

// ------------------------------
// MASONRY WRAPPER (memoized)
// ------------------------------
const Masonry = React.memo(({
  items,
  onOpen,
  viewMode
}: {
  items: typeof ALL_INSPIRATION;
  onOpen: (item: InspirationItem) => void;
  viewMode: "grid" | "list";
}) => {
  const handleOpen = useCallback((item: InspirationItem) => {
    onOpen(item);
  }, [onOpen]);

  return (
    <div className={`${
      viewMode === "grid"
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        : "flex flex-col gap-4"
    } px-6 py-12 max-w-7xl mx-auto`}>
      {items.map((item) => (
        <InspirationCard key={item.id} item={item} onOpen={handleOpen} viewMode={viewMode} />
      ))}
    </div>
  );
});

Masonry.displayName = "Masonry";

// ------------------------------
// LIGHTBOX — enhanced aesthetic (optimized)
// ------------------------------
const Lightbox = React.memo(({ open, onClose, card }: { open: boolean; onClose: () => void; card: InspirationItem | null }) => {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, handleEscape]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const categoriesString = useMemo(() => {
    return card?.categories.join(" • ") || "";
  }, [card?.categories]);

  if (!open || !card) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full bg-neutral-900 rounded-3xl overflow-hidden border-2 border-gradient-to-r from-blue-500 to-purple-500"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <OptimizedImage
            src={card.img}
            alt={card.title}
            className="w-full h-96 object-cover"
            loading="eager"
            priority
            sizes="(max-width: 768px) 100vw, 896px"
          />
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 id="lightbox-title" className="text-3xl font-bold mb-2">{card.title}</h2>
                {card.client && (
                  <p className="text-neutral-400 mb-2">{card.client} • {card.year}</p>
                )}
                <p className="text-neutral-500 mb-4">{categoriesString}</p>
              </div>
              {card.type === "project" && card.projectUrl && (
                <Link
                  to={card.projectUrl}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>View Project</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              )}
            </div>
            <p className="text-neutral-300 mb-6">{card.notes}</p>
            {card.services && (
              <div className="mb-6">
                <p className="text-sm text-neutral-400 mb-2">Services:</p>
                <div className="flex flex-wrap gap-2">
                  {card.services.map((service) => (
                    <span key={service} className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-300">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {card.type === "palette" && (
              <div className="flex gap-3 mb-6">
                {card.palette.map((hex) => (
                  <PaletteSwatch key={hex} hex={hex} />
                ))}
              </div>
            )}
            <p className="text-green-600 dark:text-green-400 font-semibold">{card.roi}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Close lightbox"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

Lightbox.displayName = "Lightbox";

// ------------------------------
// PLAYGROUND — try a palette on UI components (optimized)
// ------------------------------
function Playground({ palette }: { palette: string[] | undefined }) {
  const [primary, setPrimary] = useState(palette?.[1] || "#2563EB");
  const [bg, setBg] = useState(palette?.[3] || "#F3F4F6");
  const [text, setText] = useState("#0F172A");
  const previewCardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);

  const paletteKey = useMemo(() => palette?.join(","), [palette]);

  useEffect(() => {
    if (!palette) return;
    setPrimary(palette[1] || primary);
    setBg(palette[3] || bg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paletteKey]);

  useEffect(() => {
    if (previewCardRef.current) {
      previewCardRef.current.style.setProperty("--playground-bg", bg);
      previewCardRef.current.style.setProperty("--playground-text", text);
    }
    if (buttonRef.current) {
      buttonRef.current.style.setProperty("--playground-primary", primary);
    }
    const primaryWithOpacity = primary + "33";
    metricRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.setProperty("--playground-metric-bg", primaryWithOpacity);
        ref.style.setProperty("--playground-text", text);
      }
    });
  }, [bg, text, primary]);

  const handlePrimaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimary(e.target.value);
  }, []);

  const handleBgChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBg(e.target.value);
  }, []);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const metrics = useMemo(() => {
    return [1, 2, 3].map((n) => ({
      id: n,
      value: Math.round(Math.random() * 100)
    }));
  }, []);

  return (
    <section className="py-16 px-6 bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Live Color Tokens</h2>
        <p className="text-neutral-400 mb-8">
          Test palette choices against common UI components.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Adjust Colors</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Primary</label>
                <input
                  type="color"
                  value={primary}
                  onChange={handlePrimaryChange}
                  className="w-full h-10 rounded-md"
                  aria-label="Primary color"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Background</label>
                <input
                  type="color"
                  value={bg}
                  onChange={handleBgChange}
                  className="w-full h-10 rounded-md"
                  aria-label="Background color"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Text</label>
                <input
                  type="color"
                  value={text}
                  onChange={handleTextChange}
                  className="w-full h-10 rounded-md"
                  aria-label="Text color"
                />
              </div>
            </div>
          </div>
          <div>
            <div
              ref={previewCardRef}
              className="playground-preview-card p-6 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-2">Sample Card</h3>
              <button
                ref={buttonRef}
                className="playground-button px-4 py-2 rounded-lg font-medium transition-opacity hover:opacity-90"
              >
                Primary CTA
              </button>
            </div>
            <p className="text-sm text-neutral-500 mt-4">
              Preview headings, body text, and button contrast in real-time. Ship palettes that look good and meet WCAG contrast.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {metrics.map((metric, index) => (
                <div
                  key={metric.id}
                  ref={(el) => { metricRefs.current[index] = el; }}
                  className="playground-metric-card p-4 rounded-lg text-center"
                >
                  <div className="text-2xl font-bold">Metric {metric.id}</div>
                  <div className="text-sm">{metric.value}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------
// TYPOGRAPHY SAMPLER — variable font feel (optimized)
// ------------------------------
function TypeSampler() {
  const [brand, setBrand] = useState<"cmo" | "dev">("cmo");
  const [weight, setWeight] = useState(700);
  const samplerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (samplerRef.current) {
      samplerRef.current.style.setProperty("--typography-weight", String(weight));
    }
  }, [weight]);

  const handleBrandChange = useCallback((b: "cmo" | "dev") => {
    setBrand(b);
  }, []);

  const handleWeightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(parseInt(e.target.value));
  }, []);

  return (
    <section className="py-16 px-6 bg-neutral-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Typography Sampler</h2>
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {(["cmo", "dev"] as const).map((b) => (
              <button
                key={b}
                onClick={() => handleBrandChange(b)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  brand === b
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "bg-neutral-100 dark:bg-neutral-700"
                }`}
              >
                {b.toUpperCase()} Theme
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="font-weight-slider" className="block text-sm mb-2">
              Weight: {weight}
            </label>
            <input
              id="font-weight-slider"
              type="range"
              min="300"
              max="900"
              step="100"
              value={weight}
              onChange={handleWeightChange}
              className="w-full"
              aria-label="Font weight slider"
            />
          </div>
        </div>
        <div
          ref={samplerRef}
          className={`typography-sampler space-y-6 ${brand}-theme`}
          role="article"
          aria-label="Typography preview"
        >
          <h1 className="typography-heading text-5xl">
            Heading One
          </h1>
          <h2 className="typography-heading text-3xl">
            Heading Two
          </h2>
          <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            Body copy that balances readability with personality. Switch brand sets and adjust weight to preview tone.
          </p>
          <div className="mt-8 space-y-2 text-sm text-neutral-500">
            <p>• Buttons, inputs, and cards adapt to font system.</p>
            <p>• Serif = authority (CMO), Mono = tech polish (Dev).</p>
            <p>• Mind x-height, contrast, and line-length.</p>
            <p>• Pair with consistent radius + spacing tokens.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ------------------------------
// ROOT PAGE (optimized)
// ------------------------------
export default function InspirationPage() {
  const [lightbox, setLightbox] = useState<{ open: boolean; card: InspirationItem | null }>({ open: false, card: null });
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleOpenLightbox = useCallback((card: InspirationItem) => {
    setLightbox({ open: true, card });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightbox({ open: false, card: null });
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return ALL_INSPIRATION;
    if (activeFilter === "Palettes") return ALL_INSPIRATION.filter(item => item.type === "palette");
    if (activeFilter === "Projects") return ALL_INSPIRATION.filter(item => item.type === "project");
    return ALL_INSPIRATION.filter(item =>
      item.categories.some(cat => cat.toLowerCase().includes(activeFilter.toLowerCase())) ||
      item.title.toLowerCase().includes(activeFilter.toLowerCase())
    );
  }, [activeFilter]);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({ event: 'inspiration_view' });
    }
  }, []);

  const currentPalette = useMemo(() => lightbox.card?.palette, [lightbox.card?.palette]);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0d] to-[#0a0a0a] text-white">
      <Hero />
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <Masonry items={filteredItems} onOpen={handleOpenLightbox} viewMode={viewMode} />
      <AnimatePresence mode="wait">
        {lightbox.open && lightbox.card && (
          <Lightbox
            open={lightbox.open}
            onClose={handleCloseLightbox}
            card={lightbox.card}
          />
        )}
      </AnimatePresence>
      <Playground palette={currentPalette} />
      <TypeSampler />
      <footer className="py-8 text-center text-neutral-500">
        © {currentYear} Creative Universe by Jacob Darling
      </footer>
    </div>
  );
}
