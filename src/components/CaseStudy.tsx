import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { trackCaseStudy } from "../utils/analytics";
import "./home/SelectedWorkCard.css";

interface CaseStudyMetric {
  label: string;
  value: string;
}

interface Props {
  title: string;
  summary: string;
  metrics: CaseStudyMetric[];
  image: string;
  tags?: string[];
  slug?: string;
  accent?: string;
}

const hoverVariants = {
  rest: { y: 0, rotateX: 0, boxShadow: "0 10px 40px rgba(15, 23, 42, 0.25)" },
  hover: { y: -12, rotateX: 3 }
};

export default function CaseStudy({ title, summary, metrics, image, tags = [], slug, accent }: Props) {
  const content = (
    <motion.article
      className="selected-work-card"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={hoverVariants}
    >
      <div className="selected-work-card__media" style={{ borderColor: accent }}>
        <img src={image} alt={title} loading="lazy" />
        <div className="selected-work-card__glow" style={{ background: accent }} />
      </div>
      <div className="selected-work-card__body">
        <div className="selected-work-card__header">
          <h3>{title}</h3>
          <p>{summary}</p>
        </div>
        <div className="selected-work-card__metrics">
          {metrics.map(metric => (
            <div key={`${title}-${metric.label}`} className="selected-work-card__metric">
              <span className="metric-value">{metric.value}</span>
              <span className="metric-label">{metric.label}</span>
            </div>
          ))}
        </div>
        {tags.length > 0 && (
          <div className="selected-work-card__tags">
            {tags.map(tag => (
              <span key={tag} className="selected-work-card__tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );

  if (!slug) {
    return content;
  }

  return (
    <Link
      to={`/case-studies/${slug}`}
      className="selected-work-card__link"
      onClick={() => trackCaseStudy(slug)}
      aria-label={`Read the ${title} case study`}
    >
      {content}
    </Link>
  );
}

