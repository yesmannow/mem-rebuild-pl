import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import "./PageLayout.css";

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  className?: string;
}

/**
 * PageLayout Component
 * Wraps page content with breadcrumbs and consistent layout
 */
const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showBreadcrumbs = true,
  className = "",
}) => {
  const location = useLocation();
  
  // Don't show breadcrumbs on homepage
  const shouldShowBreadcrumbs = showBreadcrumbs && location.pathname !== "/";

  return (
    <div className={`page-layout ${className}`}>
      {shouldShowBreadcrumbs && (
        <div className="page-layout__breadcrumbs">
          <Breadcrumbs />
        </div>
      )}
      <div className="page-layout__content">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;

