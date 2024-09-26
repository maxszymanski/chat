/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				nunito: 'Nunito Sans Variable, sans-serif',
			},
			backgroundImage: {
				'app-gradient': 'linear-gradient(to right, #614385, #516395 )',
			},
		},
	},
	plugins: [],
}
