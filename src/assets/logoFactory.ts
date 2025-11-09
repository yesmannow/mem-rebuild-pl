// logoFactory.ts
export function createSVGLogo({
  initials,
  theme = 'modern',
}: {
  initials: string;
  theme?: 'modern' | 'classic' | 'bold';
}): string {
  const background = theme === 'classic' ? '#ffffff' : '#111827';
  const color = theme === 'classic' ? '#111827' : '#ffffff';

  return `
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${background}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
            font-size="64" fill="${color}" font-family="sans-serif">
        ${initials}
      </text>
    </svg>
  `;
}
