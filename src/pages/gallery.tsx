import React from "react";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function GalleryPage() {
  const { data: gallery } = useSWR("/api/gallery-submit", fetcher);

  return (
    <main className="py-16 bg-slate-50">
      <h1 className="text-4xl font-bold text-center mb-12">Recent Brand Boards</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {gallery?.map((entry: any) => (
          <Link
            key={entry.slug}
            href={`/brand/${entry.slug}`}
            className="rounded-lg shadow bg-white overflow-hidden hover:shadow-lg transition"
          >
            <div
              className="h-40"
              style={{ backgroundColor: entry.tokens.colors[500] }}
            />
            <div className="p-4">
              <h2 className="font-bold text-lg">{entry.tokens.name}</h2>
              <p className="text-slate-600 text-sm">Saved {new Date(entry.created).toLocaleDateString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}