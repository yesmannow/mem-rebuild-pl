import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';
import { ApiBackgroundImage } from '../components/ui/ApiBackgroundImage';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <main className="bg-[var(--ink-900)] text-[var(--parchment-050)] min-h-dvh relative overflow-hidden">
      {/* API Background Image */}
      <ApiBackgroundImage
        query={`${project.tags.join(' ')} web development`}
        source="pexels"
        overlayColor="dark"
        overlayOpacity={0.85}
        className="fixed inset-0 z-0"
        priority
      />
      <div className="relative z-10 container mx-auto px-6 py-10">
        <Link
          to="/projects"
          className="inline-block mb-6 text-[var(--parchment-050)]/70 hover:text-[var(--signal-500)] transition-colors"
        >
          ← Back to Projects
        </Link>

        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{project.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-[var(--ink-800)] border border-[var(--ink-700)]/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <p className="text-lg text-[var(--parchment-050)]/80 mb-3">{project.description}</p>
          <p className="text-[var(--parchment-050)]/70">{project.longDescription}</p>
        </section>

        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden border border-[var(--ink-700)]/60">
                  <img src={image} alt={`${project.title} - Image ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[var(--signal-500)] text-[var(--ink-900)] font-semibold"
            >
              Visit Website
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg border border-[var(--ink-700)]/60 hover:border-[var(--signal-500)]/60 transition"
            >
              View on GitHub
            </a>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProjectDetail;
