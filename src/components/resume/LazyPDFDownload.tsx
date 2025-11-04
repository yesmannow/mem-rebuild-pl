import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

// Lazy load the PDF component
const ResumePDF = lazy(() => import("../../pdf/ResumePDF").then(module => ({ default: module.ResumePDF })));

interface LazyPDFDownloadProps {
  isGeneratingPDF: boolean;
  setIsGeneratingPDF: (value: boolean) => void;
}

const LazyPDFDownload: React.FC<LazyPDFDownloadProps> = ({ isGeneratingPDF, setIsGeneratingPDF }) => {
  return (
    <Suspense
      fallback={
        <motion.button
          className="btn-primary"
          disabled
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <Download className="w-4 h-4" />
          Loading PDF...
        </motion.button>
      }
    >
      <ResumePDF
        isGeneratingPDF={isGeneratingPDF}
        setIsGeneratingPDF={setIsGeneratingPDF}
      />
    </Suspense>
  );
};

export default LazyPDFDownload;
