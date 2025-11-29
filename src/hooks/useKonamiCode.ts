import { useCallback, useEffect, useRef, useState } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export function useKonamiCode(): boolean {
  const [isGodMode, setIsGodMode] = useState(false);
  const bufferRef = useRef<string[]>([]);

  const handler = useCallback((event: KeyboardEvent) => {
    if (isGodMode) return;

    const target = event.target as HTMLElement;
    if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.getAttribute('contenteditable') === 'true') {
      return;
    }

    bufferRef.current = [...bufferRef.current, event.code].slice(-KONAMI_SEQUENCE.length);

    const matches = bufferRef.current.length === KONAMI_SEQUENCE.length &&
      bufferRef.current.every((code, idx) => code === KONAMI_SEQUENCE[idx]);

    if (matches) {
      setIsGodMode(true);
    }
  }, [isGodMode]);

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);

  return isGodMode;
}
