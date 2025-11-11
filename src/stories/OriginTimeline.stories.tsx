import React from 'react';
import OriginTimeline from '../components/about/OriginTimeline';

export default {
  title: 'About/OriginTimeline',
  component: OriginTimeline,
};

const demoEntries = [
  {
    year: '2020',
    title: 'The Beginning',
    description: 'Started my journey in web development with a passion for creating beautiful user experiences.',
  },
  {
    year: '2021',
    title: 'First Major Project',
    description: 'Completed my first large-scale web application, learning valuable lessons about scalability and performance.',
  },
  {
    year: '2022',
    title: 'Expanding Skills',
    description: 'Dived deeper into modern frameworks and design systems, building more sophisticated applications.',
  },
  {
    year: '2023',
    title: 'Recognition',
    description: 'Received recognition for innovative design solutions and technical excellence in multiple projects.',
  },
  {
    year: '2024',
    title: 'Current Focus',
    description: 'Continuing to push boundaries in user experience design and technical implementation.',
  },
];

export const Default = () => <OriginTimeline entries={demoEntries} />;

export const ShortTimeline = () => (
  <OriginTimeline entries={demoEntries.slice(0, 3)} />
);

export const SingleEntry = () => (
  <OriginTimeline entries={[demoEntries[0]]} />
);

