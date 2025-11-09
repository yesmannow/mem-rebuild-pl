import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InspirationCard from '../components/InspirationCard';
import inspirationProjects from '../data/inspiration-projects.json';

interface Project {
  title: string;
  url: string;
  image: string;
  tags?: string[];
  summary: string;
  source_credit?: string;
  date: string;
  slug?: string;
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
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(inspirationProjects as Project[]);

  // Extract unique tags
  const uniqueTags = React.useMemo(() => {
    const tags = new Set<string>();
    (inspirationProjects as Project[]).forEach(project => {
      project.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  useEffect(() => {
    if (activeTag === 'all') {
      setFilteredProjects(inspirationProjects as Project[]);
    } else {
      const filtered = (inspirationProjects as Project[]).filter(project =>
        project.tags?.map(t => t.toLowerCase()).includes(activeTag.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [activeTag]);

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
  };

  const getTagCount = (tag: string): number => {
    if (tag === 'all') return (inspirationProjects as Project[]).length;
    return (inspirationProjects as Project[]).filter(p =>
      p.tags?.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    ).length;
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Curated <span className="text-blue-600">Design Inspiration</span> ✨
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          A hand-picked collection of exceptional branding and design projects, summarized by <strong>Gemini</strong>.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="mb-10 flex flex-wrap gap-2 justify-center">
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
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.slug || index}
              to={`/inspiration/${project.slug}`}
              className="block"
            >
              <InspirationCard
                project={{ data: project }}
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
  );
};

export default InspirationPage;

