/**
 * Returns a local video URL for a case study card.
 * Videos are assigned deterministically by slug hash so each card
 * gets a consistent video across renders.
 *
 * Local videos live in public/videos/ — no API key required.
 */

const LOCAL_VIDEOS = [
  '/videos/26492-360248642_medium.mp4',
  '/videos/31426-387059070_medium.mp4',
  '/videos/91564-629213919_medium.mp4',
  '/videos/138556-769988117_medium.mp4',
];

function slugHash(slug: string): number {
  return slug.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
}

/**
 * Picks a local background video for a case study card.
 * Signature kept identical to the old hook so no callers need changing.
 */
export function useCardVideo(
  slug: string,
  _category: string[],
  _tags: string[]
): { videoUrl: string; loading: boolean } {
  const idx = slugHash(slug) % LOCAL_VIDEOS.length;
  return { videoUrl: LOCAL_VIDEOS[idx], loading: false };
}
