import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SmartGallery } from '../components/SmartGallery';
import { OceanAuroraBackground } from '../components/ui/OceanAuroraBackground';
import { loadDesignAssets } from '../utils/loadDesign';
import type { PhotoItem } from '../utils/loadPhotography';

const Design: React.FC = () => {
  const [assets, setAssets] = useState<PhotoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    loadDesignAssets()
      .then((data) => {
        if (mounted) setAssets(data);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Creative Direction | Visual Design Gallery</title>
        <meta
          name="description"
          content="Identity systems, UI layouts, and vector art — hover to analyze the color DNA behind each piece."
        />
      </Helmet>

      <OceanAuroraBackground>
        <div className="min-h-screen pt-24 pb-12 px-6 bg-brand-dark/60">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-teal mb-3">Visual Engineering</h1>
              <p className="text-brand-muted text-lg max-w-2xl">
                A collection of identity systems, UI layouts, and vector art. Hover to analyze color DNA.
              </p>
            </div>

            {assets.length > 0 ? (
              <SmartGallery items={assets} mode="design" />
            ) : (
              <div className="text-brand-muted animate-pulse">Initializing Design Engine...</div>
            )}
          </div>
        </div>
      </OceanAuroraBackground>
    </>
  );
};

export default Design;
