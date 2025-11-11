import React from 'react';
import { motion } from 'framer-motion';

// Fixed JSX namespace issue and marked props as readonly
type ApplicationsPanelProps = {
  readonly tokens: {
    colors: { [key: string]: string };
    font: { heading: string; body: string };
    mark?: React.ReactElement;
  };
};

export default function ApplicationsPanel({ tokens }: ApplicationsPanelProps) {
  return (
    <section className="py-16 bg-white relative">
      <h2 className="text-3xl font-bold text-center mb-8">Applications</h2>

      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Social Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg shadow overflow-hidden"
        >
          <div
            className="h-32 flex items-center justify-center"
            style={{ backgroundColor: tokens.colors[500] }}
          >
            {tokens.mark || (
              <h1
                className="text-3xl font-bold text-white"
                style={{ fontFamily: tokens.font.heading }}
              >
                BrandName
              </h1>
            )}
          </div>
        </motion.div>

        {/* Website Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-lg shadow p-10 text-center"
          style={{ backgroundColor: tokens.colors[50] }}
        >
          <h2
            className="text-4xl font-bold mb-4"
            style={{ fontFamily: tokens.font.heading, color: tokens.colors[900] }}
          >
            Headline in Action
          </h2>
          <p
            className="text-lg mb-6"
            style={{ fontFamily: tokens.font.body, color: tokens.colors[700] }}
          >
            This is how your chosen type and palette look in a hero section.
          </p>
          <button
            className="px-6 py-3 rounded font-semibold"
            style={{
              backgroundColor: tokens.colors[600],
              color: 'white',
              fontFamily: tokens.font.body,
            }}
          >
            Call to Action
          </button>
        </motion.div>

        {/* UI Components */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-6"
        >
          <button
            className="px-4 py-2 rounded font-medium"
            style={{
              backgroundColor: tokens.colors[500],
              color: 'white',
              fontFamily: tokens.font.body,
            }}
          >
            Primary Button
          </button>
          <button
            className="px-4 py-2 rounded border font-medium"
            style={{
              borderColor: tokens.colors[500],
              color: tokens.colors[500],
              fontFamily: tokens.font.body,
            }}
          >
            Secondary Button
          </button>

          <div className="p-4 rounded" style={{ backgroundColor: tokens.colors[100] }}>
            <p
              className="font-medium"
              style={{ fontFamily: tokens.font.body, color: tokens.colors[900] }}
            >
              Success Alert
            </p>
          </div>
          <div className="p-4 rounded" style={{ backgroundColor: tokens.colors[200] }}>
            <p
              className="font-medium"
              style={{ fontFamily: tokens.font.body, color: tokens.colors[900] }}
            >
              Warning Alert
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
