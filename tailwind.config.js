module.exports = {
	content: ['./src/*.{html,js}'],
	darkMode: 'class',
	theme: {
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
