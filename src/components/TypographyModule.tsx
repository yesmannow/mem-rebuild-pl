import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createStyleObject } from "@capsizecss/core";
import interMetrics from "@capsizecss/metrics/inter";
import robotoSlabMetrics from "@capsizecss/metrics/robotoSlab";

const fontPairs = [
  {
    id: "inter-roboto",
    heading: { name: "Inter", metrics: interMetrics },
    body: { name: "Roboto Slab", metrics: robotoSlabMetrics }
  },
  {
    id: "inter-inter",
    heading: { name: "Inter", metrics: interMetrics },
    body: { name: "Inter", metrics: interMetrics }
  }
  // Add more curated pairs here
];

export default function TypographyModule() {
  const [active, setActive] = useState(0);
  const pair = fontPairs[active];

  const headingStyle = createStyleObject({
    fontSize: 32,
    leading: 40,
    fontMetrics: pair.heading.metrics
  });

  const bodyStyle = createStyleObject({
    fontSize: 18,
    leading: 28,
    fontMetrics: pair.body.metrics
  });

  return (
    <section className="py-16 bg-white relative">
      <h2 className="text-3xl font-bold text-center mb-8">Typography</h2>

      {/* Pair selector */}
      <div className="flex justify-center gap-3 mb-8">
        {fontPairs.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full border transition ${
              active === i
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {p.heading.name} + {p.body.name}
          </button>
        ))}
      </div>

      {/* Preview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pair.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 style={headingStyle} className="mb-4">
            Heading Preview — {pair.heading.name}
          </h1>
          <p style={bodyStyle} className="text-slate-700">
            Body preview text using {pair.body.name}. The quick brown fox jumps
            over the lazy dog. This shows rhythm, contrast, and readability.
          </p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}