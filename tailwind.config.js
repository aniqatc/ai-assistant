const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/*.{html,js}'],
	darkMode: 'class',
	theme: {
		screens: {
			xs: '475px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				mono: ['Source Code Pro', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
			},
			colors: {},
			container: {
				center: true,
				screens: {
					sm: '640px',
					md: '768px',
					lg: '1024px',
					xl: '1024px',
					'2xl': '1024px',
				},
			},
		},
	},
	plugins: [],
};
