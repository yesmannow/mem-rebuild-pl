import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center justify-center container-px">
      <div className="max-w-2xl mx-auto text-center">
        <div className="card p-10 md:p-12 space-y-4 text-center">
          <div className="flex justify-center text-5xl" aria-hidden="true">
            🧭
          </div>
          <h1 className="text-6xl md:text-8xl font-display">404</h1>
          <h2 className="text-2xl md:text-3xl font-display">
            Looks like you wandered off the trail.
          </h2>
          <p className="opacity-90 mb-4">
            The path you're following doesn't exist anymore. Let's head back to the work that
            matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-primary">
              Go Home
            </Link>
            <Link to="/case-studies" className="btn-secondary">
              View Work
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
