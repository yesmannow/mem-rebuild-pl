import React from 'react';

interface ZigzagDividerProps {
  color?: string;
  className?: string;
  peaks?: number;
}

/**
 * ZigzagDivider - Sharp zigzag pattern
 * 
 * Usage:
 * <ZigzagDivider color="#0f172a" peaks={24} />
 */
export const ZigzagDivider: React.FC<ZigzagDividerProps> = ({
  color = '#0f172a',
  className = '',
  peaks = 24,
}) => {
  // Generate zigzag path
  const generatePath = () => {
    const width = 1440;
    const peakWidth = width / peaks;
    const height = 30;
    
    let path = `M0,${height} `;
    
    for (let i = 0; i < peaks; i++) {
      const x1 = i * peakWidth + peakWidth / 2;
      const x2 = (i + 1) * peakWidth;
      path += `L${x1},0 L${x2},${height} `;
    }
    
    path += `L${width},60 L0,60 Z`;
    return path;
  };

  return (
    <div className={`w-full ${className}`}>
      <svg viewBox="0 0 1440 60" className="w-full h-auto">
        <path fill={color} d={generatePath()} />
      </svg>
    </div>
  );
};

export default ZigzagDivider;
