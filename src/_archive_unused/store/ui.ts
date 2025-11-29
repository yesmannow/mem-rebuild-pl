import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark';
  mobileNavOpen: boolean;
  caseStudyFilters: {
    category: string | null;
    search: string;
  };
  applicationFilters: {
    category: string | null;
    search: string;
    sort: 'name' | 'date' | 'category';
  };
  setTheme: (theme: 'light' | 'dark') => void;
  toggleMobileNav: () => void;
  setCaseStudyFilters: (filters: Partial<UIState['caseStudyFilters']>) => void;
  setApplicationFilters: (filters: Partial<UIState['applicationFilters']>) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    set => ({
      theme: 'dark',
      mobileNavOpen: false,
      caseStudyFilters: {
        category: null,
        search: '',
      },
      applicationFilters: {
        category: null,
        search: '',
        sort: 'name',
      },
      setTheme: theme => {
        set({ theme });
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      toggleMobileNav: () => set(state => ({ mobileNavOpen: !state.mobileNavOpen })),
      setCaseStudyFilters: filters =>
        set(state => ({
          caseStudyFilters: { ...state.caseStudyFilters, ...filters },
        })),
      setApplicationFilters: filters =>
        set(state => ({
          applicationFilters: { ...state.applicationFilters, ...filters },
        })),
    }),
    {
      name: 'ui-storage',
      partialize: state => ({ theme: state.theme }), // Only persist theme
    }
  )
);
