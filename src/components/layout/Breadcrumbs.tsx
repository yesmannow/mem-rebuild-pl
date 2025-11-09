import React from "react";
import { useLocation, Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import "./Breadcrumbs.css";

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Build breadcrumb items
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Home", path: "/" },
  ];

  // Add intermediate paths
  let currentPath = "";
  pathnames.forEach((name, index) => {
    currentPath += `/${name}`;

    // Format label (capitalize, replace hyphens)
    const label = name
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    breadcrumbs.push({
      label,
      path: currentPath,
    });
  });

  // Don't show breadcrumbs on homepage
  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={crumb.path} className="breadcrumbs-item">
              {isLast ? (
                <span className="breadcrumbs-current" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link to={crumb.path} className="breadcrumbs-link">
                    {index === 0 ? (
                      <Home size={16} className="breadcrumbs-home-icon" />
                    ) : (
                      crumb.label
                    )}
                  </Link>
                  <ChevronRight size={16} className="breadcrumbs-separator" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;

