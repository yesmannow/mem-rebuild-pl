# 🏗️ Site Structure - BearCave Marketing Portfolio

## 📋 Navigation Structure

### Main Navigation (Header)
```
Home | About | Projects | My Work ▼ | Contact | Work With Me
```

### "My Work" Dropdown Menu
- **Graphic Design** → `/design`
- **Photography** → `/photography`
- **Case Studies** → `/case-studies`
- **Developer Tools** → `/applications`

---

## 🗺️ Complete Page Structure

### 🏠 **Core Pages**

#### `/` - Home
- **File**: `src/pages/index.tsx`
- **Description**: Cinematic homepage with hero, selected work, testimonials
- **Components**: Hero, CaseStudy cards, NewsletterForm, ServicesSection

#### `/about` - About
- **File**: `src/pages/About.tsx`
- **Description**: Personal story, rotating bio gallery, timeline, community work
- **Features**: Rotating portrait gallery, accordion timeline

#### `/contact` - Contact
- **File**: `src/pages/Contact.tsx`
- **Description**: Contact form with scheduling link
- **Features**: Accessible form, scheduling integration

---

### 💼 **Work Portfolio Pages**

#### `/case-studies` - Case Studies Hub
- **File**: `src/pages/CaseStudies.tsx`
- **Description**: Searchable library of case studies
- **Features**: Filter, search, tag system, grid/list views

#### `/case-studies/:slug` - Case Study Detail
- **File**: `src/pages/CaseStudyDetail.tsx`
- **Description**: Individual case study deep dive
- **Dynamic Routes**:
  - `/case-studies/brand-identity-systems`
  - `/case-studies/branding-reel`
  - `/case-studies/cinematic-portfolio`
  - `/case-studies/graston-dashboard`
  - `/case-studies/healthcare-campaign`
  - `/case-studies/promotional-campaigns`

#### `/projects` - Projects
- **File**: `src/pages/Projects.tsx`
- **Description**: Technical and value-driven projects catalog
- **Features**: Project filtering, grid layout

#### `/projects/:slug` - Project Detail
- **File**: `src/pages/ProjectDetail.tsx`
- **Description**: Individual project detail page

#### `/side-projects` - Side Projects
- **File**: `src/pages/SideProjects.tsx`
- **Description**: Side project showcase
- **Features**: Project grid, filtering

#### `/side-projects/:slug` - Side Project Detail
- **File**: `src/pages/side-projects/SideProjectDetail.tsx`
- **Description**: Individual side project detail

---

### 🎨 **Creative Portfolio Pages**

#### `/design` - Graphic Design Portfolio
- **File**: `src/pages/Design.tsx`
- **Description**: Visual design work showcase
- **Features**:
  - Bento grid layout
  - Category filtering (Branding, Digital, Print, Product, Sales, Event, Concept)
  - Lightbox gallery
  - 47+ design images from `/public/images/design/`

#### `/photography` - Photography Gallery
- **File**: `src/pages/Photography.tsx`
- **Description**: Photo gallery showcase
- **Features**:
  - Category filtering
  - Lightbox gallery
  - Keyboard navigation
  - 40+ photos from `/public/images/photography/`

#### `/inspiration` - Inspiration
- **File**: `src/pages/Inspiration.tsx`
- **Description**: Creative influences and design systems
- **Components**:
  - InspirationExplorer
  - InspirationTimeline
  - ProcessLab
  - SpecChips
  - ArtifactExplorer
  - BrandLineageSection
- **Images**: 5 inspiration SVGs from `/public/images/inspirations/`

---

### 🛠️ **Developer Tools Pages**

#### `/applications` - Developer Tools
- **File**: `src/pages/Applications.tsx`
- **Description**: Custom tools and applications showcase
- **Features**:
  - Search functionality
  - Category filtering
  - Sort options (default, name, recent)
  - Grid/list view toggle
  - Live demo links
- **Stats**: Total tools, technologies used

#### `/applications/:id` - Developer Tool Detail
- **File**: `src/pages/ApplicationDetail.tsx`
- **Description**: Individual tool deep dive
- **Features**: Overview, technical details, live demo modal

---

### 🎯 **Utility Pages**

#### `/toolbox` - Toolbox
- **File**: `src/pages/Toolbox.tsx`
- **Description**: Skills, technologies, and frameworks toolkit
- **Features**: Technology showcase, frameworks, templates

#### `/resume` - Resume
- **File**: `src/pages/Resume.tsx`
- **Description**: Professional resume and experience
- **Features**: Interactive resume, PDF download

#### `/testimonials` - Testimonials
- **File**: `src/pages/Testimonials.tsx`
- **Description**: Client testimonials and reviews

---

### 🎨 **Brand Builder Pages**

#### `/brand-builder` - Brand Builder
- **File**: `src/pages/BrandBuilder.tsx`
- **Description**: Interactive brand identity system builder
- **Features**:
  - Color palette builder
  - Typography selection
  - Logo upload
  - Applications preview
  - Export functionality

#### `/brand/:slug` - Brand Board Detail
- **File**: `src/pages/brand/BrandDetail.tsx`
- **Description**: Individual brand board showcase
- **Features**: Brand tokens, color swatches, typography samples

#### `/gallery` - Brand Gallery
- **File**: `src/pages/gallery.tsx`
- **Description**: Curated brand identity systems gallery
- **Features**: Grid/masonry view, search, brand board cards

---

### ❌ **Error Pages**

#### `*` - 404 Not Found
- **File**: `src/pages/NotFound.tsx`
- **Description**: Custom 404 error page

---

## 📁 Image Assets Structure

```
public/images/
├── applications/          # Developer tools images
├── artifacts/             # Artifact explorer images
├── awards/                # Award images
├── auto-generated/        # Auto-generated assets
├── bio/                   # Bio/portrait images (5 images)
├── case-studies/          # Case study cover images
│   ├── brand-identity-systems/
│   ├── branding-reel/
│   ├── cinematic-portfolio/
│   ├── graston-dashboard/
│   └── ...
├── design/                # Design portfolio (47+ images)
├── education/             # Education/Indiana University images
├── inspirations/          # Inspiration SVGs (5 images)
├── logos/                 # Logo collection
├── photography/           # Photography gallery (40+ images)
├── process/               # Process images
├── projects/              # Project images
└── side-projects/         # Side project images
```

---

## 🎯 Page Categories Summary

### **Primary Navigation** (5 pages)
1. Home (`/`)
2. About (`/about`)
3. Projects (`/projects`)
4. My Work (dropdown)
5. Contact (`/contact`)

### **My Work Portfolio** (4 pages)
1. Graphic Design (`/design`)
2. Photography (`/photography`)
3. Case Studies (`/case-studies`)
4. Developer Tools (`/applications`)

### **Detail Pages** (Dynamic routes)
- Case Study Details (`/case-studies/:slug`) - 6+ routes
- Project Details (`/projects/:slug`)
- Side Project Details (`/side-projects/:slug`)
- Developer Tool Details (`/applications/:id`)
- Brand Board Details (`/brand/:slug`)

### **Utility Pages** (4 pages)
1. Toolbox (`/toolbox`)
2. Resume (`/resume`)
3. Testimonials (`/testimonials`)
4. Inspiration (`/inspiration`)

### **Brand Builder** (3 pages)
1. Brand Builder (`/brand-builder`)
2. Brand Gallery (`/gallery`)
3. Brand Detail (`/brand/:slug`)

### **Error Pages** (1 page)
1. 404 Not Found (`*`)

---

## 📊 Total Page Count

- **Static Pages**: 15
- **Dynamic Detail Pages**: 10+ (varies by content)
- **Total Routes**: 25+

---

## 🔗 Route Patterns

### Static Routes
- `/`, `/about`, `/contact`, `/design`, `/photography`, `/inspiration`
- `/case-studies`, `/projects`, `/side-projects`, `/applications`
- `/toolbox`, `/resume`, `/testimonials`, `/gallery`, `/brand-builder`

### Dynamic Routes
- `/case-studies/:slug`
- `/projects/:slug`
- `/side-projects/:slug`
- `/applications/:id`
- `/brand/:slug`

---

## 🎨 Navigation Flow

```
Home
├── About
├── Projects
│   └── Project Detail
├── My Work
│   ├── Graphic Design
│   ├── Photography
│   ├── Case Studies
│   │   └── Case Study Detail
│   └── Developer Tools
│       └── Tool Detail
├── Side Projects
│   └── Side Project Detail
├── Toolbox
├── Resume
├── Testimonials
├── Inspiration
├── Brand Builder
│   ├── Brand Gallery
│   └── Brand Detail
└── Contact
```

---

## 📝 Notes

- All pages use lazy loading for code splitting
- Page transitions via Framer Motion
- SEO metadata configured per route
- Responsive design across all pages
- Image assets organized by category in `/public/images/`

