import { motion } from "framer-motion";
import { Share2, Mail, ExternalLink, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import resumeData from "../../data/resume.json";
import LazyPDFDownloadCTA from "./LazyPDFDownloadCTA";
import { trackPortfolioEngagement } from "../../utils/analytics";

export default function CTAButtons() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const { contact } = resumeData;

  const handlePDFGeneration = () => {
    setIsGeneratingPDF(true);
    trackPortfolioEngagement.resumeDownload('pdf');
    setTimeout(() => setIsGeneratingPDF(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Jacob Darling - Resume",
          text: "Check out Jacob Darling's professional resume - Marketing Director & System Architect",
          url: window.location.href
        });
        setShareMessage("Thanks for sharing! Link sent.");
      } catch (error: any) {
        if (error?.name !== "AbortError") {
          setShareMessage("Share failed. Copy the link manually.");
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link copied to clipboard.");
      } catch (error) {
        setShareMessage("Copy failed. Try sharing manually.");
      }
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Jacob Darling - Professional Resume");
    const body = encodeURIComponent(`I'd like to share Jacob Darling's professional resume with you:\n\n${window.location.href}\n\nBest regards`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleContact = () => {
    window.location.href = `mailto:${contact.email}`;
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  useEffect(() => {
    if (!shareMessage) {
      return;
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setShareMessage(null);
      timeoutRef.current = null;
    }, 3000);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [shareMessage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-4 mb-12"
    >
      {/* PDF Download Button */}
      <LazyPDFDownloadCTA
        isGeneratingPDF={isGeneratingPDF}
        handlePDFGeneration={handlePDFGeneration}
        buttonVariants={buttonVariants}
      />

      {/* Share Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleShare}
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <Share2 size={20} />
        <span>Share Resume</span>
      </motion.button>

      {/* Interview Toolkit */}
      <motion.a
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        href="/documents/Jacob-Darling-Interview-Toolkit.pdf"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 px-6 py-3 border-2 border-blue-400 text-blue-300 rounded-full font-semibold hover:bg-blue-400/10 transition-colors duration-300"
      >
        <FileText size={20} />
        <span>Download Interview Toolkit</span>
      </motion.a>

      {/* Email Resume Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleEmail}
        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <Mail size={20} />
        <span>Email Resume</span>
      </motion.button>

      {/* Contact Me Button */}
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        onClick={handleContact}
        className="flex items-center gap-3 px-6 py-3 border-2 border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400/10 transition-colors duration-300"
      >
        <ExternalLink size={20} />
        <span>Contact Me</span>
      </motion.button>

      {shareMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm rounded-full backdrop-blur-sm"
        >
          {shareMessage}
        </motion.div>
      )}
    </motion.div>
  );
}
