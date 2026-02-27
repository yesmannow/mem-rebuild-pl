import React from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { motion, LayoutGroup } from 'framer-motion';
import projectsData from '../data/projects.json';
import type { FlagshipProject } from '../types';

const flagshipProjects = projectsData as FlagshipProject[];

interface ProjectRouteState {
  heroImage?: string;
  layoutId?: string;
}

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const routeState = (location.state || {}) as ProjectRouteState;
  const project = flagshipProjects.find(p => (p.slug ?? p.id) === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const heroImage = routeState.heroImage ?? project.heroImage;
  const layoutId = routeState.layoutId ?? `project-hero-${project.slug ?? project.id}`;

  return (
    <LayoutGroup>
      <main className="relative min-h-screen bg-[#01030a] text-white overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(0,242,255,0.2), transparent 50%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.05), transparent 50%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-screen"
          style={{ backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }}
        />

        <section className="relative h-screen">
          <motion.div layoutId={layoutId} className="absolute inset-0">
            <img src={heroImage} alt={project.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/70 to-black" />
          </motion.div>

          <div className="relative z-10 flex h-full flex-col justify-between px-6 pt-10 pb-12 md:px-10 lg:px-16">
            <div className="flex items-center justify-between text-xs font-['Geist',_sans-serif] uppercase tracking-[0.6em] text-white/70">
              <Link to="/projects" className="flex items-center gap-2 text-white/70 transition hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                <span>← Back</span>
              </Link>
              <span>{project.client}</span>
            </div>

            <div>
              <p className="font-['Geist',_sans-serif] text-[11px] uppercase tracking-[0.8em] text-cyan-300">Flagship Deploy</p>
              <h1 className="mt-4 max-w-5xl font-['Playfair_Display'] text-[clamp(3.5rem,10vw,8rem)] italic leading-[0.9] text-white">
                {project.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-4 text-white/70">
                {project.roles.map(role => (
                  <span key={role} className="border border-white/30 px-5 py-1 font-['Geist',_sans-serif] text-[10px] uppercase tracking-[0.4em]">
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <p className="font-['Geist',_sans-serif] text-sm uppercase tracking-[0.4em] text-cyan-200">Summary</p>
              <p className="mt-4 text-lg text-white/80">{project.excerpt}</p>
              <p className="mt-6 text-white/60 leading-relaxed">{project.summary}</p>

              <div className="mt-10">
                <p className="font-['Geist',_sans-serif] text-sm uppercase tracking-[0.4em] text-cyan-200">Outcomes</p>
                <ul className="mt-6 space-y-4 border-l border-white/20 pl-6">
                  {project.outcomes.map(item => (
                    <li key={item} className="text-white/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 flex flex-wrap gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-300 px-8 py-3 font-['Geist',_sans-serif] text-xs uppercase tracking-[0.5em] text-black shadow-[0_20px_60px_rgba(34,211,238,0.35)] transition hover:scale-105"
                  >
                    Visit Live Experience
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-3 font-['Geist',_sans-serif] text-xs uppercase tracking-[0.5em] text-white/70 transition hover:border-cyan-400/50 hover:text-white"
                  >
                    View Build Notes
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <p className="font-['Geist',_sans-serif] text-[10px] uppercase tracking-[0.6em] text-white/50">Metric</p>
                <p className="mt-2 font-['Playfair_Display'] text-6xl italic text-cyan-300">{project.metrics.value}</p>
                <p className="font-['Geist',_sans-serif] text-[11px] uppercase tracking-[0.6em] text-white/60">{project.metrics.label}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
                <p className="font-['Geist',_sans-serif] text-[10px] uppercase tracking-[0.6em] text-white/50">Engagement</p>
                <p className="mt-3 text-white/70">
                  Digital Twilight build, pinned parallax storytelling, and high-touch telemetry overlays to prove impact within 30 seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {project.gallery && project.gallery.length > 0 && (
          <section className="relative z-10 space-y-8 px-6 pb-20 md:px-10">
            {project.gallery.map((image, index) => (
              <div key={image} className="overflow-hidden rounded-3xl border border-white/10">
                <img src={image} alt={`${project.title} frame ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </section>
        )}
      </main>
    </LayoutGroup>
  );
};

export default ProjectDetail;
