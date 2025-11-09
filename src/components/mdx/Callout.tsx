import React from 'react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success';
  children: React.ReactNode;
}

export default function Callout({ type = 'info', children }: CalloutProps) {
  const styles = {
    info: "border-[color:theme('colors.cave.mist')] bg-[color:theme('colors.cave.mist')]/10",
    warning: "border-[color:theme('colors.cave.ember')] bg-[color:theme('colors.cave.ember')]/10",
    success: 'border-green-500 bg-green-500/10',
  };

  return <div className={`card border-l-4 ${styles[type]} p-6 my-6`}>{children}</div>;
}
