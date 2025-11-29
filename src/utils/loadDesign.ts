import type { PhotoItem } from './loadPhotography';

/**
 * Aggregate design assets from both `/design` and `/side-projects` manifests.
 */
export const loadDesignAssets = async (): Promise<PhotoItem[]> => {
  const manifestPaths = ['/images/design/manifest.json', '/images/side-projects/manifest.json'];
  let combinedAssets: PhotoItem[] = [];

  for (const path of manifestPaths) {
    try {
      const res = await fetch(path);
      if (!res.ok) continue;

      const files = (await res.json()) as string[];
      if (!Array.isArray(files)) continue;

      const folder = path.replace('/manifest.json', '');

      const assets = files.map((file, i) => ({
        src: `${folder}/${file}`,
        width: 400,
        height: i % 4 === 0 ? 600 : 400,
        alt: file.split('.')[0].replace(/-/g, ' '),
        key: `${folder}-${file}`,
      }));

      combinedAssets = [...combinedAssets, ...assets];
    } catch (e) {
      console.warn(`Failed to load manifest: ${path}`, e);
    }
  }

  return combinedAssets.sort(() => Math.random() - 0.5);
};
