import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import './ProjectDetail.css';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <main className="project-detail">
      <Link to="/projects" className="back-link">
        ← Back to Projects
      </Link>

      <section className="project-header">
        <h1>{project.title}</h1>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="project-description">
        <p className="lead">{project.description}</p>
        <p>{project.longDescription}</p>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="project-gallery">
          <h2>Gallery</h2>
          <div className="gallery-grid">
            {project.gallery.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`${project.title} - Image ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="project-links">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Visit Website
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View on GitHub
          </a>
        )}
      </section>
    </main>
  );
};

export default ProjectDetail;
