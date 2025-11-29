import React from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: "border-[var(--telemetry-400)] bg-[var(--telemetry-400)]/10",
    warning: "border-[var(--signal-500)] bg-[var(--signal-500)]/10",
    success: 'border-green-500 bg-green-500/10',
  };

  return <div className={`card border-l-4 ${styles[type]} p-6 my-6`}>{children}</div>;
}
