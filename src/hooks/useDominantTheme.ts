import { useEffect, useState } from "react";

// Type for image manifest entries
interface ImageManifestEntry {
  color?: string;
  blurDataURL?: string;
  width?: number;
  height?: number;
}

type ImageManifest = Record<string, ImageManifestEntry>;

export function useDominantTheme(file?: string) {
  const [manifest, setManifest] = useState<ImageManifest>({});

  // Load manifest on mount
  useEffect(() => {
    import("@data/images.manifest.json")
      .then((mod) => {
        setManifest((mod.default || mod) as ImageManifest);
      })
      .catch(() => {
        // Manifest doesn't exist during initial dev, use empty object
        setManifest({});
      });
  }, []);

  useEffect(() => {
    if (!file) return;

    const entry = manifest[file];
    if (!entry?.color) return;

    const prev = document.documentElement.style.getPropertyValue("--case-glow");
    document.documentElement.style.setProperty("--case-glow", entry.color);

    return () => {
      document.documentElement.style.setProperty("--case-glow", prev || "");
    };
  }, [file, manifest]);
}


