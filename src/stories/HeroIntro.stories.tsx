import React from 'react';
import HeroIntro from '../components/home/HeroIntro';

export default {
  title: 'Home/HeroIntro',
  component: HeroIntro,
};

export const Default = () => (
  <HeroIntro
    headline="Welcome to My Portfolio"
    subhead="Building exceptional digital experiences"
    avatarSrc="/demoAssets/avatar.jpg"
    avatarAlt="Profile avatar"
  />
);

export const WithMetrics = () => (
  <HeroIntro
    headline="Welcome to My Portfolio"
    subhead="Building exceptional digital experiences"
    metrics={[
      { label: 'Projects', value: '50+' },
      { label: 'Clients', value: '30+' },
      { label: 'Years', value: '5+' },
    ]}
  />
);

