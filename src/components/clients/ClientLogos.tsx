import React from "react";
import { motion } from "framer-motion";
import "./ClientLogos.css";

const clientLogos = [
  { name: "Primary Care", src: "/images/logos/Primary Care Logo with PMC.png" },
  { name: "Black Letter", src: "/images/logos/Black Letter - Full Logo.png" },
  { name: "Perpetual Movement Fitness", src: "/images/logos/Perpetual Movement Fitness - Primary Logo.png" },
  { name: "CA Logo", src: "/images/logos/CA Logo - Primary (full color).png" },
  { name: "Gomez BBQ", src: "/images/logos/Gomez BBQ Logo.png" },
  { name: "Herbs Rub", src: "/images/logos/Herbs Rub Logo.png" },
  { name: "TBM", src: "/images/logos/TBM Logo.png" },
  { name: "BF Monogram", src: "/images/logos/BF MOGOGRAM final-01.png" },
  { name: "Indiana University", src: "/images/logos/Indiana_University_seal.svg.png" },
  { name: "Heart Logo", src: "/images/logos/HEart Logo.png" },
];

const ClientLogos: React.FC = () => {
  return (
    <section className="client-logos-section">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Trusted by Leading Organizations
      </motion.h2>
      <motion.div
        className="logos-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {clientLogos.map((client, index) => (
          <motion.div
            key={client.name}
            className="logo-item"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <img src={client.src} alt={client.name} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ClientLogos;
