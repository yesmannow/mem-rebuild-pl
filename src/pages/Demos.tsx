import React from 'react';
import { Helmet } from 'react-helmet-async';
// @ts-ignore - dataset may not exist during dev
import demos from '@data/demos.json';
import DemoCard from '@components/demos/DemoCard';
import PageLayout from '@components/layout/PageLayout';

export default function DemosPage() {
  return (
    <>
      <Helmet>
        <title>Interactive Demos | BearCave Marketing</title>
        <meta
          name="description"
          content="Explore interactive demos and tools built for marketing automation, lead generation, and growth systems."
        />
      </Helmet>

      <PageLayout>
        <main className="mx-auto max-w-6xl px-6 py-12">
          <h1 className="mb-6 text-3xl font-bold text-white">Interactive Demos</h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {demos && demos.length > 0 ? (
              demos.map((d: any) => (
                <DemoCard key={d.slug} title={d.title} image={d.image} />
              ))
            ) : (
              <p className="col-span-full text-neutral-400">No demos available yet.</p>
            )}
          </div>
        </main>
      </PageLayout>
    </>
  );
}

