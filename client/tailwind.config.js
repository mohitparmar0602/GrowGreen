/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#16a34a', // Green-600
                    foreground: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#f59e0b', // Amber-500
                    foreground: '#ffffff',
                },
                background: '#ffffff',
                foreground: '#0f172a', // Slate-900
            }
        },
    },
    plugins: [],
}
