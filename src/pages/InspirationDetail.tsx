import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import inspirationProjects from '../data/inspiration-projects.json';
import AnchorNav from '../components/navigation/AnchorNav';

interface Project {
  title: string;
  url: string;
  image: string;
  tags?: string[];
  summary: string;
  fullContent?: string;
  source_credit?: string;
  date: string;
  slug?: string;
  externalUrl?: string;
}

interface ContentSection {
  id: string;
  title: string;
  content: string;
}

const InspirationDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = (inspirationProjects as Project[]).find(p => p.slug === slug);

  // Parse fullContent into structured sections based on paragraph patterns
  const sections = useMemo(() => {
    if (!project?.fullContent) return [];

    const paragraphs = project.fullContent.split('\n\n').filter(p => p.trim().length > 0);

    // If no paragraphs, return empty
    if (paragraphs.length === 0) return [];

    // Group paragraphs into logical sections (typically 2 paragraphs per section)
    const sections: ContentSection[] = [];
    const paragraphsPerSection = 2; // Group every 2 paragraphs into a section

    // Section titles based on typical content flow
    const sectionTitles = [
      'The Challenge',
      'The Solution',
      'Design Approach',
      'Visual Identity',
      'Impact & Results'
    ];

    for (let i = 0; i < paragraphs.length; i += paragraphsPerSection) {
      const sectionParagraphs = paragraphs.slice(i, i + paragraphsPerSection);
      const sectionIndex = Math.floor(i / paragraphsPerSection);
      const title = sectionTitles[sectionIndex] || `Section ${sectionIndex + 1}`;

      // Only create section if we have content
      if (sectionParagraphs.length > 0 && sectionParagraphs.some(p => p.trim())) {
        const content = sectionParagraphs.join('\n\n').trim();
        if (content) {
          sections.push({
            id: `section-${sectionIndex + 1}`,
            title: title,
            content: content
          });
        }
      }
    }

    return sections;
  }, [project?.fullContent]);

  // Create anchor items for navigation
  const anchorItems = useMemo(() => {
    const items = [
      { id: 'overview', label: 'Overview' },
      ...sections.map((section) => ({
        id: section.id,
        label: section.title
      }))
    ];
    return items;
  }, [sections]);

  if (!project) {
    return <Navigate to="/inspiration" replace />;
  }

  // Format date
  const formattedDate = project.date
    ? new Date(project.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
  <main className="inspiration-detail bg-[var(--ink-900)] text-[var(--parchment-050)]">
      {/* Anchor Navigation */}
      {sections.length > 0 && <AnchorNav anchors={anchorItems} />}

      <div className="inspiration-detail__container container mx-auto px-6 py-10">
        {/* Back Link */}
        <Link to="/inspiration" className="inspiration-detail__back inline-flex items-center gap-2 text-[var(--parchment-050)]/70 hover:text-[var(--signal-500)] transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Inspiration</span>
        </Link>

        {/* Hero Section */}
        <section className="inspiration-detail__hero grid md:grid-cols-2 gap-6 mt-6">
          <div className="inspiration-detail__image-wrapper rounded-xl overflow-hidden border border-[var(--ink-700)]/60">
            <img
              src={project.image}
              alt={project.title}
              className="inspiration-detail__image w-full h-full object-cover"
            />
          </div>

          <div className="inspiration-detail__header">
            <h1 className="inspiration-detail__title text-3xl md:text-4xl font-display font-bold tracking-tight">{project.title}</h1>

            <div className="inspiration-detail__meta">
              {formattedDate && (
                <div className="inspiration-detail__meta-item mt-2 inline-flex items-center gap-2 text-[var(--parchment-050)]/70">
                  <Calendar size={16} />
                  <span>{formattedDate}</span>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="inspiration-detail__tags mt-2 flex flex-wrap gap-2">
                  <Tag size={16} />
                  {project.tags.map(tag => (
                    <span key={tag} className="inspiration-detail__tag text-xs px-2 py-1 rounded-full bg-[var(--ink-800)] border border-[var(--ink-700)]/60">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {project.source_credit && (
              <p className="inspiration-detail__credit mt-3 text-[var(--parchment-050)]/70">{project.source_credit}</p>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="inspiration-detail__content mt-10">
          <div id="overview" className="inspiration-detail__summary">
            <h2 className="text-2xl md:text-3xl font-semibold">Overview</h2>
            {project.summary && project.summary.trim() ? (
              <p className="inspiration-detail__summary-text mt-2 text-[var(--parchment-050)]/80">{project.summary}</p>
            ) : (
              <p className="inspiration-detail__summary-text mt-2 text-[var(--parchment-050)]/60 italic">
                No summary available. {project.url && project.url.startsWith('http') && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-[var(--signal-500)] hover:underline">
                    View original project
                  </a>
                )}
              </p>
            )}
          </div>

          {sections.length > 0 ? (
            <div className="inspiration-detail__deep-dive mt-10">
              <h2 className="inspiration-detail__deep-dive-title text-2xl md:text-3xl font-semibold">Deep Dive</h2>
              {sections.map((section) => {
                const contentParagraphs = section.content.split('\n\n').filter(p => p.trim());
                return (
                  <div key={section.id} id={section.id} className="inspiration-detail__section mt-6">
                    <h3 className="inspiration-detail__section-title text-xl font-semibold">{section.title}</h3>
                    <div className="inspiration-detail__section-content mt-2 space-y-3 text-[var(--parchment-050)]/80">
                      {contentParagraphs.length > 0 ? (
                        contentParagraphs.map((paragraph, index) => (
                          <p key={index}>{paragraph.trim()}</p>
                        ))
                      ) : (
                        <p>{section.content}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : project.fullContent && project.fullContent.trim() ? (
            <div className="inspiration-detail__deep-dive mt-10">
              <h2 className="inspiration-detail__deep-dive-title text-2xl md:text-3xl font-semibold">Details</h2>
              <div className="inspiration-detail__section-content mt-2 space-y-3 text-[var(--parchment-050)]/80">
                {project.fullContent.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        {/* External Link */}
        {(project.externalUrl || (project.url && project.url.startsWith('http'))) && (
          <section className="inspiration-detail__actions mt-10">
            <a
              href={project.externalUrl || project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inspiration-detail__external-link inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold"
            >
              <ExternalLink size={20} />
              <span>View Original Project</span>
            </a>
          </section>
        )}
      </div>
    </main>
  );
};

export default InspirationDetail;

