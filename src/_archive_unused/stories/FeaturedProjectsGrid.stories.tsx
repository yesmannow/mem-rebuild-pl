import React from 'react';
import FeaturedProjectsGrid from '../components/home/FeaturedProjectsGrid';

export default {
  title: 'Home/FeaturedProjectsGrid',
  component: FeaturedProjectsGrid,
};

const demoItems = [
  {
    title: 'Project One',
    description: 'First featured project with modern design principles.',
    image: '/demoAssets/project-placeholder.jpg',
    tags: ['React', 'TypeScript'],
    link: 'https://example.com/project1',
    slug: 'project-one',
  },
  {
    title: 'Project Two',
    description: 'Second featured project showcasing technical excellence.',
    image: '/demoAssets/project-placeholder.jpg',
    tags: ['Vue', 'Nuxt'],
    link: 'https://example.com/project2',
    slug: 'project-two',
  },
  {
    title: 'Project Three',
    description: 'Third featured project with innovative solutions.',
    image: '/demoAssets/project-placeholder.jpg',
    tags: ['Next.js', 'Tailwind'],
    link: 'https://example.com/project3',
    slug: 'project-three',
  },
];

export const Default = () => <FeaturedProjectsGrid items={demoItems} />;

export const SingleItem = () => (
  <FeaturedProjectsGrid items={[demoItems[0]]} />
);

export const ManyItems = () => (
  <FeaturedProjectsGrid
    items={[
      ...demoItems,
      {
        title: 'Project Four',
        description: 'Additional project for grid testing.',
        image: '/demoAssets/project-placeholder.jpg',
        tags: ['Svelte'],
        slug: 'project-four',
      },
      {
        title: 'Project Five',
        description: 'Another project in the grid.',
        image: '/demoAssets/project-placeholder.jpg',
        tags: ['Angular'],
        slug: 'project-five',
      },
      {
        title: 'Project Six',
        description: 'Final project in the expanded grid.',
        image: '/demoAssets/project-placeholder.jpg',
        tags: ['Remix'],
        slug: 'project-six',
      },
    ]}
  />
);

