import { create } from 'zustand';

interface SystemState {
  activeModule: string;
  activeModuleId: string;
  terminalHistory: string[];
  isBooting: boolean;
  isCommandPaletteOpen: boolean;
  shakeActive: boolean;
  isProcessing: boolean;
  brandBuildTrigger: number;
  runCommand: (cmd: string) => string | void;
  pushHistory: (line: string) => void;
  setActiveModule: (id: string) => void;
  setBooting: (booting: boolean) => void;
  toggleCommandPalette: () => void;
  setCommandPalette: (open: boolean) => void;
  triggerShake: () => void;
  setProcessing: (processing: boolean) => void;
  triggerBrandBuild: () => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  activeModule: 'hero',
  activeModuleId: 'analytics-hub',
  terminalHistory: ['> SYSTEM READY', '> UPLINK ESTABLISHED'],
  isBooting: true,
  isCommandPaletteOpen: false,
  shakeActive: false,
  isProcessing: false,
  brandBuildTrigger: 0,

  runCommand: (cmd: string) => {
    const trimmed = cmd.trim();
    const parts = trimmed.toLowerCase().split(' ');
    const action = parts[0];
    const target = parts[1];

    if (action === 'mount' && target) {
      set({ activeModule: target, activeModuleId: target });
      set((state) => ({
        terminalHistory: [
          ...state.terminalHistory,
          `> EXEC: ${trimmed.toUpperCase()}`,
          `> MODULE MOUNTED: ${target.toUpperCase()}`,
        ],
      }));
      return;
    }

    if (action === 'generate' && target === 'brand') {
      const brandName = parts.slice(2).join(' ') || 'UNNAMED';
      set((state) => ({
        activeModule: 'brand-builder',
        activeModuleId: 'brand-builder',
        isProcessing: true,
        brandBuildTrigger: state.brandBuildTrigger + 1,
        terminalHistory: [
          ...state.terminalHistory,
          `> EXEC: GENERATE BRAND ${brandName.toUpperCase()}`,
          `> INITIALIZING GENERATIVE ENGINE...`,
          `> TARGET: ${brandName.toUpperCase()}`,
          `> ROUTING TO BRAND BUILDER...`,
          `> GENERATIVE ENGINE: ONLINE`,
        ],
      }));
      setTimeout(() => set({ isProcessing: false }), 2000);
      return;
    }

    if (action === 'status') {
      const response = 'SYSTEMS OPTIMIZED // UPTIME 99.9%';
      set((state) => ({
        terminalHistory: [
          ...state.terminalHistory,
          `> EXEC: ${trimmed.toUpperCase()}`,
          `> ${response}`,
        ],
      }));
      return response;
    }

    set((state) => ({
      terminalHistory: [
        ...state.terminalHistory,
        `> EXEC: ${trimmed.toUpperCase()}`,
        `> UNKNOWN COMMAND. TYPE 'help' FOR AVAILABLE COMMANDS.`,
      ],
    }));
  },

  pushHistory: (line: string) => {
    set((state) => ({
      terminalHistory: [...state.terminalHistory, line],
    }));
  },

  setActiveModule: (id: string) => {
    set({ activeModule: id, activeModuleId: id });
  },

  setBooting: (booting: boolean) => {
    set({ isBooting: booting });
  },

  toggleCommandPalette: () => {
    set((state) => ({ isCommandPaletteOpen: !state.isCommandPaletteOpen }));
  },

  setCommandPalette: (open: boolean) => {
    set({ isCommandPaletteOpen: open });
  },

  triggerShake: () => {
    set({ shakeActive: true });
    setTimeout(() => set({ shakeActive: false }), 600);
  },

  setProcessing: (processing: boolean) => {
    set({ isProcessing: processing });
  },

  triggerBrandBuild: () => {
    set((state) => ({
      brandBuildTrigger: state.brandBuildTrigger + 1,
      activeModule: 'brand-builder',
      terminalHistory: [
        ...state.terminalHistory,
        '> EXEC: GENERATE BRAND',
        '> ROUTING TO BRAND BUILDER...',
        '> GENERATIVE ENGINE: ONLINE',
      ],
    }));
  },
}));
