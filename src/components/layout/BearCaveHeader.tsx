import React from "react";
import { Link } from "react-router-dom";

export default function BearCaveHeader() {
  return (
    <header className="container-px">
      <div className="mx-auto max-w-6xl py-6 flex items-center justify-between">
        <Link to="/" className="font-display text-xl text-[color:theme('colors.cave.white')]">
          BearCave
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#work" className="hover:opacity-75 transition">Work</a>
          <a href="#about" className="hover:opacity-75 transition">About</a>
          <a href="#contact" className="hover:opacity-75 transition">Contact</a>
          <a href="#contact" className="btn-primary">Work With Me</a>
        </nav>
      </div>
    </header>
  );
}

