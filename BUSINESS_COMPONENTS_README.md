# Business Development Components

Three high-value law firm components based on competitor research (Barnes & Thornburg, Lewis Wagner, Due Doyle Fanning & Alderfer) and 2025 corporate legal trends.

## Components Overview

### 1. RepresentativeMattersGrid

A masonry grid component displaying representative legal matters with category filters. Demonstrates "proof" through wins for Fortune 100 corporate clients.

**Features:**
- Masonry grid layout for visual interest
- Category filters (All, Construction, Litigation, Corporate, etc.)
- Framer Motion entrance and hover animations
- Responsive design (mobile-first)
- Accessible (WCAG AA compliant)
- Expandable matter descriptions

**Usage:**

```tsx
import { RepresentativeMattersGrid } from '../components/business';

// Basic usage - displays all matters with filters
<RepresentativeMattersGrid />

// Custom configuration
<RepresentativeMattersGrid 
  matters={customMatters}    // Optional: provide custom matters array
  showFilters={true}         // Show/hide category filters
  columns={3}                // Number of columns (2, 3, or 4)
  className="my-custom-class"
/>
```

**Data Structure:**

```typescript
interface RepresentativeMatter {
  id: string;
  title: string;
  result: string;
  industry: string;
  category: string;
  description: string;
  client?: string;
  year?: number;
  tags?: string[];
}
```

### 2. IndustryHubLayout

Specialized page layout for industry-specific "microsites". Dynamically pulls industry description, related attorneys, news, and key contacts.

**Features:**
- Dynamic industry content loading
- Related attorneys filtered by industry
- Related news/blog posts filtered by industry
- Key contact card for industry partner
- Responsive sections with visual hierarchy
- Framer Motion scroll animations

**Usage:**

```tsx
import { IndustryHubLayout } from '../components/business';

// Pass industry slug to load that industry's content
<IndustryHubLayout industrySlug="construction" />
<IndustryHubLayout industrySlug="healthcare" />
<IndustryHubLayout industrySlug="insurance" />
```

**Available Industries:**
- `construction` - Construction Law
- `healthcare` - Healthcare & Life Sciences
- `insurance` - Insurance Defense
- `technology` - Technology & Innovation
- `financial-services` - Financial Services
- `manufacturing` - Manufacturing

**Data Structure:**

```typescript
interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  keyContact: string;        // Attorney ID
  headline: string;
  expertise: string[];
  relatedPracticeAreas: string[];
}
```

### 3. DEIStatsSection

Visually engaging component using framer-motion counters to display firm statistics. Critical for Fortune 500 RFPs that mandate DEI standards.

**Features:**
- Animated counters using framer-motion
- Stats organized by category (diversity, experience, culture, recognition)
- Scroll-triggered animations (only animate when in viewport)
- Accessible and WCAG compliant
- Responsive grid layout (2-5 columns)
- Compact variant available

**Usage:**

```tsx
import { DEIStatsSection, DEIStatsCompact } from '../components/business';

// Full stats section with all categories
<DEIStatsSection />

// Custom configuration
<DEIStatsSection 
  stats={customStats}           // Optional: provide custom stats array
  title="Our Commitment"        // Custom section title
  subtitle="Building diversity" // Custom subtitle
  categoryFilter="diversity"    // Filter by category: 'diversity' | 'experience' | 'culture' | 'recognition' | 'all'
  columns={4}                   // Number of columns (2-5)
  className="my-custom-class"
/>

// Compact variant for sidebars
<DEIStatsCompact stats={customStats} />
```

**Data Structure:**

```typescript
interface DEIStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;    // e.g., '%', '+', ' Years'
  prefix?: string;    // e.g., '$', '#'
  description: string;
  category: 'diversity' | 'experience' | 'culture' | 'recognition';
  icon?: string;      // Emoji or icon identifier
}
```

## Data Files

All components use centralized data files located in `src/data/`:

### representativeMatters.ts
Contains sample representative matters with helper functions:
- `getCategories()` - Get all unique categories
- `filterByCategory(category)` - Filter matters by category
- `filterByIndustry(industry)` - Filter matters by industry

### attorneys.ts
Contains attorney profiles with helper functions:
- `filterByPracticeArea(area)` - Filter attorneys by practice area
- `filterByIndustry(industry)` - Filter attorneys by industry
- `getPartners()` - Get all partners
- `getAttorneyById(id)` - Get specific attorney

### industries.ts
Contains industry data with helper functions:
- `getIndustryBySlug(slug)` - Get industry by URL slug
- `getIndustryById(id)` - Get industry by ID

### newsArticles.ts
Contains news/blog articles with helper functions:
- `filterByIndustry(industry)` - Filter articles by industry
- `filterByCategory(category)` - Filter articles by category
- `getRecentArticles(count)` - Get N most recent articles
- `getArticlesByAuthor(authorId)` - Get articles by specific author

### deiStats.ts
Contains DEI statistics with helper functions:
- `getStatsByCategory(category)` - Filter stats by category
- `getDiversityStats()` - Get diversity-specific stats
- `getExperienceStats()` - Get experience-specific stats

## Demo Page

A comprehensive demo page is available at `src/pages/BusinessDevelopmentDemo.tsx` that showcases all three components with interactive examples.

**View the demo:**
```tsx
// Add to your router
import BusinessDevelopmentDemo from './pages/BusinessDevelopmentDemo';

<Route path="/business-dev-demo" element={<BusinessDevelopmentDemo />} />
```

## Customization

### Styling

All components use Tailwind CSS with the existing design system:
- Brand colors: `brand-turquoise`, `brand-creamsicle`, `brand-blue-gray`
- Dark mode compatible
- Consistent spacing and typography

### Adding Custom Data

**Add a new representative matter:**

```typescript
// In src/data/representativeMatters.ts
export const representativeMatters: RepresentativeMatter[] = [
  // ... existing matters
  {
    id: 'custom-matter-1',
    title: 'Your Matter Title',
    result: 'Achieved favorable outcome',
    industry: 'Technology',
    category: 'Litigation',
    description: 'Detailed description of the matter...',
    client: 'Confidential Client',
    year: 2024,
    tags: ['IP Litigation', 'Patents'],
  },
];
```

**Add a new attorney:**

```typescript
// In src/data/attorneys.ts
export const attorneys: Attorney[] = [
  // ... existing attorneys
  {
    id: 'attorney-new',
    name: 'Jane Doe',
    title: 'Partner',
    practiceAreas: ['Corporate', 'M&A'],
    industries: ['Technology', 'Healthcare'],
    bio: 'Jane is a partner...',
    email: 'jdoe@lawfirm.com',
    phone: '(555) 123-4567',
    education: ['J.D., Harvard Law School'],
    barAdmissions: ['Indiana', 'New York'],
    isPartner: true,
    yearsOfExperience: 15,
  },
];
```

**Add a new industry:**

```typescript
// In src/data/industries.ts
export const industries: Industry[] = [
  // ... existing industries
  {
    id: 'new-industry',
    name: 'Energy',
    slug: 'energy',
    headline: 'Powering the Future',
    description: 'Our Energy practice...',
    keyContact: 'attorney-1',
    expertise: [
      'Regulatory compliance',
      'Project development',
      // ...
    ],
    relatedPracticeAreas: ['Environmental', 'Regulatory'],
  },
];
```

## Best Practices

1. **Performance**: Components use `framer-motion` with `viewport={{ once: true }}` to animate only on first view
2. **Accessibility**: All interactive elements have proper ARIA labels and keyboard navigation
3. **Responsive**: Mobile-first design with breakpoints at 768px (tablet) and 1024px (desktop)
4. **SEO**: Use proper heading hierarchy (h1 → h2 → h3) and semantic HTML
5. **Data Consistency**: Keep attorney IDs, industry slugs, and categories consistent across data files

## Integration Example

```tsx
// Full law firm industry page
import React from 'react';
import { IndustryHubLayout } from '../components/business';
import { RepresentativeMattersGrid } from '../components/business';
import { DEIStatsSection } from '../components/business';

const ConstructionPage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Industry Hub with attorneys and news */}
      <IndustryHubLayout industrySlug="construction" />
      
      {/* Show construction-specific matters */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Representative Matters
        </h2>
        <RepresentativeMattersGrid 
          matters={filterByCategory('Construction')}
          showFilters={false}
        />
      </section>
      
      {/* Firm stats */}
      <section className="py-16 px-4 bg-slate-900/50">
        <DEIStatsSection categoryFilter="all" />
      </section>
    </div>
  );
};
```

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: iOS 13+
- Chrome Mobile: Latest version

## Dependencies

- `react` ^18.0.0
- `framer-motion` ^11.0.0
- `lucide-react` ^0.index40.0 (for icons)
- `tailwindcss` ^3.0.0
- `react-helmet-async` ^2.0.0 (for SEO)

## License

These components are part of the mem-rebuild-pl portfolio and follow the repository's license.

## Support

For questions or issues:
1. Check the demo page at `/business-dev-demo`
2. Review the data files in `src/data/`
3. Examine component source code in `src/components/business/`
