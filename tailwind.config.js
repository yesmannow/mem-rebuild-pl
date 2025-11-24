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
			// Ocean Pearl Delight Palette
			'ocean': {
				'stormy-teal': '#006d77',
				'pearl-aqua': '#83c5be',
				'alice-blue': '#edf6f9',
				'almond-silk': '#ffddd2',
				'tangerine-dream': '#e29578',
			},
			ink: {
				900: '#006d77', // Stormy Teal
				700: '#005a63', // Darker Stormy Teal
			},
			parchment: {
				50: '#edf6f9', // Alice Blue
			},
			signal: {
				500: '#e29578', // Tangerine Dream
			},
			telemetry: {
				400: '#83c5be', // Pearl Aqua
			},
			brand: {
				bg: '#edf6f9', // Alice Blue
				accent: '#e29578', // Tangerine Dream
				400: '#83c5be', // Pearl Aqua
				500: '#006d77' // Stormy Teal
			},
			neutral: {
				muted: '#94a3b8'
			},
  			cave: {
  				bg: '#0D0D0F',
  				text: '#E6E6E6',
  				white: '#FFFFFF',
  				ember: '#FF7A3D',
  				mist: '#4EC5B8',
  				border: '#1E1E22'
  			},
  			turquoise: '#00B8D9',
  			creamsicle: '#FFB380',
  			'creamsicle-dark': '#E68A48',
  			'light-blue-gray': '#B3CDE0',
  			'montserrat-blue': '#00B8D9',
  			'montserrat-orange': '#FFB380',
  			'montserrat-gray': '#B3CDE0',
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
  				DEFAULT: '#e29578', // Tangerine Dream
  				foreground: '#ffffff', // White text on accent
  				warm: '#ffddd2', // Almond Silk
  				citrus: '#e29578', // Tangerine Dream
  			},
  			ring: 'hsl(var(--ring))',
  			border: 'hsl(var(--border))',
  			primary: {
  				'50': '#edf6f9', // Alice Blue
  				'100': '#d4e8ed', // Lighter Alice Blue
  				'200': '#b8d9e1', // Light teal
  				'300': '#7ab5c2', // Medium teal
  				'400': '#5a7a7d', // Muted teal-gray
  				'500': '#006d77', // Stormy Teal
  				'600': '#005a63', // Darker Stormy Teal
  				'700': '#004d55', // Very dark teal
  				'800': '#003d44', // Darker
  				'900': '#002d33', // Darkest
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f0f9f8', // Very light aqua
  				'100': '#d4e8ed', // Light aqua
  				'200': '#b8d9e1', // Light teal
  				'300': '#9ccad5', // Medium light teal
  				'400': '#7ab5c2', // Medium teal
  				'500': '#83c5be', // Pearl Aqua
  				'600': '#6ba8a1', // Darker Pearl Aqua
  				'700': '#538b84', // Dark aqua
  				'800': '#3b6e67', // Very dark aqua
  				'900': '#23514a', // Darkest aqua
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
  			accent: '0 4px 20px rgba(131, 197, 190, 0.3)', // Pearl Aqua glow
  			cta: '0 8px 25px rgba(226, 149, 120, 0.4)', // Tangerine Dream glow
  			'case-study-glow': '0px 0px 40px var(--case-study-glow)',
  		},
  		backgroundImage: {
  			'case-study-gradient': 'var(--case-study-gradient)',
  			'brand-grad': 'linear-gradient(135deg, rgb(131 197 190 / 0.35), rgb(226 149 120 / 0.35))', // Pearl Aqua to Tangerine Dream
  			'ocean-grad': 'linear-gradient(135deg, #006d77, #83c5be)', // Stormy Teal to Pearl Aqua
  			'pearl-grad': 'linear-gradient(135deg, #edf6f9, #ffddd2)', // Alice Blue to Almond Silk
  		},
		fontFamily: {
			sans: [
				'Montserrat',
				'Space Grotesk',
				'system-ui',
				'sans-serif'
			],
			display: [
				'Montserrat',
				'Fraunces 144',
				'Georgia',
				'serif'
			],
			brand: [
				'Montserrat',
				'Fraunces 144',
				'Georgia',
				'serif'
			],
			montserrat: [
				'Montserrat',
				'system-ui',
				'sans-serif'
			],
			ui: [
				'Space Grotesk',
				'system-ui',
				'sans-serif'
			],
			body: [
				'Space Grotesk',
				'ui-sans-serif',
				'system-ui',
				'sans-serif'
			],
			mono: [
				'IBM Plex Mono',
				'ui-monospace',
				'monospace'
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
		transitionDuration: {
			'200': '200ms',
			'250': '250ms',
		},
		transitionTimingFunction: {
			'ease-in-out-quad': 'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
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
  			'bounce-gentle': 'bounceGentle 2s infinite',
  			fadeIn: 'fadeIn 1s ease-in-out',
  			bounceIn: 'bounceIn 1s ease-in-out',
  			'aurora': 'aurora 60s linear infinite',
  			'first': 'moveVertical 30s ease infinite',
  			'second': 'moveInCircle 20s reverse infinite',
  			'third': 'moveInCircle 40s linear infinite',
  			'fourth': 'moveHorizontal 40s ease infinite',
  			'fifth': 'moveInCircle 20s ease infinite',
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
  			},
  			bounceIn: {
  				'0%, 100%': {
  					transform: 'scale(0.95)'
  				},
  				'50%': {
  					transform: 'scale(1.05)'
  				}
  			},
  			aurora: {
  				from: {
  					backgroundPosition: '50% 50%, 50% 50%'
  				},
  				to: {
  					backgroundPosition: '350% 50%, 350% 50%'
  				}
  			},
  			moveHorizontal: {
  				'0%': {
  					transform: 'translateX(-50%) translateY(-10%)'
  				},
  				'50%': {
  					transform: 'translateX(50%) translateY(10%)'
  				},
  				'100%': {
  					transform: 'translateX(-50%) translateY(-10%)'
  				}
  			},
  			moveInCircle: {
  				'0%': {
  					transform: 'rotate(0deg)'
  				},
  				'50%': {
  					transform: 'rotate(180deg)'
  				},
  				'100%': {
  					transform: 'rotate(360deg)'
  				}
  			},
  			moveVertical: {
  				'0%': {
  					transform: 'translateY(-50%)'
  				},
  				'50%': {
  					transform: 'translateY(50%)'
  				},
  				'100%': {
  					transform: 'translateY(-50%)'
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
