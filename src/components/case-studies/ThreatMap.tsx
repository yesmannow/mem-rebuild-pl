import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Threat {
  id: string;
  lat: number;
  lng: number;
  timestamp: number;
  type: 'brute_force' | 'bot_attack' | 'ddos';
}

const ThreatMap: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [blockedCount, setBlockedCount] = useState(85421);

  // Generate random coordinates for threats
  const generateThreat = (): Threat => {
    return {
      id: `threat-${Date.now()}-${Math.random()}`,
      lat: -90 + Math.random() * 180,
      lng: -180 + Math.random() * 360,
      timestamp: Date.now(),
      type: ['brute_force', 'bot_attack', 'ddos'][Math.floor(Math.random() * 3)] as Threat['type'],
    };
  };

  useEffect(() => {
    // Initial threats
    const initialThreats = Array.from({ length: 8 }, () => generateThreat());
    setThreats(initialThreats);

    // Add new threats periodically
    const interval = setInterval(() => {
      const newThreat = generateThreat();
      setThreats(prev => {
        const updated = [newThreat, ...prev].slice(0, 20); // Keep last 20 threats
        return updated;
      });
      setBlockedCount(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Convert lat/lng to SVG coordinates (simple Mercator projection)
  const latToY = (lat: number) => {
    return 90 - ((lat + 90) / 180) * 180;
  };

  const lngToX = (lng: number) => {
    return ((lng + 180) / 360) * 360;
  };

  return (
    <div className="p-8 bg-brand-surface/80 border border-red-500/20 rounded-2xl backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-red-500 mb-2">Threat Map</h3>
        <p className="text-brand-muted text-sm">Real-time blocked attacks</p>
        <div className="mt-2 inline-block px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <span className="text-green-500 font-mono font-bold text-xl">
            Threats Blocked: {blockedCount.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="bg-[#0a0a0a] rounded-xl overflow-hidden p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <svg
          viewBox="0 0 360 180"
          className="w-full h-auto"
          style={{ background: '#0a0a0a' }}
        >
          {/* Simplified world map outline */}
          <g className="continents">
            {/* North America */}
            <path
              d="M 50 40 L 120 40 L 120 80 L 50 80 Z"
              fill="rgba(30, 41, 59, 0.3)"
              stroke="rgba(64, 224, 208, 0.1)"
              strokeWidth="0.5"
            />
            {/* South America */}
            <path
              d="M 80 100 L 100 100 L 100 140 L 80 140 Z"
              fill="rgba(30, 41, 59, 0.3)"
              stroke="rgba(64, 224, 208, 0.1)"
              strokeWidth="0.5"
            />
            {/* Europe */}
            <path
              d="M 150 30 L 180 30 L 180 60 L 150 60 Z"
              fill="rgba(30, 41, 59, 0.3)"
              stroke="rgba(64, 224, 208, 0.1)"
              strokeWidth="0.5"
            />
            {/* Africa */}
            <path
              d="M 160 60 L 200 60 L 200 120 L 160 120 Z"
              fill="rgba(30, 41, 59, 0.3)"
              stroke="rgba(64, 224, 208, 0.1)"
              strokeWidth="0.5"
            />
            {/* Asia */}
            <path
              d="M 200 20 L 280 20 L 280 80 L 200 80 Z"
              fill="rgba(30, 41, 59, 0.3)"
              stroke="rgba(64, 224, 208, 0.1)"
              strokeWidth="0.5"
            />
            {/* Australia */}
            <path
              d="M 250 120 L 270 120 L 270 140 L 250 140 Z"
              fill="rgba(30, 41, 59, 0.3)"
              stroke="rgba(64, 224, 208, 0.1)"
              strokeWidth="0.5"
            />
          </g>

          {/* Threat markers */}
          <AnimatePresence>
            {threats.map(threat => {
              const x = lngToX(threat.lng);
              const y = latToY(threat.lat);
              const age = Date.now() - threat.timestamp;
              const opacity = Math.max(0, 1 - age / 10000); // Fade out over 10 seconds

              if (opacity <= 0) return null;

              return (
                <motion.g
                  key={threat.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Pulsing circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#ef4444"
                    opacity={opacity}
                  >
                    <animate
                      attributeName="r"
                      values="3;8;3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values={`${opacity};${opacity * 0.3};${opacity}`}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Center dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r="1.5"
                    fill="#dc2626"
                    opacity={opacity}
                  />
                  {/* Ripple effect */}
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="0.5"
                    opacity={opacity * 0.5}
                  >
                    <animate
                      attributeName="r"
                      values="8;15;8"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values={`${opacity * 0.5};0;${opacity * 0.5}`}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </motion.g>
              );
            })}
          </AnimatePresence>
        </svg>
      </div>
      <div className="mt-4 flex gap-8 justify-center">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          <span className="text-brand-muted text-sm">Blocked Threats</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-brand-muted text-sm">Protected</span>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;
