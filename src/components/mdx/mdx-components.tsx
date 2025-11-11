import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Metric from './Metric';
import Callout from './Callout';
import Gallery from './Gallery';
import TwoColumn from './TwoColumn';

const components = {
  Metric,
  Callout,
  Gallery,
  TwoColumn,
  h1: (props: any) => <h1 className="text-4xl md:text-5xl font-display mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl md:text-4xl font-display mb-4 mt-8" {...props} />,
  h3: (props: any) => <h3 className="text-2xl md:text-3xl font-display mb-3 mt-6" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed opacity-90" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2 opacity-90" {...props} />,
  ol: (props: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 opacity-90" {...props} />
  ),
  li: (props: any) => <li className="ml-4" {...props} />,
  a: (props: any) => (
    <a className="text-[color:theme('colors.cave.ember')] hover:underline" {...props} />
  ),
  img: (props: any) => <img className="rounded-xl my-6 w-full" loading="lazy" {...props} />,
};

export function useMDXComponents() {
  return components;
}

export default function MDXComponents({ children }: { children: React.ReactNode }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
