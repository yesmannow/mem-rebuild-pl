import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Bot, Palette, Target, Database, Shield } from "lucide-react";
import resumeData from "../../data/resume.json";
import "./InteractiveTimeline.css";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  company: string;
  description: string;
  icon: React.ReactNode;
  achievements: string[];
  technologies?: string[];
}

const getIcon = (role: string): React.ReactNode => {
  const roleLower = role.toLowerCase();
  if (roleLower.includes("marketing") || roleLower.includes("campaign")) {
    return <Target className="w-6 h-6" />;
  } else if (roleLower.includes("automation") || roleLower.includes("ai")) {
    return <Bot className="w-6 h-6" />;
  } else if (roleLower.includes("design") || roleLower.includes("brand")) {
    return <Palette className="w-6 h-6" />;
  } else if (roleLower.includes("growth") || roleLower.includes("lead")) {
    return <TrendingUp className="w-6 h-6" />;
  } else if (roleLower.includes("systems") || roleLower.includes("engineer")) {
    return <Database className="w-6 h-6" />;
  }
  return <Shield className="w-6 h-6" />;
};

const InteractiveTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const timelineItems: TimelineItem[] = resumeData.experience.map((exp, index) => ({
    id: `timeline-${index}`,
    date: exp.dates,
    title: exp.role,
    company: exp.company,
    description: exp.summary,
    icon: getIcon(exp.role),
    achievements: exp.achievements || [],
    technologies: exp.technologies || []
  }));

  return (
    <section ref={sectionRef} className="interactive-timeline">
      <div className="timeline-container">
        <motion.div
          className="timeline-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Career Journey</h2>
          <p>A visual narrative of my growth from marketing intern to systems architect</p>
        </motion.div>

        <div className="timeline-wrapper">
          <div className="timeline-line" />

          {timelineItems.map((item, index) => {
            const itemRef = useRef<HTMLDivElement>(null);
            const itemInView = useInView(itemRef, { once: true, amount: 0.3 });

            return (
              <motion.div
                key={item.id}
                ref={itemRef}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={itemInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="timeline-content">
                  <div className="timeline-icon-wrapper">
                    <motion.div
                      className="timeline-icon"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="timeline-date">{item.date}</div>
                  </div>

                  <motion.div
                    className="timeline-card"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="card-header">
                      <h3>{item.title}</h3>
                      <h4>{item.company}</h4>
                    </div>

                    <p className="card-description">{item.description}</p>

                    {item.achievements.length > 0 && (
                      <div className="card-achievements">
                        <strong>Key Achievements:</strong>
                        <ul>
                          {item.achievements.slice(0, 3).map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="card-technologies">
                        {item.technologies.slice(0, 5).map((tech, idx) => (
                          <span key={idx} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline;

