import React, { Component, ErrorInfo, ReactNode, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Download, Sparkles } from "lucide-react";

// Lazy load ResumePDF to avoid duplicate imports and reduce bundle size
const ResumePDF = lazy(() => import("../../pdf/ResumePDF").then(module => ({ default: module.ResumePDF })));

interface LazyPDFDownloadCTAProps {
  isGeneratingPDF: boolean;
  handlePDFGeneration: () => void;
  buttonVariants: any;
}

// Error Boundary for PDF component
class PDFErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("PDF Error Boundary caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// PDF Download Button with dynamic generation
const PDFDownloadButton: React.FC<{
  handlePDFGeneration: () => void;
  buttonVariants: any;
  isGeneratingPDF: boolean;
}> = ({ handlePDFGeneration, buttonVariants, isGeneratingPDF }) => {
  const fallbackButton = (
    <motion.a
      href="/resume/Updated-Jacob-Darling-Resume.pdf"
      download="Jacob-Darling-Resume.pdf"
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
      onClick={handlePDFGeneration}
    >
      <Download size={20} />
      Download PDF
    </motion.a>
  );

  return (
    <PDFErrorBoundary fallback={fallbackButton}>
      <Suspense fallback={
        <motion.button
          variants={buttonVariants}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
          disabled
        >
          <Sparkles size={20} className="animate-spin" />
          Loading PDF Generator...
        </motion.button>
      }>
        <PDFDownloadLink
          document={<ResumePDF />}
          fileName="Jacob-Darling-Resume.pdf"
          className="group"
          onClick={handlePDFGeneration}
        >
          {() => {
            return (
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
                disabled={isGeneratingPDF}
              >
                {isGeneratingPDF ? (
                  <>
                    <Sparkles size={20} className="animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={20} />
                    Download PDF
                  </>
                )}
              </motion.button>
            );
          }}
        </PDFDownloadLink>
      </Suspense>
    </PDFErrorBoundary>
  );
};

const LazyPDFDownloadCTA: React.FC<LazyPDFDownloadCTAProps> = ({
  isGeneratingPDF,
  handlePDFGeneration,
  buttonVariants
}) => {
  return (
    <PDFDownloadButton
      handlePDFGeneration={handlePDFGeneration}
      buttonVariants={buttonVariants}
      isGeneratingPDF={isGeneratingPDF}
    />
  );
};

export default LazyPDFDownloadCTA;
