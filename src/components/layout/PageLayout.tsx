import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumbs.css';
import './PageLayout.css';

interface PageLayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

interface BreadcrumbItem {
  label: string;
  path: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showBreadcrumbs = true,
  containerSize = 'lg',
}) => {
  const location = useLocation();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const containerClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  };

  return (
    <div className="page-layout">
      {showBreadcrumbs && breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className="breadcrumbs-nav mx-auto px-4 py-3 sm:px-6"
        >
          <ol className={`breadcrumbs-list ${containerClasses[containerSize]} mx-auto`}>
            <li className="breadcrumb-item">
              <Link
                to="/"
                className="breadcrumb-link home-link"
                aria-label="Home"
              >
                <Home size={16} aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.path} className="breadcrumb-item">
                <ChevronRight
                  size={14}
                  className="breadcrumb-separator"
                  aria-hidden="true"
                />
                {index === breadcrumbs.length - 1 ? (
                  <span className="breadcrumb-current" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link to={crumb.path} className="breadcrumb-link">
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className={`page-content ${containerClasses[containerSize]} mx-auto px-4 sm:px-6`}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
