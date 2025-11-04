import React from "react";
import { motion } from "framer-motion";
import { motion as motionTokens } from "../../styles/motion-tokens.js";
import { Link } from "react-router-dom";
import "./Contact.css";

const Contact: React.FC = () => {
  return (
    <motion.section
      className="contact-section"
      {...motionTokens.fadeInFast}
    >
      <h2>Let's Build Something Extraordinary.</h2>
      <Link to="/contact" className="btn-primary contact-cta-btn">Contact Me</Link>
    </motion.section>
  );
};

export default Contact;
