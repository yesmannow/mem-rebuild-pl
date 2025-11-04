import { useState } from "react";
import { converter, formatHex, scale } from "culori";
import { motion, AnimatePresence } from "framer-motion";
import { getContrast } from "wcag-contrast";

type PaletteEditorProps = {
  baseColors: string[]; // hex colors from Moodboard
};

const toOKLCH = converter("oklch");

export default function PaletteEditor({ baseColors }: PaletteEditorProps) {
  const [active, setActive] = useState(0);

  const current = baseColors[active];
  const oklch = toOKLCH(current);

  // Generate a 10-step scale from light → base → dark
  const scaleFn = scale([ { ...oklch, l: 0.95 }, oklch, { ...oklch, l: 0.2 } ]);
  const steps = Array.from({ length: 10 }, (_, i) =>
    formatHex(scaleFn(i / 9))
  );

  return (
    <section className="py-16 bg-slate-50 relative">
      <h2 className="text-3xl font-bold text-center mb-8">Palette Editor</h2>

      {/* Base color selector */}
      <div className="flex justify-center gap-3 mb-8">
        {baseColors.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-10 w-10 rounded-full border-2 ${
              active === i ? "border-blue-600" : "border-transparent"
            }`}
            style={{ backgroundColor: c }}
            aria-label={`Select base color ${c}`}
          />
        ))}
      </div>

      {/* Scale preview */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto grid grid-cols-5 gap-4"
        >
          {steps.map((c, i) => {
            const contrast = getContrast(c, "#ffffff");
            const badge =
              contrast >= 7
                ? "AAA"
                : contrast >= 4.5
                ? "AA"
                : contrast >= 3
                ? "AA Large"
                : "Fail";

            return (
              <div
                key={i}
                className="rounded-lg shadow p-4 flex flex-col items-center"
                style={{ backgroundColor: c }}
              >
                <span className="text-xs font-mono text-white drop-shadow">
                  {c}
                </span>
                <span className="mt-2 px-2 py-1 text-xs rounded bg-black/50 text-white">
                  {badge}
                </span>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}