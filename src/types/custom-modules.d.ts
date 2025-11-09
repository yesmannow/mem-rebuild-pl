declare module "gsap" {
  const gsap: any;
  export { gsap };
  export default gsap;
}

declare module "gsap/ScrollTrigger" {
  const ScrollTrigger: any;
  export { ScrollTrigger };
  export default ScrollTrigger;
}

declare module "lucide-react";

declare module "@react-pdf/renderer";

declare module "node-vibrant" {
  export interface Swatch {
    getHex(): string;
    getRgb(): [number, number, number];
    getHsl(): [number, number, number];
    getPopulation(): number;
  }

  export interface Palette {
    Vibrant?: Swatch;
    Muted?: Swatch;
    DarkVibrant?: Swatch;
    DarkMuted?: Swatch;
    LightVibrant?: Swatch;
    LightMuted?: Swatch;
  }

  export interface VibrantStatic {
    from(src: string | HTMLImageElement): {
      getPalette(): Promise<Palette>;
      getSwatches(): Promise<Palette>;
    };
  }

  const Vibrant: VibrantStatic;
  export default Vibrant;
}