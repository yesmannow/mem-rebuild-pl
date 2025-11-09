/**
 * Centralized route constants and navigation helpers
 * Prevents route drift and ensures consistency across the app
 */

export const ROUTE_RESUME = '/resume';
export const ROUTE_CONTACT = '/contact';
export const ROUTE_WORK = '/case-studies';
export const ROUTE_ABOUT = '/about';
export const ROUTE_TOOLBOX = '/toolbox';
export const ROUTE_INSPIRATION = '/inspiration';

/**
 * Navigate to resume page using React Router
 * @param navigate - React Router navigate function from useNavigate hook
 */
export const goToResume = (navigate: (path: string) => void) => {
  navigate(ROUTE_RESUME);
};

/**
 * Navigate to contact page using React Router
 * @param navigate - React Router navigate function from useNavigate hook
 */
export const goToContact = (navigate: (path: string) => void) => {
  navigate(ROUTE_CONTACT);
};

