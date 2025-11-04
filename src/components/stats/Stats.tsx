import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { staggerContainer, staggerItem } from "../../utils/animations";
import "./Stats.css";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const statsData: Stat[] = [
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 70, suffix: "%", label: "Support Ticket Reduction" },
];

const AnimatedCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
};

const Stats: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section 
      className="stats" 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <div className="stats-container">
        {statsData.map((stat, index) => (
          <motion.div 
            key={index} 
            className="stat-item"
            variants={staggerItem}
            whileHover={{
              y: -8,
              boxShadow: "0 12px 32px rgba(136, 171, 242, 0.2)",
              borderColor: "rgba(136, 171, 242, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <strong className="stat-value">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </strong>
            <span className="stat-label">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Stats;