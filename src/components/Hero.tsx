import React from "react";

export default function Hero() {
  return (
    <section className="container-px mx-auto max-w-6xl py-16 md:py-28">
      <div className="grid md:grid-cols-2 items-center gap-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs opacity-80">
            <span className="chip">Solo operator</span>
            <span className="chip">16+ years</span>
            <span className="chip">Hands-on</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display">
            I build marketing systems that turn brands into revenue engines.
          </h1>
          <p className="text-base md:text-lg opacity-90">
            Strategy, creative, analytics, and execution unified under one operator. I design and run growth systems
            that create predictable pipeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="#contact" className="btn-primary">Work With Me</a>
            <a href="#work" className="btn-secondary">View Case Studies</a>
          </div>
        </div>
        <div className="relative">
          <div className="card overflow-hidden">
            <video
              className="w-full h-[320px] md:h-[420px] object-cover"
              src="/hero-broll.mp4"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden md:block">
            <div className="chip bg-white/10">No buzzwords. Measurable outcomes.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

