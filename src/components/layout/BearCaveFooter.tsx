import React from "react";

export default function BearCaveFooter() {
  return (
    <footer className="container-px py-12">
      <div className="mx-auto max-w-6xl text-sm opacity-70">
        © {new Date().getFullYear()} Jacob Darling — BearCave Marketing
      </div>
    </footer>
  );
}

