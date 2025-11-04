export default function WaveDivider({ flip = false }: Readonly<{ flip?: boolean }>) {
  return (
    <div className={`relative w-full overflow-hidden ${flip ? "rotate-180" : ""}`}>
      <svg
        className="w-full h-16 text-slate-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0,192L60,170.7C120,149,240,107,360,122.7C480,139,600,213,720,229.3C840,245,960,203,1080,170.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L0,320Z"
        />
      </svg>
    </div>
  );
}