import React, { useState } from 'react';

const steps = [
  'Moodboard',
  'Palette',
  'Typography',
  'Mark',
  'Applications',
  'Export',
  'Save/Share',
];

// Properly typed props: either fully controlled or fully uncontrolled
type BuilderShellProps =
  | {
      children: React.ReactNode;
      active: number;
      setActive: (value: number) => void;
    }
  | {
      children: React.ReactNode;
      active?: never;
      setActive?: never;
    };

export default function BuilderShell(props: BuilderShellProps) {
  const { children } = props;
  const isControlled = 'active' in props && props.active !== undefined;

  const [internalActive, setInternalActive] = useState(0);
  const [quality, setQuality] = useState<{ [key: number]: boolean }>({});

  const currentActive = isControlled ? props.active! : internalActive;
  const currentSetActive = isControlled ? props.setActive! : setInternalActive;

  const next = () => {
    if (quality[currentActive]) {
      currentSetActive(Math.min(currentActive + 1, steps.length - 1));
    } else {
      alert('Pass the quality gate before proceeding!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress tracker */}
      <div className="flex justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s} className="flex-1 text-center">
            <div
              className={`h-10 w-10 mx-auto rounded-full flex items-center justify-center ${
                i <= currentActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {i + 1}
            </div>
            <p className="text-xs mt-2">{s}</p>
          </div>
        ))}
      </div>

      {/* Active step content */}
      <div>{children}</div>

      {/* Controls */}
      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={() => setQuality({ ...quality, [currentActive]: true })}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Mark Quality Gate Passed
        </button>
        <button onClick={next} className="px-4 py-2 bg-blue-600 text-white rounded">
          Next Step
        </button>
      </div>
    </div>
  );
}
