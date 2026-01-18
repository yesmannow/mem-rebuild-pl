import { useEffect, useState, useCallback } from 'react';

/**
 * Konami Code Hook
 * Detects the classic Konami code sequence: ↑ ↑ ↓ ↓ ← → ← → b a
 * When triggered, activates "God Mode" with debug overlay
 */
export function useKonami(onActivate?: () => void) {
  const [isActive, setIsActive] = useState(false);
  const [, setSequence] = useState<string[]>([]);

  // Konami code sequence
  const KONAMI_CODE = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'KeyB',
    'KeyA'
  ];

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger in input fields
    const target = event.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.getAttribute('contenteditable') === 'true'
    ) {
      return;
    }

    const key = event.code;
    setSequence(prev => {
      const newSequence = [...prev, key];

      // Keep only the last N keys (where N is the length of Konami code)
      const trimmedSequence = newSequence.slice(-KONAMI_CODE.length);

      // Check if sequence matches
      if (trimmedSequence.length === KONAMI_CODE.length) {
        const matches = trimmedSequence.every(
          (k, i) => k === KONAMI_CODE[i]
        );

        if (matches && !isActive) {
          setIsActive(true);
          if (onActivate) {
            onActivate();
          }
          // Reset sequence after activation
          return [];
        }
      }

      return trimmedSequence;
    });
  }, [isActive, onActivate]);

  useEffect(() => {
    if (isActive) return; // Don't listen if already active

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isActive]);

  return { isActive, setIsActive };
}

/**
 * Debug Overlay Component Props
 */
export interface DebugOverlayProps {
  isActive: boolean;
  onClose: () => void;
}

/**
 * Debug Overlay Component
 * Shows real-time FPS, memory usage, and "Hacker Mode" styling
 */
export function DebugOverlay({ isActive, onClose }: DebugOverlayProps) {
  const [fps, setFps] = useState(0);
  const [memory, setMemory] = useState<{
    used: number;
    total: number;
    percentage: number;
  } | null>(null);

  // FPS counter
  useEffect(() => {
    if (!isActive) return;

    let lastTime = performance.now();
    let frameCount = 0;
    const fpsInterval = 1000; // Update every second

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      const elapsed = currentTime - lastTime;

      if (elapsed >= fpsInterval) {
        setFps(Math.round((frameCount * 1000) / elapsed));
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    const rafId = requestAnimationFrame(measureFPS);
    return () => cancelAnimationFrame(rafId);
  }, [isActive]);

  // Memory usage (if available)
  useEffect(() => {
    if (!isActive) return;

    const updateMemory = () => {
      // @ts-ignore: performance.memory is Chrome-specific
      if (performance.memory) {
        // @ts-ignore: Chrome-only memory stats
        const used = performance.memory.usedJSHeapSize;
        // @ts-ignore: Chrome-only memory stats
        const total = performance.memory.totalJSHeapSize;
        // @ts-ignore: Chrome-only memory stats
        const limit = performance.memory.jsHeapSizeLimit;

        setMemory({
          used: Math.round(used / 1024 / 1024), // MB
          total: Math.round(limit / 1024 / 1024), // MB
          percentage: Math.round((used / limit) * 100)
        });
      }
    };

    updateMemory();
    const interval = setInterval(updateMemory, 1000);
    return () => clearInterval(interval);
  }, [isActive]);

  // Add "Hacker Mode" border to body
  useEffect(() => {
    if (isActive) {
      document.body.style.border = '4px solid #00ff00';
      document.body.style.boxSizing = 'border-box';
    } else {
      document.body.style.border = '';
      document.body.style.boxSizing = '';
    }

    return () => {
      document.body.style.border = '';
      document.body.style.boxSizing = '';
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className="fixed top-4 right-4 z-[9999] bg-black/90 backdrop-blur-sm border-2 border-green-500 rounded-lg p-4 font-mono text-green-400 shadow-lg min-w-[200px]"
      style={{
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.5)',
        animation: 'pulse 2s infinite'
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-green-400 font-bold text-sm uppercase tracking-wider">
          🎮 God Mode
        </h3>
        <button
          onClick={onClose}
          className="text-green-400 hover:text-green-300 text-xs"
          aria-label="Close debug overlay"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-green-500">FPS:</span>
          <span className={fps >= 55 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
            {fps}
          </span>
        </div>

        {memory && (
          <>
            <div className="flex justify-between">
              <span className="text-green-500">Memory:</span>
              <span className={memory.percentage < 70 ? 'text-green-400' : memory.percentage < 90 ? 'text-yellow-400' : 'text-red-400'}>
                {memory.used}MB / {memory.total}MB
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-green-500">Usage:</span>
              <span className={memory.percentage < 70 ? 'text-green-400' : memory.percentage < 90 ? 'text-yellow-400' : 'text-red-400'}>
                {memory.percentage}%
              </span>
            </div>
          </>
        )}

        <div className="mt-3 pt-3 border-t border-green-500/30">
          <div className="text-green-500 text-[10px]">
            Konami Code Activated
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

