const config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],

	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				primary: {
					DEFAULT: "#00a2e5",
					500: "#00a2e5",
					600: "#008FCC",
					700: "#007CB2",
				},
				secondary: {
					DEFAULT: "#F37700",
					500: "#F37700",
					600: "#DB6900",
					700: "#C25B00",
				},
			},
		},
	},
	plugins: [],
};

export default config;
