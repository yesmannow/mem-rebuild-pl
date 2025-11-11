import { useEffect } from "react";
// @ts-ignore - manifest may not exist during dev
import manifest from "@data/images.manifest.json";

export function useDominantTheme(file?: string) {
  useEffect(() => {
    if (!file) return;

    const m: any = (manifest as any)[file];
    if (!m?.color) return;

    const prev = document.documentElement.style.getPropertyValue("--case-glow");
    document.documentElement.style.setProperty("--case-glow", m.color);

    return () => {
      document.documentElement.style.setProperty("--case-glow", prev || "");
    };
  }, [file]);
}

