import React from 'react';
import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="flex gap-6 p-4 bg-slate-900 text-white">
      <Link href="/">Home</Link>
      <Link href="/inspiration">Inspiration</Link>
      <Link href="/brand-builder">Brand Builder</Link>
      <Link href="/gallery">Gallery</Link>
    </nav>
  );
}
