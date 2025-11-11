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
			brand: {
				bg: '#0f1720',
				accent: '#16a34a',
				400: '#6BE1CE',
				500: '#49C3B2'
			},
			neutral: {
				muted: '#94a3b8'
			},
  			accent: {
  				400: '#F4A264',
  				500: '#F08A45'
  			},
  			cave: {
  				bg: '#0D0D0F',
  				text: '#E6E6E6',
  				white: '#FFFFFF',
  				ember: '#FF7A3D',
  				mist: '#4EC5B8',
  				border: '#1E1E22'
  			},
  			turquoise: '#3CC6C4',
  			creamsicle: '#FF9E58',
  			'creamsicle-dark': '#E68A48',
  			'light-blue-gray': '#F3F6F7',
  			'case-study': {
  				primary: 'var(--case-study-primary)',
  				secondary: 'var(--case-study-secondary)',
  				accent: 'var(--case-study-accent)',
  			},
  			gray: {
  				'50': '#f9fafb',
  				'100': '#f3f4f6',
  				'200': '#e5e7eb',
  				'300': '#d1d5db',
  				'400': '#9ca3af',
  				'500': '#6b7280',
  				'600': '#4b5563',
  				'700': '#374151',
  				'800': '#1f2937',
  				'900': '#111827'
  			},
  			bg: 'var(--bg)',
  			card: '#0b1220',
  			highlight: '#ffdd57',
  			text: 'var(--text)',
  			mute: 'var(--muted)',
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			ring: 'hsl(var(--ring))',
  			border: 'hsl(var(--border))',
  			primary: {
  				'50': '#eff6ff',
  				'100': '#dbeafe',
  				'200': '#bfdbfe',
  				'300': '#93c5fd',
  				'400': '#60a5fa',
  				'500': '#3b82f6',
  				'600': '#2563eb',
  				'700': '#1d4ed8',
  				'800': '#1e40af',
  				'900': '#1e3a8a',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#fdf2f8',
  				'100': '#fce7f3',
  				'200': '#fbcfe8',
  				'300': '#f9a8d4',
  				'400': '#f472b6',
  				'500': '#ec4899',
  				'600': '#db2777',
  				'700': '#be185d',
  				'800': '#9d174d',
  				'900': '#831843',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderColor: {
  			DEFAULT: 'var(--border)'
  		},
  		boxShadow: {
  			card: '0 8px 30px rgba(0,0,0,0.35)',
  			soft: '0 10px 30px rgba(0,0,0,.06)',
  			'soft-dark': '0 10px 30px rgba(0,0,0,.3)',
  			accent: '0 4px 20px rgba(60, 198, 196, 0.3)',
  			cta: '0 8px 25px rgba(255, 158, 88, 0.4)',
  			'case-study-glow': '0px 0px 40px var(--case-study-glow)',
  		},
  		backgroundImage: {
  			'case-study-gradient': 'var(--case-study-gradient)',
  			'brand-grad': 'linear-gradient(135deg, rgb(105 223 206 / 0.35), rgb(242 163 96 / 0.35))'
  		},
		fontFamily: {
			sans: [
				'Montserrat',
				'system-ui',
				'sans-serif'
			],
			display: [
				'Georgia',
				'Merriweather',
				'serif'
			],
			brand: [
				'Montserrat',
				'system-ui',
				'sans-serif'
			],
			ui: [
				'Montserrat',
				'system-ui',
				'sans-serif'
			],
			body: [
				'Inter',
				'ui-sans-serif',
				'system-ui',
				'sans-serif'
			],
  			'clash': [
  				'var(--font-clash)',
  				'Clash Display',
  				'system-ui',
  				'sans-serif'
  			],
  			'inter': [
  				'var(--font-inter)',
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			],
  			base: [
  				'1rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1'
  				}
  			],
  			'7xl': [
  				'4.5rem',
  				{
  					lineHeight: '1'
  				}
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		borderRadius: {
  			theme: 'var(--radius)',
  			xl: '0.75rem',
  			'2xl': '1rem',
  			'3xl': '1.5rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'slide-up': 'slideUp 0.6s ease-out',
  			'scale-in': 'scaleIn 0.4s ease-out',
  			'spin-slow': 'spin 3s linear infinite',
  			'bounce-gentle': 'bounceGentle 2s infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(30px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					transform: 'scale(0.95)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			bounceGentle: {
  				'0%, 20%, 50%, 80%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'40%': {
  					transform: 'translateY(-10px)'
  				},
  				'60%': {
  					transform: 'translateY(-5px)'
  				}
  			}
  		},
  		backdropBlur: {
  			xs: '2px',
  			'3xl': '64px'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
