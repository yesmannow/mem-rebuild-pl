# Quick Start Guide - Business Development Components

## 🚀 Quick Installation

```bash
# Components are already in the repository
# Just import and use!
```

## 📦 What's Included

Three production-ready law firm components:
1. **RepresentativeMattersGrid** - Showcase client wins
2. **IndustryHubLayout** - Industry-specific pages
3. **DEIStatsSection** - Diversity & culture stats

## 🎯 Quick Examples

### 1. Representative Matters Grid

```tsx
import { RepresentativeMattersGrid } from '@/components/business';

<RepresentativeMattersGrid />
```

**With filters:**
```tsx
<RepresentativeMattersGrid 
  columns={3}
  showFilters={true}
/>
```

### 2. Industry Hub Layout

```tsx
import { IndustryHubLayout } from '@/components/business';

<IndustryHubLayout industrySlug="construction" />
```

**Available industries:**
- `construction`
- `healthcare`
- `insurance`
- `technology`
- `financial-services`
- `manufacturing`

### 3. DEI Stats Section

```tsx
import { DEIStatsSection } from '@/components/business';

<DEIStatsSection />
```

**Filter by category:**
```tsx
<DEIStatsSection 
  categoryFilter="diversity"
  columns={4}
/>
```

**Compact version:**
```tsx
import { DEIStatsCompact } from '@/components/business';

<DEIStatsCompact />
```

## 🎨 Customization

### Change Colors

Components use Tailwind classes:
- `brand-turquoise` - Primary accent
- `brand-creamsicle` - Secondary accent
- `slate-*` - Backgrounds and text

### Modify Data

Edit files in `src/data/`:
- `representativeMatters.ts` - Add/edit matters
- `attorneys.ts` - Add/edit attorneys
- `industries.ts` - Add/edit industries
- `deiStats.ts` - Add/edit statistics
- `newsArticles.ts` - Add/edit news

## 📄 Full Page Example

```tsx
import React from 'react';
import { 
  RepresentativeMattersGrid, 
  DEIStatsSection, 
  IndustryHubLayout 
} from '@/components/business';

const LawFirmPage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Industry Overview */}
      <section className="py-16">
        <IndustryHubLayout industrySlug="construction" />
      </section>

      {/* Representative Matters */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Representative Matters
        </h2>
        <RepresentativeMattersGrid columns={3} />
      </section>

      {/* DEI Statistics */}
      <section className="py-16 px-4 bg-slate-900/50">
        <DEIStatsSection 
          title="Our Commitment to Excellence"
          columns={4}
        />
      </section>
    </div>
  );
};

export default LawFirmPage;
```

## 🔗 See Also

- **Full Documentation**: `BUSINESS_COMPONENTS_README.md`
- **Implementation Details**: `BUSINESS_IMPLEMENTATION_SUMMARY.md`
- **Demo Page**: `src/pages/BusinessDevelopmentDemo.tsx`

## 💡 Tips

1. **Start with the demo page** to see all components in action
2. **Use the data helper functions** to filter and organize content
3. **Customize colors** in `tailwind.config.js` if needed
4. **Test responsiveness** on mobile, tablet, and desktop
5. **Check accessibility** with Lighthouse or axe-core

## 🆘 Need Help?

1. Check `BUSINESS_COMPONENTS_README.md` for detailed docs
2. Review `src/pages/BusinessDevelopmentDemo.tsx` for examples
3. Examine component source code in `src/components/business/`
4. Review data files in `src/data/` for structure examples

---

**Ready to build?** Start with the demo page and customize from there! 🎉
