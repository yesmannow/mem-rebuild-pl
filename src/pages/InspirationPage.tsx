import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InspirationCard from '../components/InspirationCard';
import AnimatedBackground from '../components/AnimatedBackground';
import inspirationProjects from '../data/inspiration-projects.json';
import './InspirationPage.css';

interface Project {
  title: string;
  url?: string;
  image: string;
  tags?: string[];
  summary: string;
  source_credit?: string;
  date: string;
  slug?: string;
}

interface Moodboard {
  slug: string;
  title: string;
  dominantColors?: string[];
  keywords?: string[];
  images?: string[];
  imageCount?: number;
  lastUpdated?: string;
  colorAnalysis?: {
    vibrant?: string;
    muted?: string;
    darkVibrant?: string;
    lightVibrant?: string;
  };
}

interface TagButtonProps {
  tag: string;
  count: number;
  isActive: boolean;
  onClick: (tag: string) => void;
}

const TagButton: React.FC<TagButtonProps> = ({ tag, count, isActive, onClick }) => {
  const className = isActive
    ? "bg-blue-600 text-white border-blue-600"
    : "bg-white text-gray-700 border-gray-300 hover:border-blue-500";

  const displayTag = tag === 'all' ? 'All Projects' : tag.charAt(0).toUpperCase() + tag.slice(1);

  return (
    <button
      onClick={() => onClick(tag)}
      className={`filter-tag text-sm font-medium px-4 py-2 rounded-full border-2 transition duration-200 ${className}`}
    >
      {displayTag} ({count})
    </button>
  );
};

const InspirationPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string>('all');
  const [allProjects, setAllProjects] = useState<Project[]>(inspirationProjects as Project[]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(inspirationProjects as Project[]);
  const [loading, setLoading] = useState(false); // Start with false to show content immediately

  // Background images for animated background
  const backgroundImages = [
    '/images/design/Back 1.png',
    '/images/design/IMG_20220606_011741_906.jpg',
    '/images/design/Adobe_Express_20220527_2105230.6071119382485303.png'
  ];

  // Convert moodboard to project format
  const convertMoodboardToProject = (moodboard: Moodboard): Project => {
    const firstImage = moodboard.images && moodboard.images.length > 0
      ? moodboard.images[0]
      : '/images/default-project.jpg';

    // Get summary from classified.json if available, or generate from keywords
    const summary = moodboard.keywords && moodboard.keywords.length > 0
      ? `A ${moodboard.keywords.join(', ')} design project featuring ${moodboard.imageCount || 0} images. ${moodboard.colorAnalysis?.vibrant ? `Color palette includes vibrant ${moodboard.colorAnalysis.vibrant} tones.` : ''}`
      : `Design project: ${moodboard.title}`;

    return {
      title: moodboard.title,
      url: `/inspiration/${moodboard.slug}`,
      image: firstImage,
      tags: moodboard.keywords || ['Design', 'Branding'],
      summary: summary,
      source_credit: 'Portfolio Project',
      date: moodboard.lastUpdated || new Date().toISOString(),
      slug: moodboard.slug
    };
  };

  // Load all moodboards
  useEffect(() => {
    // Set body background to transparent for this page
    const originalBodyBg = document.body.style.background;
    const originalBodyBgColor = document.body.style.backgroundColor;
    const originalHtmlBg = document.documentElement.style.background;
    const originalHtmlBgColor = document.documentElement.style.backgroundColor;

    document.body.style.background = 'transparent';
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.background = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';

    const loadMoodboards = async () => {
      try {
        setLoading(true); // Set loading when starting to fetch moodboards
        const moodboardFiles = [
          '/moodboards/317 bbq.json',
          '/moodboards/317-bbq.json',
          '/moodboards/classified.json',
          '/moodboards/enhanced-moodboards.json',
          '/moodboards/moodboards.json',
          '/moodboards/riley bennett egloff.json',
          '/moodboards/riley-bennett-egloff.json',
          '/moodboards/Russell painting.json',
          '/moodboards/russell-painting.json',
          '/moodboards/Tuohy Bailey & Moore LLP.json',
          '/moodboards/tuohy-bailey-moore-llp.json'
        ];

        const moodboardProjects: Project[] = [];
        const processedSlugs = new Set<string>();

        for (const file of moodboardFiles) {
          try {
            const response = await fetch(file);
            if (!response.ok) continue;

            const data = await response.json();

            // Handle different JSON structures
            if (data.projects && Array.isArray(data.projects)) {
              // enhanced-moodboards.json or moodboards.json format
              data.projects.forEach((mb: Moodboard) => {
                if (mb.slug && !processedSlugs.has(mb.slug)) {
                  processedSlugs.add(mb.slug);
                  moodboardProjects.push(convertMoodboardToProject(mb));
                }
              });
            } else if (data.slug) {
              // Single moodboard file
              if (!processedSlugs.has(data.slug)) {
                processedSlugs.add(data.slug);
                moodboardProjects.push(convertMoodboardToProject(data));
              }
            } else if (data.classifications && Array.isArray(data.classifications)) {
              // classified.json format - skip as it doesn't have image data
              continue;
            }
          } catch (error) {
            console.warn(`Failed to load ${file}:`, error);
          }
        }

        // Combine existing projects with moodboards
        const combined = [...(inspirationProjects as Project[]), ...moodboardProjects];
        setAllProjects(combined);
        setFilteredProjects(combined);
        setLoading(false);
      } catch (error) {
        console.error('Error loading moodboards:', error);
        setLoading(false);
      }
    };

    loadMoodboards();

    // Cleanup: restore original background on unmount
    return () => {
      document.body.style.background = originalBodyBg;
      document.body.style.backgroundColor = originalBodyBgColor;
      document.documentElement.style.background = originalHtmlBg;
      document.documentElement.style.backgroundColor = originalHtmlBgColor;
    };
  }, []);

  // Extract unique tags
  const uniqueTags = React.useMemo(() => {
    const tags = new Set<string>();
    allProjects.forEach(project => {
      project.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allProjects]);

  useEffect(() => {
    if (activeTag === 'all') {
      setFilteredProjects(allProjects);
    } else {
      const filtered = allProjects.filter(project =>
        project.tags?.map(t => t.toLowerCase()).includes(activeTag.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [activeTag, allProjects]);

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
  };

  const getTagCount = (tag: string): number => {
    if (tag === 'all') return allProjects.length;
    return allProjects.filter(p =>
      p.tags?.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    ).length;
  };

  return (
    <div className="inspiration-page-wrapper" style={{ minHeight: '100vh', width: '100%' }}>
      {/* Animated Background */}
      <AnimatedBackground images={backgroundImages} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 10 }}>
      <header className="text-center mb-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg" style={{ position: 'relative', zIndex: 10 }}>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl drop-shadow-sm">
          Curated <span className="text-blue-600">Design Inspiration</span> ✨
        </h1>
        <p className="mt-3 text-xl text-gray-700">
          A hand-picked collection of exceptional branding and design projects, summarized by <strong>Gemini</strong>.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="mb-10 flex flex-wrap gap-2 justify-center bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md">
        <TagButton
          tag="all"
          count={getTagCount('all')}
          isActive={activeTag === 'all'}
          onClick={handleTagClick}
        />
        {uniqueTags.map(tag => (
          <TagButton
            key={tag}
            tag={tag.toLowerCase()}
            count={getTagCount(tag.toLowerCase())}
            isActive={activeTag === tag.toLowerCase()}
            onClick={handleTagClick}
          />
        ))}
      </div>

      {/* Project Grid */}
      {loading ? (
        <div className="text-center py-12 bg-white/70 backdrop-blur-sm rounded-xl shadow-md">
          <p className="text-gray-700 text-lg font-medium">Loading inspiration projects...</p>
        </div>
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.slug || index}
              to={`/inspiration/${project.slug}`}
              className="block"
            >
              <InspirationCard
                project={{ data: { ...project, url: project.url || `/inspiration/${project.slug || ''}` } }}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No projects found for this filter.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default InspirationPage;

