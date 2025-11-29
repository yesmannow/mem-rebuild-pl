import { motion, useScroll, useTransform } from "framer-motion";

export default function BrandHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -30]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.85]);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <motion.div style={{ y, opacity }} className="mx-auto max-w-5xl text-center">
        <h1 className="mt-6 text-5xl font-bold tracking-tight text-white">
          Strategy. Systems. Shipping.
        </h1>
        <p className="mt-4 text-neutral-300">
          Fractional CMO execution that moves revenue.
        </p>
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-500/10 to-transparent" />
    </section>
  );
}

