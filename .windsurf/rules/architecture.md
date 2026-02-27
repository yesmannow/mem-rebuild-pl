<rule>
  <description>Core Repository Architecture & Data Handling</description>
  <guidelines>
    - This is a Vite + React Single Page Application (SPA), NOT a Next.js app. Do not use next/image, next/link, or Next.js routing.
    - Routing is handled via React Router.
    - NEVER overwrite or mock data in `src/data/resume.json` or any other JSON data files. Always read from them dynamically.
    - Global state and scroll hijacking are managed by `@studio-freight/react-lenis`.
    - Maintain a strict separation of concerns: WebGL/Shaders go in `components/webgl`, Physics goes in `components/physics`, GSAP goes in `components/studio`.
  </guidelines>
</rule>
