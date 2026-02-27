import { useCallback } from 'react';
import { useSystemStore } from '../store/useSystemStore';

export function useTerminalFocus(message: string) {
  const pushHistory = useSystemStore((state) => state.pushHistory);

  const onFocus = useCallback(() => {
    pushHistory(`> ${message}`);
  }, [message, pushHistory]);

  return { onMouseEnter: onFocus };
}
