export interface BrandTokens {
  name: string;
  colors: { [key: string]: string };
  fonts: {
    heading: string;
    body: string;
  };
  mark: string | null;
  images?: string[]; // For moodboard persistence
}

export interface BrandBuilderStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
