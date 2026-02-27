import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: string;
  color: string;
  inView: boolean;
  duration?: number;
}

/**
 * Parses a metric value string and extracts:
 *  - prefix  e.g. "+" or "-"
 *  - number  e.g. 212
 *  - suffix  e.g. "%" or "K+/month" or " hrs/week"
 *  - raw     original string (returned as-is if no number found)
 */
function parseMetric(raw: string): {
  prefix: string;
  number: number | null;
  suffix: string;
} {
  const m = raw.match(/^([+-]?\s*)(\d[\d,.]*)(.*)$/);
  if (!m) return { prefix: '', number: null, suffix: raw };
  const prefix = m[1].trim();
  const num = parseFloat(m[2].replace(/,/g, ''));
  const suffix = m[3].trim();
  return { prefix, number: isNaN(num) ? null : num, suffix };
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const CountUp: React.FC<CountUpProps> = ({
  value,
  color,
  inView,
  duration = 1800,
}) => {
  const { prefix, number, suffix } = parseMetric(value);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const [displayed, setDisplayed] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || number === null) return;

    // Reset
    setDisplayed(0);
    setDone(false);
    startRef.current = null;

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(t);
      setDisplayed(Math.round(eased * number));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayed(number);
        setDone(true);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, number, duration]);

  // Non-numeric values — render as-is
  if (number === null) {
    return (
      <span className="countup" style={{ color }}>
        {value}
      </span>
    );
  }

  // Format: preserve commas if original had them
  const formatted = displayed >= 1000
    ? displayed.toLocaleString()
    : String(displayed);

  return (
    <span
      className={`countup${done ? ' countup--done' : ''}`}
      style={{ color }}
      aria-label={value}
    >
      {prefix && <span className="countup__prefix">{prefix}</span>}
      <span className="countup__number">{formatted}</span>
      {suffix && <span className="countup__suffix">{suffix}</span>}
    </span>
  );
};

export default CountUp;
