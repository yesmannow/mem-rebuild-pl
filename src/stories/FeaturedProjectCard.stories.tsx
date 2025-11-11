import React from 'react';
import FeaturedProjectCard from '../components/home/FeaturedProjectCard';

export default {
  title: 'Home/FeaturedProjectCard',
  component: FeaturedProjectCard,
};

const demoProject = {
  title: 'Example Project',
  description: 'A modern web application showcasing innovative design and technical excellence.',
  image: '/demoAssets/project-placeholder.jpg',
  tags: ['React', 'TypeScript', 'Tailwind CSS'],
  link: 'https://example.com',
  slug: 'example-project',
};

export const Default = () => <FeaturedProjectCard {...demoProject} />;

export const WithoutTags = () => (
  <FeaturedProjectCard
    title="Project Without Tags"
    description="A project card without tag information."
    image="/demoAssets/project-placeholder.jpg"
  />
);

export const WithManyTags = () => (
  <FeaturedProjectCard
    {...demoProject}
    tags={['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vite', 'ESLint']}
  />
);

