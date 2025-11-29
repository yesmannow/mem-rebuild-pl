import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

type ArcEntry = {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
};

const arcsData: ArcEntry[] = [
  {
    startLat: 39.7684,
    startLng: -86.1581,
    endLat: 51.5074,
    endLng: -0.1278,
    color: '#40E0D0',
  },
  {
    startLat: 39.7684,
    startLng: -86.1581,
    endLat: 35.6895,
    endLng: 139.6917,
    color: '#FFA500',
  },
  {
    startLat: 39.7684,
    startLng: -86.1581,
    endLat: -33.8688,
    endLng: 151.2093,
    color: '#40E0D0',
  },
];

const LatencyGlobe: React.FC = () => {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.2;
      controls.enableZoom = false;
    }
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#40E0D0]/40 bg-[#0f172a]/70 shadow-[0_0_40px_rgba(64,224,208,0.25)]">
      <div className="p-4 text-xs uppercase tracking-[0.4em] text-[#40E0D0]/80">Latency Globe</div>
      <div className="relative h-[420px] bg-transparent">
        <Globe
          ref={globeRef}
          width={640}
          height={420}
          backgroundColor="rgba(0, 0, 0, 0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          globeTransparent
          showAtmosphere={false}
          arcsData={arcsData}
          arcColor={(d) => d.color}
          arcDashLength={0.4}
          arcDashGap={0.8}
          arcDashAnimateTime={2000}
          arcDashInitialGap={0.4}
          arcStroke={0.9}
          arcAltitudeAutoScale={0.1}
          labelsData={[]}
          arcsTransitionDuration={1000}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/30 to-[#0f172a]/90" />
      </div>
    </div>
  );
};

export default LatencyGlobe;
