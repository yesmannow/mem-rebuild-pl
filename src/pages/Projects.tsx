import React from 'react';
import ProjectsHero from '../components/projects/ProjectsHero';
import ProjectStack from '../components/projects/ProjectStack';
import projectsData from '../data/projects.json';
import type { FlagshipProject } from '../types';

const flagshipProjects = projectsData as FlagshipProject[];

const Projects: React.FC = () => {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <ProjectsHero />
      <ProjectStack projects={flagshipProjects} />
    </main>
  );
};

export default Projects;
