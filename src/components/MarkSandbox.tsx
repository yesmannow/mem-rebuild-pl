import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MarkOption = {
  id: string;
  label: string;
  render: () => JSX.Element;
};

export default function MarkSandbox() {
  const [active, setActive] = useState("wordmark");
  const [sketchy, setSketchy] = useState(false);

  const options: MarkOption[] = [
    {
      id: "wordmark",
      label: "Wordmark",
      render: () => (
        <h1
          className="text-4xl font-bold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          BrandName
        </h1>
      )
    },
    {
      id: "circle",
      label: "Circle Mark",
      render: () => (
        <svg width="120" height="120">
          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="black"
            strokeWidth="4"
          />
        </svg>
      )
    },
    {
      id: "triangle",
      label: "Triangle Mark",
      render: () => (
        <svg width="120" height="120">
          <polygon
            points="60,10 110,110 10,110"
            fill="none"
            stroke="black"
            strokeWidth="4"
          />
        </svg>
      )
    },
    {
      id: "square",
      label: "Square Mark",
      render: () => (
        <svg width="120" height="120">
          <rect
            x="20"
            y="20"
            width="80"
            height="80"
            fill="none"
            stroke="black"
            strokeWidth="4"
          />
        </svg>
      )
    }
  ];

  const current = options.find(o => o.id === active)!;

  return (
    <section className="py-16 bg-slate-50 relative">
      <h2 className="text-3xl font-bold text-center mb-8">Mark Sandbox</h2>

      {/* Option selector */}
      <div className="flex justify-center gap-3 mb-6">
        {options.map(o => (
          <button
            key={o.id}
            onClick={() => setActive(o.id)}
            className={`px-4 py-2 rounded-full border transition ${
              active === o.id
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Sketchy toggle */}
      <div className="flex justify-center mb-8">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={sketchy}
            onChange={e => setSketchy(e.target.checked)}
          />
          <span className="text-slate-700">Sketchy style</span>
        </label>
      </div>

      {/* Rendered mark */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + (sketchy ? "-sketch" : "")}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center"
        >
          <div className="p-6 bg-white rounded-lg shadow">
            {sketchy ? (
              <SketchWrapper>{current.render()}</SketchWrapper>
            ) : (
              current.render()
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function SketchWrapper({ children }: { readonly children: JSX.Element }) {
  return (
    <div className="opacity-80">
      {children}
      <p className="text-xs text-slate-500 text-center mt-2">
        (Sketchy variant)
      </p>
    </div>
  );
}