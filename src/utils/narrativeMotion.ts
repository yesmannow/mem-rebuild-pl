// 🎞️ Scroll-triggered animation presets for cinematic résumé
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useNarrativeMotion = (selector: string) => {
  gsap.utils.toArray(selector).forEach((el: any) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 15%",
          scrub: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  });
};