<rule>
  <description>WebGL, Physics, and GSAP Animation Standards</description>
  <guidelines>
    - GSAP: Always use the `@gsap/react` hook `useGSAP()` instead of standard `useEffect` for animations to ensure proper cleanup and context scoping.
    - ScrollTrigger: Always use a `useRef` for the `trigger` and scope the `useGSAP` hook to that ref.
    - React Three Fiber (R3F): Due to JSX intrinsic element type conflicts in this setup, always place `// @ts-nocheck` at the top of any file utilizing `@react-three/fiber` or `@react-three/drei`.
    - Matter.js Physics: Always constrain Matter.js worlds to the viewport window and handle resize events to update boundary walls.
    - Mobile Degradation: If building a custom cursor, loupe, or complex hover interaction, wrap it in a `@media (hover: hover) and (pointer: fine)` check to prevent breaking touch devices.
  </guidelines>
</rule>
