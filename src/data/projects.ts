// Example: Populate with value/side projects data
export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: '317-bbq',
    title: '317 BBQ',
    description:
      'A modern restaurant website showcasing authentic BBQ cuisine with online ordering capabilities.',
    longDescription:
      "Designed and developed a full-featured restaurant website for 317 BBQ featuring an intuitive menu system, online ordering integration, and responsive design. The site highlights the restaurant's authentic BBQ offerings with high-quality imagery and streamlined user experience.",
    image: '/images/projects/317 bbq/Screenshot of 317 BBQ _ Really Good BBQ.jpg',
    gallery: [
      '/images/projects/317 bbq/Screenshot of 317 BBQ _ Really Good BBQ.jpg',
      '/images/projects/317 bbq/download.jpg',
      '/images/projects/317 bbq/download (1).jpg',
      '/images/projects/317 bbq/317BBQLogo_wht.webp',
    ],
    tags: ['Web Development', 'Restaurant', 'E-Commerce', 'Responsive Design'],
    link: 'https://317bbq.com',
    featured: true,
  },
  {
    slug: 'russell-painting',
    title: 'Russell Painting Company',
    description:
      'Professional painting and power washing services website with portfolio showcase and quote request system.',
    longDescription:
      'Created a comprehensive website for Russell Painting Company, Inc. featuring their painting and power washing services. The site includes a portfolio gallery, service descriptions, and an integrated quote request system to streamline customer inquiries.',
    image:
      '/images/projects/Russell painting/Screenshot of Power Washing _ Russell Painting Company, Inc.jpg',
    gallery: [
      '/images/projects/Russell painting/Screenshot of Power Washing _ Russell Painting Company, Inc.jpg',
      '/images/projects/Russell painting/New-Logo-Transparent-1.png',
    ],
    tags: ['Web Development', 'Service Business', 'Portfolio', 'Contact Forms'],
    link: 'https://russellpainting.com',
    featured: true,
  },
  {
    slug: 'tuohy-bailey-moore',
    title: 'Tuohy Bailey & Moore LLP',
    description:
      'Professional law firm website highlighting business transactions and commercial law expertise.',
    longDescription:
      "Developed a sophisticated website for Tuohy Bailey & Moore LLP, a business-focused law firm. The site features practice area descriptions, attorney profiles, and a professional design that reflects the firm's expertise in business transactions and commercial law.",
    image:
      '/images/projects/Tuohy Bailey & Moore LLP/Screenshot of Home - Tuohy Bailey & Moore LLP.jpg',
    gallery: [
      '/images/projects/Tuohy Bailey & Moore LLP/Screenshot of Home - Tuohy Bailey & Moore LLP.jpg',
      '/images/projects/Tuohy Bailey & Moore LLP/Screenshot of Business Transactions - Tuohy Bailey & Moore LLP.jpg',
      '/images/projects/Tuohy Bailey & Moore LLP/Screenshot of Commercial Law - Tuohy Bailey & Moore LLP.jpg',
    ],
    tags: ['Web Development', 'Legal Services', 'Professional Services', 'Corporate Design'],
    link: 'https://tuohybaileymoore.com',
    featured: true,
  },
  {
    slug: 'riley-bennett-egloff',
    title: 'Riley Bennett Egloff LLP',
    description:
      'Law firm website showcasing legal expertise with attorney profiles and practice areas.',
    longDescription:
      'Built a comprehensive website for Riley Bennett Egloff LLP featuring detailed attorney profiles, practice area information, and client resources. The design emphasizes professionalism while maintaining accessibility and user-friendly navigation.',
    image: '/images/projects/riley bennett egloff/attorneys.jpg',
    gallery: [
      '/images/projects/riley bennett egloff/attorneys.jpg',
      '/images/projects/riley bennett egloff/download.jpg',
      '/images/projects/riley bennett egloff/dss.jpg',
      '/images/projects/riley bennett egloff/RBE-Logo-with-®-RGB-jpg.jpg',
    ],
    tags: ['Web Development', 'Legal Services', 'Attorney Profiles', 'Professional Design'],
    link: 'https://rbelaw.com',
    featured: false,
  },
];
