import React from "react";

export interface BadgesProps {
  items: string[];
  className?: string;
}

export function Badges({ items, className = "" }: BadgesProps) {
  return (
    <ul className={`mt-3 flex flex-wrap gap-2 ${className}`}>
      {items.map((t) => (
        <li key={t} className="rounded-lg bg-neutral-900 px-2.5 py-1 text-xs text-neutral-200 ring-1 ring-white/5">
          {t}
        </li>
      ))}
    </ul>
  );
}

export default Badges;

