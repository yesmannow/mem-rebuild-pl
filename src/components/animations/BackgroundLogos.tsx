import React from "react";
import { motion } from "framer-motion";
import "./BackgroundLogos.css";

const BackgroundLogos: React.FC = () => {
  // Create multiple logo instances with different positions and animations
  const logos = [
    { id: 1, x: "10%", y: "15%", delay: 0, duration: 50, scale: 0.8 },
    { id: 2, x: "75%", y: "10%", delay: 3, duration: 60, scale: 0.6 },
    { id: 3, x: "20%", y: "70%", delay: 6, duration: 56, scale: 0.7 },
    { id: 4, x: "85%", y: "65%", delay: 9, duration: 64, scale: 0.9 },
    { id: 5, x: "50%", y: "40%", delay: 12, duration: 52, scale: 0.5 },
    { id: 6, x: "15%", y: "90%", delay: 15, duration: 58, scale: 0.65 },
    { id: 7, x: "90%", y: "85%", delay: 18, duration: 54, scale: 0.75 }
  ];

  return (
    <div className="background-logos">
      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          className="bg-logo"
          style={{
            left: logo.x,
            top: logo.y,
            scale: logo.scale
          }}
          initial={{
            opacity: 0,
            rotate: 0,
            y: 0
          }}
          animate={{
            opacity: [0, 0.03, 0.03, 0],
            rotate: [0, 360],
            y: [0, -30, 0]
          }}
          transition={{
            duration: logo.duration,
            delay: logo.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.1, 0.9, 1]
          }}
        >
          <img
            src="/images/design/logo-01.svg"
            alt=""
            className="bg-logo-image"
            draggable="false"
          />
        </motion.div>
      ))}

      {/* Additional floating logos with different movement patterns */}
      <motion.div
        className="bg-logo bg-logo-drift"
        style={{ left: "40%", top: "25%", scale: 0.85 }}
        animate={{
          opacity: [0, 0.025, 0.025, 0],
          x: [-50, 50, -50],
          y: [0, 30, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 70,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <img
          src="/images/design/logo-01.svg"
          alt=""
          className="bg-logo-image"
          draggable="false"
        />
      </motion.div>

      <motion.div
        className="bg-logo bg-logo-drift"
        style={{ left: "65%", top: "50%", scale: 0.7 }}
        animate={{
          opacity: [0, 0.035, 0.035, 0],
          x: [50, -50, 50],
          y: [-30, 30, -30],
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 80,
          repeat: Infinity,
          ease: "linear",
          delay: 5
        }}
      >
        <img
          src="/images/design/logo-01.svg"
          alt=""
          className="bg-logo-image"
          draggable="false"
        />
      </motion.div>
    </div>
  );
};

export default BackgroundLogos;
