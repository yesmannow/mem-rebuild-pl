import type { StudioItem } from '../data/studioData';
import { photographyItems, designItems } from '../data/studioData';

type StudioAssetType = 'photography' | 'design';

const EXTENSION_PRIORITY = ['webp', 'avif', 'png', 'jpg', 'jpeg', 'svg'];

const DEFAULT_META: Record<StudioAssetType, string> = {
  photography: 'Manifest sync • Full gallery ingest',
  design: 'Manifest sync • Creative systems ingest',
};

const DEFAULT_CATEGORY: Record<StudioAssetType, string> = {
  photography: 'gallery',
  design: 'creative',
};

// Helper functions - defined first to avoid hoisting issues
const stripExtension = (value: string): string => value.replace(/\.[^.]+$/, '');

const toBaseKey = (value: string): string => {
  if (!value) return '';
  const filename = value.split('/').pop() ?? value;
  return stripExtension(filename).toLowerCase();
};

const buildCuratedMap = (items: StudioItem[]): Map<string, StudioItem> => {
  return items.reduce((map, item) => {
    const key = toBaseKey(item.src);
    if (key) {
      map.set(key, item);
    }
    return map;
  }, new Map<string, StudioItem>());
};

// Lazy initialization to avoid module-level circular dependency issues
let curatedMapsCache: Record<StudioAssetType, Map<string, StudioItem>> | null = null;

const getCuratedMaps = (): Record<StudioAssetType, Map<string, StudioItem>> => {
  if (!curatedMapsCache) {
    curatedMapsCache = {
      photography: buildCuratedMap(photographyItems),
      design: buildCuratedMap(designItems),
    };
  }
  return curatedMapsCache;
};

const getExtension = (filename: string): string => filename.split('.').pop()?.toLowerCase() ?? '';

const getExtensionPriority = (ext: string): number => {
  const index = EXTENSION_PRIORITY.indexOf(ext);
  return index === -1 ? EXTENSION_PRIORITY.length : index;
};

const dedupeManifestEntries = (files: string[]): string[] => {
  const selection = new Map<string, string>();

  files.forEach((file) => {
    if (typeof file !== 'string') return;

    const base = toBaseKey(file);
    if (!base) return;

    const ext = getExtension(file);
    const priority = getExtensionPriority(ext);

    if (!selection.has(base)) {
      selection.set(base, file);
      return;
    }

    const current = selection.get(base) ?? '';
    const currentPriority = getExtensionPriority(getExtension(current));

    if (priority < currentPriority) {
      selection.set(base, file);
    }
  });

  return Array.from(selection.values());
};

const humanizeTitle = (filename: string, index: number, type: StudioAssetType): string => {
  const base = stripExtension(filename);
  const cleaned = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  const fallback = type === 'photography' ? `Frame ${index + 1}` : `Design ${index + 1}`;

  if (!cleaned) {
    return fallback;
  }

  const hasLetters = /[a-zA-Z]/.test(cleaned);
  if (!hasLetters) {
    return fallback;
  }

  return cleaned
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const getHeightForIndex = (index: number, type: StudioAssetType): number => {
  if (type === 'photography') {
    return index % 3 === 0 ? 560 : 420;
  }
  return index % 4 === 0 ? 540 : 420;
};

const toId = (file: string, fallbackIndex: number, type: StudioAssetType): string => {
  const safe = stripExtension(file)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return safe ? `${type}-${safe}` : `${type}-auto-${fallbackIndex}`;
};

export const manifestToStudioItems = (files: string[] | null | undefined, type: StudioAssetType): StudioItem[] => {
  if (!files?.length) return [];

  const deduped = dedupeManifestEntries(files);
  const basePath = type === 'photography' ? '/images/photography/' : '/images/design/';
  const curatedMaps = getCuratedMaps();
  const curatedMap = curatedMaps[type];

  return deduped.map((file, index) => {
    const base = toBaseKey(file);
    const curated = base ? curatedMap.get(base) : undefined;

    if (curated) {
      return {
        ...curated,
        src: `${basePath}${file}`,
        width: curated.width ?? 400,
        height: curated.height ?? getHeightForIndex(index, type),
      };
    }

    return {
      id: toId(file, index, type),
      src: `${basePath}${file}`,
      type,
      title: humanizeTitle(file, index, type),
      meta: DEFAULT_META[type],
      category: DEFAULT_CATEGORY[type],
      width: 400,
      height: getHeightForIndex(index, type),
    };
  });
};

