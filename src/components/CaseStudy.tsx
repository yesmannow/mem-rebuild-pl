import React from "react";

import React from "react";
import { motion } from "framer-motion";
import { trackCaseStudy } from "../utils/analytics";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  summary: string;
  statLabel: string;
  statValue: string;
  image: string;
  tags?: string[];
  slug?: string;
}

export default function CaseStudy({ title, summary, statLabel, statValue, image, tags = [], slug }: Props) {
  const handleClick = () => {
    if (slug) {
      trackCaseStudy(slug);
    }
  };

  const content = (
    <article className="card overflow-hidden transition-transform hover:scale-[1.02]">
      <img src={image} alt={title} className="w-full h-52 object-cover" loading="lazy" />
      <div className="p-6 space-y-3">
        <h3 className="text-xl md:text-2xl font-display">{title}</h3>
        <p className="opacity-90">{summary}</p>
        <div className="flex items-center gap-2">
          <span className="chip">{statLabel}</span>
          <span className="text-sm font-medium">{statValue}</span>
        </div>
        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap pt-2">
            {tags.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
        )}
      </div>
    </article>
  );

  if (slug) {
    return (
      <Link to={`/case-studies/${slug}`} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return content;
}

