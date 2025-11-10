import React from 'react';
import { Helmet } from 'react-helmet-async';
import items from '@data/gallery.json';
import GalleryGrid from '@components/gallery/GalleryGrid';
import PageLayout from '@components/layout/PageLayout';

export default function GalleryPage() {
  return (
    <>
      <Helmet>
        <title>Gallery | BearCave Marketing</title>
        <meta
          name="description"
          content="A collection of work spanning design, photography, branding, and marketing systems."
        />
      </Helmet>

      <PageLayout>
        <main className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="mb-6 text-3xl font-bold text-white">From the Work</h1>
          {items && items.length > 0 ? (
            <GalleryGrid items={items} />
          ) : (
            <p className="text-neutral-400">No gallery items available yet.</p>
          )}
        </main>
      </PageLayout>
    </>
  );
}
