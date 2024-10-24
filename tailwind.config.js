/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                nunito: 'Nunito Sans Variable, sans-serif',
            },
            keyframes: {
                visible: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '100' },
                },
            },
            animation: {
                visible: 'visible 0.3s  ',
            },
        },
    },
    plugins: [],
}
