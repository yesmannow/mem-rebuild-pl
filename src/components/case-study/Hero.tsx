import React from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, backgroundImage }) => {
  const heroRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (heroRef.current) {
      heroRef.current.style.setProperty('--hero-background-image', `url(${backgroundImage})`);
    }
  }, [backgroundImage]);

  React.useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const section = heroRef.current;
      if (!section) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: false
        }
      });

      timeline
        .fromTo(
          section.querySelector(".hero-title"),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.1 }
        )
        .fromTo(
          section.querySelector(".hero-subtitle"),
          { opacity: 0 },
          { opacity: 1, delay: 0.4 },
          "-=0.5"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-content">
        <motion.h1 className="hero-title">{title}</motion.h1>
        <motion.p className="hero-subtitle">{subtitle}</motion.p>
      </div>
    </section>
  );
};

export default Hero;
