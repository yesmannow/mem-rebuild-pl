/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'], // controlled via .dark class on <html>
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // GT Global Theme
        turquoise: "#3CC6C4",
        creamsicle: "#FF9E58",
        "creamsicle-dark": "#E68A48",
        "light-blue-gray": "#F3F6F7",
        // Tailwind default colors (maintained)
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // BearCave brand tokens (maintained for compatibility)
        cave: {
          bg: "#0D0D0F",
          text: "#E6E6E6",
          white: "#FFFFFF",
          ember: "#FF7A3D",
          mist: "#4EC5B8",
          border: "#1E1E22",
        },
        // Theme-aware colors using CSS variables (maintained for compatibility)
        bg: 'var(--bg)',
        card: 'var(--card)',
        text: 'var(--text)',
        mute: 'var(--muted)',
        accent: 'var(--accent)',
        ring: 'var(--ring)',
        border: 'var(--border)',
        // Legacy color support (maintained for compatibility)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
      boxShadow: {
        card: "0 8px 30px rgba(0,0,0,0.35)",
        soft: '0 10px 30px rgba(0,0,0,.06)',
        'soft-dark': '0 10px 30px rgba(0,0,0,.3)',
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
        brand: ["Montserrat", "sans-serif"],
        ui: ["Montserrat", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
        // Legacy fonts (maintained for compatibility)
        "clash": ["var(--font-clash)", 'Clash Display', 'system-ui', 'sans-serif'],
        "inter": ["var(--font-inter)", 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'theme': 'var(--radius)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
