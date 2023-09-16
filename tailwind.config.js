/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			backgroundColor: {
				"custom-black": "rgba(0, 0, 0, 0.14)",
				"glass1-stroke-carey": "#AFAFAF",
			},
			backgroundImage: {
				"custom-gradient":
					"linear-gradient(321deg, rgba(191, 191, 191, 0.06) 5.98%, rgba(0, 0, 0, 0.00) 66.28%)",
				"glass1-gradient": "linear-gradient(#AFAFAF, #606060 0%)",
			},
		},
	},
	plugins: [],
};
