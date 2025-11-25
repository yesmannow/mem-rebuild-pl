import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Metric {
  id: string;
  name: string;
  value: number;
  change: number;
  color: string;
  icon: string;
}

interface TimePeriod {
  label: string;
  days: number;
}

const CampaignPerformanceVisualizer: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>({ label: 'Last 7 Days', days: 7 });
  const [metrics, setMetrics] = useState<Metric[]>([
    { id: 'impressions', name: 'Impressions', value: 125000, change: 12.5, color: '#40E0D0', icon: '👁️' },
    { id: 'clicks', name: 'Clicks', value: 3200, change: 8.3, color: '#FFA500', icon: '🖱️' },
    { id: 'conversions', name: 'Conversions', value: 145, change: 15.2, color: '#00FF88', icon: '✨' },
    { id: 'revenue', name: 'Revenue', value: 28900, change: 22.1, color: '#FF6B9D', icon: '💰' },
    { id: 'ctr', name: 'CTR', value: 2.56, change: -1.2, color: '#9D4EDD', icon: '📊' },
    { id: 'roas', name: 'ROAS', value: 4.2, change: 18.5, color: '#FFBE0B', icon: '🚀' },
  ]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * metric.value * 0.02,
          change: metric.change + (Math.random() - 0.5) * 2,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Particle system for data visualization
  useEffect(() => {
    // Client-side only - canvas requires browser APIs
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions safely
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width || canvas.offsetWidth || 800;
    canvas.height = rect.height || canvas.offsetHeight || 600;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      life: number;
    }> = [];

    const createParticle = (x: number, y: number, color: string) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color,
        life: 1,
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Create particles from metrics
      metrics.forEach((metric, index) => {
        if (Math.random() > 0.95) {
          const x = (canvas.width / metrics.length) * index + (canvas.width / metrics.length) * 0.5;
          const y = canvas.height / 2 + (Math.random() - 0.5) * 100;
          createParticle(x, y, metric.color);
        }
      });

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;

        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [metrics]);

  const timePeriods: TimePeriod[] = [
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'Last 90 Days', days: 90 },
    { label: 'All Time', days: 365 },
  ];

  return (
    <div className="min-h-screen bg-brand-dark py-12 relative overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
        style={{ pointerEvents: 'none' }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Campaign Performance Visualizer</h1>
          <p className="text-brand-muted text-lg">
            3D interactive dashboard with real-time campaign analytics
          </p>
        </motion.div>

        {/* Time Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-8 gap-2"
        >
          {timePeriods.map((period) => (
            <button
              key={period.label}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedPeriod.label === period.label
                  ? 'bg-brand-teal text-brand-dark'
                  : 'bg-brand-surface/50 text-brand-muted hover:text-white'
              }`}
            >
              {period.label}
            </button>
          ))}
        </motion.div>

        {/* Metrics Grid with 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <AnimatePresence>
            {metrics.map((metric, index) => (
              <MetricCard key={metric.id} metric={metric} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* 3D Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-8 border border-brand-teal/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Performance Trends</h2>
          <div className="relative h-64">
            <BarChart3D metrics={metrics} />
          </div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-8 border border-brand-teal/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Conversion Funnel</h2>
          <FunnelVisualization metrics={metrics} />
        </motion.div>
      </div>
    </div>
  );
};

// 3D Metric Card Component
const MetricCard: React.FC<{ metric: Metric; index: number }> = ({ metric, index }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const formatValue = (value: number, id: string) => {
    if (id === 'revenue') return `$${value.toLocaleString()}`;
    if (id === 'ctr' || id === 'roas') return value.toFixed(2);
    return value.toLocaleString();
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="bg-brand-surface/50 backdrop-blur-md rounded-2xl p-6 border border-brand-teal/20 cursor-pointer"
      whileHover={{ scale: 1.05, z: 50 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-3xl mb-2">{metric.icon}</div>
          <h3 className="text-lg font-semibold text-white">{metric.name}</h3>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            metric.change >= 0
              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
              : 'bg-red-500/20 text-red-400 border border-red-500/50'
          }`}
        >
          {metric.change >= 0 ? '+' : ''}
          {metric.change.toFixed(1)}%
        </div>
      </div>
      <motion.div
        className="text-3xl font-bold"
        style={{ color: metric.color }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
      >
        {formatValue(metric.value, metric.id)}
      </motion.div>
      <div className="mt-4 h-2 bg-brand-dark rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: metric.color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, (metric.value / 150000) * 100)}%` }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
        />
      </div>
    </motion.div>
  );
};

// 3D Bar Chart Component
const BarChart3D: React.FC<{ metrics: Metric[] }> = ({ metrics }) => {
  return (
    <div className="flex items-end justify-around h-full gap-4">
      {metrics.map((metric, index) => {
        const height = Math.min(100, (metric.value / 150000) * 100);
        return (
          <motion.div
            key={metric.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${height}%`, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: 'easeOut' }}
            className="flex-1 flex flex-col items-center group"
          >
            <motion.div
              className="w-full rounded-t-lg relative cursor-pointer"
              style={{
                backgroundColor: metric.color,
                boxShadow: `0 0 20px ${metric.color}40`,
              }}
              whileHover={{ scaleY: 1.1, scaleX: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-brand-dark px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                  {metric.value.toLocaleString()}
                </div>
              </div>
            </motion.div>
            <div className="mt-2 text-xs text-brand-muted text-center">{metric.name}</div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Funnel Visualization Component
const FunnelVisualization: React.FC<{ metrics: Metric[] }> = ({ metrics }) => {
  const funnelStages = [
    { name: 'Impressions', value: metrics.find((m) => m.id === 'impressions')?.value || 0, color: '#40E0D0' },
    { name: 'Clicks', value: metrics.find((m) => m.id === 'clicks')?.value || 0, color: '#FFA500' },
    { name: 'Conversions', value: metrics.find((m) => m.id === 'conversions')?.value || 0, color: '#00FF88' },
  ];

  const maxValue = Math.max(...funnelStages.map((s) => s.value));

  return (
    <div className="flex flex-col items-center gap-4">
      {funnelStages.map((stage, index) => {
        const width = (stage.value / maxValue) * 100;
        const conversionRate =
          index > 0
            ? ((stage.value / funnelStages[index - 1].value) * 100).toFixed(1)
            : '100.0';

        return (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="w-full"
          >
            <div className="flex items-center gap-4 mb-2">
              <span className="text-white font-semibold w-32">{stage.name}</span>
              <div className="flex-1 relative">
                <motion.div
                  className="h-12 rounded-lg relative overflow-hidden"
                  style={{ backgroundColor: stage.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </motion.div>
              </div>
              <div className="text-right">
                <div className="text-white font-bold">{stage.value.toLocaleString()}</div>
                {index > 0 && (
                  <div className="text-xs text-brand-muted">{conversionRate}% conversion</div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CampaignPerformanceVisualizer;

