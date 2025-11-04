import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import ApplicationsPanel from "../../components/ApplicationsPanel";
import Head from "next/head";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function BrandBoardPage() {
  const router = useRouter();
  const { slug } = router.query;
  const { data: tokens } = useSWR(slug ? `/api/save-brand?slug=${slug}` : null, fetcher);

  if (!tokens) return <p className="text-center mt-20">Loading brand board…</p>;

  return (
    <>
      <Head>
        <title>{tokens.name} - Brand Board</title>
        <meta name="description" content={`Explore the brand board for ${tokens.name}.`} />
        <meta property="og:title" content={tokens.name} />
        <meta property="og:description" content={`Explore the brand board for ${tokens.name}.`} />
        <meta property="og:image" content={`/og/${slug}.png`} />
        <meta property="og:url" content={`https://yourdomain.com/brand/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className="py-16 bg-slate-50">
        <h1 className="text-4xl font-bold text-center mb-12">{tokens.name}</h1>
        <ApplicationsPanel tokens={tokens} />
      </main>
    </>
  );
}