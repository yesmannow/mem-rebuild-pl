import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import inspirationProjects from '../data/inspiration-projects.json';
import AnchorNav from '../components/navigation/AnchorNav';
import './InspirationDetail.css';

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

    // Debug logging
    console.log('Sections created:', sections.length);
    sections.forEach((s, i) => {
      console.log(`Section ${i}: ${s.title} - Content length: ${s.content.length}`);
    });

    return sections;
  }, [project?.fullContent]);

  // Create anchor items for navigation
  const anchorItems = useMemo(() => {
    const items = [
      { id: 'overview', label: 'Overview' },
      ...sections.map((section, index) => ({
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
    <main className="inspiration-detail">
      {/* Anchor Navigation */}
      {sections.length > 0 && <AnchorNav anchors={anchorItems} />}

      <div className="inspiration-detail__container">
        {/* Back Link */}
        <Link to="/inspiration" className="inspiration-detail__back">
          <ArrowLeft size={20} />
          <span>Back to Inspiration</span>
        </Link>

        {/* Hero Section */}
        <section className="inspiration-detail__hero">
          <div className="inspiration-detail__image-wrapper">
            <img
              src={project.image}
              alt={project.title}
              className="inspiration-detail__image"
            />
          </div>

          <div className="inspiration-detail__header">
            <h1 className="inspiration-detail__title">{project.title}</h1>

            <div className="inspiration-detail__meta">
              {formattedDate && (
                <div className="inspiration-detail__meta-item">
                  <Calendar size={16} />
                  <span>{formattedDate}</span>
                </div>
              )}

              {project.tags && project.tags.length > 0 && (
                <div className="inspiration-detail__tags">
                  <Tag size={16} />
                  {project.tags.map(tag => (
                    <span key={tag} className="inspiration-detail__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {project.source_credit && (
              <p className="inspiration-detail__credit">{project.source_credit}</p>
            )}
          </div>
        </section>

        {/* Content Section */}
        <section className="inspiration-detail__content">
          <div id="overview" className="inspiration-detail__summary">
            <h2>Overview</h2>
            <p className="inspiration-detail__summary-text">{project.summary}</p>
          </div>

          {sections.length > 0 && (
            <div className="inspiration-detail__deep-dive">
              <h2 className="inspiration-detail__deep-dive-title">Deep Dive</h2>
              {sections.map((section) => {
                const contentParagraphs = section.content.split('\n\n').filter(p => p.trim());
                return (
                  <div key={section.id} id={section.id} className="inspiration-detail__section">
                    <h3 className="inspiration-detail__section-title">{section.title}</h3>
                    <div className="inspiration-detail__section-content">
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
          )}
        </section>

        {/* External Link */}
        {project.url && (
          <section className="inspiration-detail__actions">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inspiration-detail__external-link"
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

