export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  quote: string;
  date: string;
  relationship?: string;
  avatar?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "kevin-martin-see",
    name: "Kevin Martin See",
    role: "IBMer | Connector | Ally",
    company: "IBM",
    quote: "Jacob is an involved and dedicated marketer. His exuberance, and moxie are unparalleled. He excels in managing multiple projects concurrently with strong detail, problem solving, and follow-through. Jacob displays a combination of creative and analytical skills, with proven ability to assess and implement marketing strategies that produce a positive return on investment.",
    date: "October 2014",
    relationship: "Studied together",
    featured: true
  },
  {
    id: "ben-worrell",
    name: "Ben Worrell",
    role: "Location Advisory and Site Selection",
    company: "Pike Medical Consultants",
    quote: "Jacob's energy and ingenuity are both extremely valuable assets that we have added to Pike Medical Consultants. He has expanded our vision and implemented many new projects and outreach opportunities through networking and advertising. I look forward to the future of Pike Medical with Jacob on board with us.",
    date: "October 2009",
    relationship: "Worked on the same team",
    featured: true
  },
  {
    id: "clayton-mathews",
    name: "Clayton Mathews",
    role: "Violinist",
    quote: "Jacob is extremely good at working with people and efficient at getting projects organized and completed. Also important to any job environment is that he is loyal to those he surrounds himself with. I have known and worked with Jacob for a long time and full-heartedly recommend him for the position of Marketing Director at Pike Medical Consultants.",
    date: "February 2013",
    relationship: "Worked on the same team"
  },
  {
    id: "kara-lynch",
    name: "Kara Lynch",
    role: "Cranial Neurosurgery Central Scheduling",
    company: "Pike Medical Consultants",
    quote: "Jacob has a wonderful eye for marketing! He was consistently finding new ways to get Pike Medical Consultants exposure as well as planning and running events to involve the community. His lighthearted attitude made him approachable to his coworkers.",
    date: "March 2013",
    relationship: "Worked on different teams"
  },
  {
    id: "terrence-black",
    name: "Terrence L. Black",
    role: "Co Owner",
    company: "ResQ Organics",
    quote: "I found Jacob to have great communication skills and creative abilities. He is focused and engaged in the projects he directs and participates in. What stands out the most in working with him is his energy and enthusiasm for what he does. I highly recommend Jacob.",
    date: "April 2013",
    relationship: "Worked on different teams",
    featured: true
  },
  {
    id: "nick-brown",
    name: "Nick Brown",
    role: "Marketing Professional",
    company: "DMA, Inc.",
    quote: "Jacob Darling has done a little PR and marketing for DMA Inc. in the past. He is hardworking, creative and a pleasure to work with. Jacob has skills in web design, branding, and personal communication. I would work with Jacob again and recommend others to do the same.",
    date: "October 2013",
    relationship: "Worked at different companies"
  },
  {
    id: "jared-duymovic",
    name: "Jared Duymovic",
    role: "Live Performing Arts Community Builder",
    quote: "Jacob has always been forthcoming and exceedingly willing to get the job done. I have appreciated his relaxed nature in spite of hectic schedules and his reassuring demeanor when that is needed. Jacob has represented his company (a corporate sponsor of mine) admirably.",
    date: "February 2013",
    relationship: "Worked at different companies"
  },
  {
    id: "jerry-stern",
    name: "Jerry Stern",
    role: "Internet Entrepreneur, Pilot, Home Business Coach",
    quote: "I knew and had dealings with Jacob several years ago. At the time I thought he was a stand up guy. He was very competent and professional and I always knew that if he'd said something, you could count on it.",
    date: "LinkedIn Recommendation",
    relationship: "Professional connection"
  }
];

export const getFeaturedTestimonials = (): Testimonial[] => {
  return testimonials.filter(t => t.featured);
};

export const getTestimonialById = (id: string): Testimonial | undefined => {
  return testimonials.find(t => t.id === id);
};