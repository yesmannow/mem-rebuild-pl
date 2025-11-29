import React from 'react';

interface TwoColumnProps {
  children: React.ReactNode;
}

export default function TwoColumn({ children }: TwoColumnProps) {
  return <div className="grid md:grid-cols-2 gap-8 my-6">{children}</div>;
}
