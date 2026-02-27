/**
 * Studio Data - Single Source of Truth
 *
 * This file centralizes all studio content (photography and design assets)
 * to eliminate duplicates and provide consistent metadata for the Visual Engineering gallery.
 */

export interface StudioItem {
  id: string;
  src: string;
  type: 'photography' | 'design';
  title: string;
  meta: string; // Technical metadata - Hex codes for design, descriptive for photography
  category?: string;
  width?: number;
  height?: number;
  imageQuery?: string;
}

// Photography items — full local avif catalog
export const photographyItems: StudioItem[] = [
  {
    id: 'photo-001',
    src: '/images/photography/20240628_185356.avif',
    type: 'photography',
    title: 'Sunset Glow',
    meta: 'Golden Hour • Warm Tones',
    category: 'landscape',
  },
  {
    id: 'photo-002',
    src: '/images/photography/20240704_175213.avif',
    type: 'photography',
    title: 'Independence Day Light',
    meta: 'Natural Light • Wide Angle',
    category: 'event',
  },
  {
    id: 'photo-003',
    src: '/images/photography/20240628_214922.avif',
    type: 'photography',
    title: 'Urban Night Scene',
    meta: 'Low Light • City Vibes',
    category: 'urban',
  },
  {
    id: 'photo-004',
    src: '/images/photography/20240713_065705.avif',
    type: 'photography',
    title: 'Morning Mist',
    meta: 'Dawn Capture • Atmospheric',
    category: 'landscape',
  },
  {
    id: 'photo-005',
    src: '/images/photography/20240803_184432.avif',
    type: 'photography',
    title: 'Summer Evening',
    meta: 'Warm Tones • Ambient',
    category: 'lifestyle',
  },
  {
    id: 'photo-006',
    src: '/images/photography/20240629_214210.avif',
    type: 'photography',
    title: 'Dusk Silhouette',
    meta: 'Backlit • Dramatic',
    category: 'portrait',
  },
  {
    id: 'photo-007',
    src: '/images/photography/20240712_210010.avif',
    type: 'photography',
    title: 'Night Skyline',
    meta: 'Long Exposure • Urban',
    category: 'urban',
  },
  {
    id: 'photo-008',
    src: '/images/photography/20220722_053113.avif',
    type: 'photography',
    title: 'Early Morning Light',
    meta: 'ISO 400 • f/2.8 • Serene',
    category: 'landscape',
  },
  {
    id: 'photo-009',
    src: '/images/photography/20240704_175539.avif',
    type: 'photography',
    title: 'Fireworks Over Indy',
    meta: 'Long Exposure • Celebration',
    category: 'event',
  },
  {
    id: 'photo-010',
    src: '/images/photography/20231008_175026.avif',
    type: 'photography',
    title: 'Autumn Colors',
    meta: 'Fall Season • Rich Tones',
    category: 'landscape',
  },
  {
    id: 'photo-011',
    src: '/images/photography/20240803_192159.avif',
    type: 'photography',
    title: 'Summer Twilight',
    meta: 'Dusk • Ambient Light',
    category: 'landscape',
  },
  {
    id: 'photo-012',
    src: '/images/photography/20240628_215608-2.avif',
    type: 'photography',
    title: 'Night Crowd',
    meta: 'ISO 800 • Urban Energy',
    category: 'urban',
  },
  {
    id: 'photo-013',
    src: '/images/photography/20240704_180246.avif',
    type: 'photography',
    title: 'Afternoon Haze',
    meta: 'Natural Diffusion • Soft',
    category: 'landscape',
  },
  {
    id: 'photo-014',
    src: '/images/photography/20240629_214911.avif',
    type: 'photography',
    title: 'Late Light',
    meta: 'Golden Ratio • Backlit',
    category: 'portrait',
  },
  {
    id: 'photo-015',
    src: '/images/photography/20240704_175407_07.avif',
    type: 'photography',
    title: 'Street Level',
    meta: 'Documentary • Urban Grid',
    category: 'street',
  },
  {
    id: 'photo-016',
    src: '/images/photography/20240512_1125413.avif',
    type: 'photography',
    title: 'Spring Detail',
    meta: 'Macro • Natural',
    category: 'nature',
  },
];

// Design items — full local avif catalog
export const designItems: StudioItem[] = [
  {
    id: 'design-001',
    src: '/images/design/herbs-rub-logo.avif',
    type: 'design',
    title: "Herb's Rub Brand",
    meta: '#2D5016 • #F4E8C1 • BRANDING',
    category: 'branding',
  },
  {
    id: 'design-002',
    src: '/images/design/taco-ninja-logo.avif',
    type: 'design',
    title: 'Taco Ninja Logo',
    meta: '#FF4500 • #1A1A1A • IDENTITY',
    category: 'branding',
  },
  {
    id: 'design-003',
    src: '/images/design/am-logo.avif',
    type: 'design',
    title: 'AM Monogram',
    meta: '#0066CC • #FFFFFF • MONOGRAM',
    category: 'branding',
  },
  {
    id: 'design-004',
    src: '/images/design/2020-forty-under-40-ad.avif',
    type: 'design',
    title: '40 Under 40 Campaign',
    meta: '#FFD700 • #1E3A5F • PRINT',
    category: 'advertising',
  },
  {
    id: 'design-005',
    src: '/images/design/2021-health-care-ad.avif',
    type: 'design',
    title: 'Healthcare Campaign',
    meta: '#00A86B • #F5F5F5 • ADVERTISING',
    category: 'advertising',
  },
  {
    id: 'design-006',
    src: '/images/design/blue---rbe-indy-500-design.avif',
    type: 'design',
    title: 'Indy 500 Design',
    meta: '#1E90FF • #C41E3A • EVENT',
    category: 'event',
  },
  {
    id: 'design-007',
    src: '/images/design/choppedbrisketsandwich_lg.avif',
    type: 'design',
    title: 'BBQ Menu Design',
    meta: '#8B4513 • #FFF8DC • MENU',
    category: 'food',
  },
  {
    id: 'design-008',
    src: '/images/design/flu-shot-2021.avif',
    type: 'design',
    title: 'Flu Shot Campaign',
    meta: '#4169E1 • #FFFACD • HEALTHCARE',
    category: 'healthcare',
  },
  {
    id: 'design-009',
    src: '/images/design/koozie-design---final.avif',
    type: 'design',
    title: 'Koozie Design',
    meta: '#FF6347 • #2F4F4F • PRODUCT',
    category: 'product',
  },
  {
    id: 'design-010',
    src: '/images/design/dog-summer-sale-1.avif',
    type: 'design',
    title: 'Summer Pet Sale',
    meta: '#FFD700 • #40E0D0 • PROMO',
    category: 'promotional',
  },
  {
    id: 'design-011',
    src: '/images/design/online-doctor-consultation-instagram-post.avif',
    type: 'design',
    title: 'Telehealth Social',
    meta: '#00CED1 • #FFFFFF • SOCIAL',
    category: 'social',
  },
  {
    id: 'design-012',
    src: '/images/design/front-updated.avif',
    type: 'design',
    title: 'Business Card Front',
    meta: '#2C3E50 • #ECF0F1 • PRINT',
    category: 'print',
  },
  {
    id: 'design-013',
    src: '/images/design/back-1.avif',
    type: 'design',
    title: 'Business Card Back',
    meta: '#34495E • #BDC3C7 • PRINT',
    category: 'print',
  },
  {
    id: 'design-014',
    src: '/images/design/25-percent-sale---spring.avif',
    type: 'design',
    title: 'Spring Sale Promo',
    meta: '#FF69B4 • #98FB98 • SEASONAL',
    category: 'promotional',
  },
  {
    id: 'design-015',
    src: '/images/design/236802803_10117457411055169_5004587858113382909_n.avif',
    type: 'design',
    title: 'Social Campaign',
    meta: '#3B82F6 • #FAFAFA • DIGITAL',
    category: 'social',
  },
  {
    id: 'design-016',
    src: '/images/design/my-post-2.avif',
    type: 'design',
    title: 'Content Card',
    meta: '#6366F1 • #F8FAFC • EDITORIAL',
    category: 'social',
  },
];

// Combined items for easy access
export const studioItems: StudioItem[] = [...photographyItems, ...designItems];

// Helper function to get items by type
export const getStudioItemsByType = (type: 'photography' | 'design'): StudioItem[] => {
  return type === 'photography' ? photographyItems : designItems;
};

// Fallback placeholder items when no local assets are available
export const fallbackPhotographyItems: StudioItem[] = [
  {
    id: 'fallback-photo-1',
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    type: 'photography',
    title: 'Abstract Tech Patterns',
    meta: 'Creative Direction • Tech',
    category: 'abstract',
  },
  {
    id: 'fallback-photo-2',
    src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    type: 'photography',
    title: 'Retro Tech Aesthetic',
    meta: 'Vintage • Design',
    category: 'retro',
  },
  {
    id: 'fallback-photo-3',
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    type: 'photography',
    title: 'Tech Circuits',
    meta: 'Macro • Technology',
    category: 'tech',
  },
  {
    id: 'fallback-photo-4',
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    type: 'photography',
    title: 'Digital Matrix',
    meta: 'Data • Visualization',
    category: 'abstract',
  },
  {
    id: 'fallback-photo-5',
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    type: 'photography',
    title: 'Earth From Space',
    meta: 'Global • Perspective',
    category: 'space',
  },
  {
    id: 'fallback-photo-6',
    src: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=800&q=80',
    type: 'photography',
    title: 'Neon Urban',
    meta: 'Night • Urban',
    category: 'urban',
  },
];

export const fallbackDesignItems: StudioItem[] = [
  {
    id: 'fallback-design-1',
    src: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    type: 'design',
    title: 'Brand Identity System',
    meta: '#6366F1 • #F59E0B',
    category: 'branding',
  },
  {
    id: 'fallback-design-2',
    src: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    type: 'design',
    title: 'UI Component Kit',
    meta: '#10B981 • #1F2937',
    category: 'ui',
  },
  {
    id: 'fallback-design-3',
    src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    type: 'design',
    title: 'Marketing Collateral',
    meta: '#EF4444 • #FAFAFA',
    category: 'marketing',
  },
  {
    id: 'fallback-design-4',
    src: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    type: 'design',
    title: 'App Interface',
    meta: '#8B5CF6 • #F3F4F6',
    category: 'app',
  },
  {
    id: 'fallback-design-5',
    src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80',
    type: 'design',
    title: 'Product Packaging',
    meta: '#F97316 • #0F172A',
    category: 'packaging',
  },
  {
    id: 'fallback-design-6',
    src: 'https://images.unsplash.com/photo-1634942536790-dad7cb70d0a8?w=800&q=80',
    type: 'design',
    title: 'Social Media Kit',
    meta: '#EC4899 • #18181B',
    category: 'social',
  },
];
