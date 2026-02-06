import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			sage: {
  				'50': '#f6f7f6',
  				'100': '#e3e7e3',
  				'200': '#c7cfc7',
  				'300': '#a3afa3',
  				'400': '#7d8c7d',
  				'500': '#5f6f5f',
  				'600': '#4a574a',
  				'700': '#3d473d',
  				'800': '#333a33',
  				'900': '#2b312b'
  			},
  			sand: {
  				'50': '#faf9f7',
  				'100': '#f5f2ed',
  				'200': '#e8e3d9',
  				'300': '#d9d1c1',
  				'400': '#c8bda8',
  				'500': '#b5a68f',
  				'600': '#9d8b73',
  				'700': '#7d6e5c',
  				'800': '#675b4c',
  				'900': '#564c41'
  			},
  			clay: {
  				'50': '#faf6f5',
  				'100': '#f4ebe8',
  				'200': '#e8d5d0',
  				'300': '#d9b8ad',
  				'400': '#c79685',
  				'500': '#b87968',
  				'600': '#a65e4d',
  				'700': '#8a4d40',
  				'800': '#724138',
  				'900': '#5e3832'
  			},
  			neutral: {
  				'50': '#fafaf9',
  				'100': '#f5f5f4',
  				'200': '#e7e5e4',
  				'300': '#d6d3d1',
  				'400': '#a8a29e',
  				'500': '#78716c',
  				'600': '#57534e',
  				'700': '#44403c',
  				'800': '#292524',
  				'900': '#1c1917'
  			},
  			success: '#4d7c5a',
  			warning: '#d4a574',
  			error: '#c86b5f',
  			info: '#6b8fa3',
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			serif: [
  				'var(--font-cormorant)',
  				'Cormorant Garamond',
  				'serif'
  			],
  			sans: [
  				'var(--font-inter)',
  				'Inter',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			xs: '0.75rem',
  			sm: '0.875rem',
  			base: '1rem',
  			lg: '1.125rem',
  			xl: '1.25rem',
  			'2xl': '1.5rem',
  			'3xl': '1.875rem',
  			'4xl': '2.25rem',
  			'5xl': '3rem',
  			'6xl': '3.75rem',
  			'7xl': '4.5rem'
  		},
  		lineHeight: {
  			tight: '1.2',
  			snug: '1.375',
  			normal: '1.5',
  			relaxed: '1.625',
  			loose: '2'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			soft: '0 2px 8px 0 rgb(95 111 95 / 0.08)'
  		},
  		container: {
  			center: true,
  			padding: '1rem',
  			screens: {
  				sm: '640px',
  				md: '768px',
  				lg: '1024px',
  				xl: '1280px',
  				'2xl': '1400px'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
