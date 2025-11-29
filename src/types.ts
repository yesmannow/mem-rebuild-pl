export interface SideProject {
  id: string;
  title: string;
  category: string; // "Branding" | "Web" | "Strategy" | "Product"
  tags: string[];
  description: string; // Short summary for card
  image: string;
  year: string;
  challenge: string;
  solution: string;
  impact: string[];
  stack?: string[];
}
