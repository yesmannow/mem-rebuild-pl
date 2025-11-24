# Animation System Guide
## Jacob Darling Cinematic Portfolio

### 🎬 Animation Philosophy

The portfolio employs a **cinematic motion language** that emphasizes:
- **Depth and dimensionality** through 3D transforms
- **Organic timing** with custom easing functions  
- **Layered storytelling** through staggered animations
- **Performance-first** approach with 60fps targets

## 🎭 Animation Libraries Coordination

### **Framer Motion** - Component Animations
**Use Cases:**
- Page transitions and route changes
- Component entrance/exit animations
- Gesture-based interactions (hover, tap, drag)
- Layout animations and shared element transitions

**Example Implementation:**
```typescript
const pageVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -50, 
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};
```

### **GSAP** - Scroll Animations
**Use Cases:**
- ScrollTrigger-based reveal animations
- Parallax scrolling effects
- Complex timeline sequences
- Performance-critical animations

**Example Implementation:**
```typescript
gsap.fromTo(element, 
  { 
    autoAlpha: 0, 
    y: 80, 
    scale: 0.85,
    rotateX: 25,
    filter: "blur(8px)"
  },
  {
    duration: 1.5,
    autoAlpha: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    ease: "power4.out",
    scrollTrigger: {
      trigger: element,
      start: "top 90%",
      scrub: 0.3
    }
  }
);
```

### **Anime.js** - SVG Animations
**Use Cases:**
- SVG path drawing animations
- Complex morphing sequences
- Precise timing control
- Custom easing functions

**Example Implementation:**
```typescript
anime({
  targets: '.logo-path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1800,
  delay: (el, i) => i * 250
});
```

### **Lenis** - Smooth Scrolling
**Configuration:**
```typescript
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 35,
});
```

## 🎨 Animation Patterns

### **1. Cinematic Entrance**
**Pattern:** Elements enter with depth, blur, and scale
```typescript
const cinematicEntrance = {
  initial: { 
    opacity: 0, 
    y: 80, 
    scale: 0.85,
    rotateX: 25,
    filter: "blur(8px)"
  },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)"
  }
};
```

### **2. Staggered Reveals**
**Pattern:** Sequential animation with calculated delays
```typescript
const staggeredReveal = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
```

### **3. Parallax Depth**
**Pattern:** Multi-layer scrolling with different speeds
```typescript
gsap.to(backgroundLayer, {
  yPercent: -50,
  scrollTrigger: { scrub: 1 }
});

gsap.to(foregroundLayer, {
  yPercent: -20,
  scrollTrigger: { scrub: 1 }
});
```

### **4. Hover Orchestration**
**Pattern:** Coordinated hover effects across elements
```typescript
const hoverEffect = {
  scale: 1.05,
  y: -8,
  rotateY: 3,
  filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.25))",
  transition: { duration: 0.4, ease: "power2.out" }
};
```

## 🎯 Component-Specific Animations

### **AnimatedLogo Component**

**Entrance Sequence:**
1. **Hexagon Frame** (1200ms) - Stroke-dashoffset animation
2. **Letter Paths** (800ms each) - Staggered with 150ms delay
3. **Accent Dot** (400ms) - Scale with bounce easing
4. **Glow Effect** (1000ms) - Filter transition

**Hover Behavior:**
- Scale: 1.05x with spring animation
- Glow: Enhanced drop-shadow
- Dot pulse: Scale 1.3x and back

### **SplashIntro Component**

**Timeline Sequence:**
```typescript
timeline
  .add({
    targets: '.logo-container',
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 600
  })
  .add({
    targets: '.splash-tagline',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800
  }, '-=200')
  .add({
    targets: '.splash-particles',
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 1000
  }, '-=600');
```

### **Photography Gallery**

**Masonry Animation:**
- **Entrance:** 3D rotation with blur-to-focus
- **Scroll Parallax:** Individual image movement
- **Hover:** Scale and glow enhancement
- **Category Filter:** Smooth opacity transitions

**GSAP Implementation:**
```typescript
gsap.fromTo(photoCard,
  { 
    autoAlpha: 0, 
    rotateY: 15,
    rotateX: 10,
    filter: "blur(6px)"
  },
  {
    autoAlpha: 1,
    rotateY: 0,
    rotateX: 0,
    filter: "blur(0px)",
    scrollTrigger: {
      trigger: photoCard,
      start: "top 88%",
      scrub: 0.2
    }
  }
);
```

### **Design Portfolio**

**Bento Grid Animation:**
- **3D Hover Effects:** RotateY and scale transforms
- **Category Transitions:** Color-coded animations
- **Parallax Images:** Background movement on scroll
- **Lightbox Integration:** Scale and blur transitions

## ⚡ Performance Optimization

### **Animation Performance**
```typescript
// Hardware acceleration
.animated-element {
  will-change: transform, opacity, filter;
  transform: translateZ(0);
  backface-visibility: hidden;
}

// Throttled RAF loop
function raf(time: number) {
  const deltaTime = time - lastTime;
  if (deltaTime < 33) { // 30fps minimum
    lenis.raf(time);
    ScrollTrigger.update();
  }
  requestAnimationFrame(raf);
}
```

### **Memory Management**
```typescript
class MotionSync {
  cleanup() {
    this.activeAnimations.clear();
    this.scrollAnimations.forEach(anim => {
      if (!anim.isActive()) {
        this.scrollAnimations.delete(anim);
      }
    });
  }
}
```

### **Reduced Motion Support**
```css
@media (prefers-reduced-motion: reduce) {
  .animated-logo {
    transition: none;
  }
  
  .splash-tagline {
    animation: none;
  }
  
  .particle {
    display: none;
  }
}
```

## 🎪 Advanced Animation Techniques

### **Morphing Gradients**
```css
.splash-tagline {
  background: linear-gradient(135deg, #88ABF2, #a8c5ff, #667eea);
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### **Particle Systems**
```typescript
// Floating particles with random properties
{Array.from({ length: 20 }).map((_, i) => (
  <motion.div
    key={i}
    className="particle"
    animate={{
      opacity: [0, 1, 0],
      scale: [0, Math.random() * 0.5 + 0.5, 0],
      y: [
        Math.random() * window.innerHeight,
        Math.random() * window.innerHeight - 100
      ]
    }}
    transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      delay: Math.random() * 2
    }}
  />
))}
```

### **3D Transform Chains**
```typescript
const hover3D = {
  rotateY: 3,
  rotateX: 2,
  scale: 1.03,
  z: 50,
  boxShadow: "0 25px 50px rgba(0,0,0,0.25)"
};
```

## 🎬 Cinematic Timing

### **Easing Functions**
- **Entrance:** `power4.out` - Strong deceleration
- **Exit:** `power2.in` - Gentle acceleration  
- **Hover:** `power2.out` - Smooth response
- **Scroll:** `none` or `0.3` - Scrubbed to scroll

### **Duration Guidelines**
- **Micro-interactions:** 200-400ms
- **Component transitions:** 400-800ms
- **Page transitions:** 600-1200ms
- **Splash sequences:** 2000-3000ms

### **Stagger Patterns**
- **Text reveals:** 50-100ms per element
- **Image galleries:** 30-80ms per item
- **Navigation items:** 100-150ms per link

---

*This animation system creates a cohesive, performant, and accessible motion language that elevates the Jacob Darling portfolio to cinematic standards.*
