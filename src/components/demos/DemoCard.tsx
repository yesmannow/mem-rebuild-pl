import React from 'react';
// @ts-ignore - manifest may not exist during dev
import manifest from '@data/images.manifest.json';
import OptimizedImage from '@components/media/OptimizedImage';

export interface DemoCardProps {
  title: string;
  image: string;
  href?: string;
}

export default function DemoCard({ title, image, href }: DemoCardProps) {
  const m: any = (manifest as any)[image];
  const glow = m?.color ?? 'rgb(73 195 178 / 0.25)';

  return (
    <a
      href={href ?? '#'}
      className="group relative block overflow-hidden rounded-2xl border border-white/5 bg-neutral-950/70 p-4 ring-1 ring-white/5 transition-transform hover:scale-[1.02]"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${glow}, transparent 70%)` }}
      />
      <OptimizedImage src={image} alt={title} className="h-44 w-full rounded-xl object-cover" />
      <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
    </a>
  );
}

