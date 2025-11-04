import React from "react";

interface CaseStudyLayoutProps {
  children: React.ReactNode;
}

const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({ children }) => {
  return (
    <main
      style={{
        background: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {children}
    </main>
  );
};

export default CaseStudyLayout;
