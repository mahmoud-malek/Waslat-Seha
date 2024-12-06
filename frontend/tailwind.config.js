/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				purple: {
					6000: '#7e22ce', // Custom purple color
				},
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				'rotate': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				}
			},
			animation: {
				'fade-in': 'fade-in 0.4s ease-out',
				'rotate': 'rotate 3s linear infinite'
			},
			stroke: theme => ({
				current: 'currentColor',
				red: theme('colors.red.500'),
				green: theme('colors.green.500'),
				blue: theme('colors.blue.500'),
			}),
		},
	},
};
