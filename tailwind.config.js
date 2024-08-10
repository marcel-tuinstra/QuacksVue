/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: ["light", "dark", "retro"],
    },
    theme: {
        extend: {
            width: {
                '112': '28rem',
                '128': '32rem',
                '144': '36rem',
                '160': '40rem',
                '176': '44rem',
                '192': '48rem',
                '208': '52rem'
            }
        }
    }
}
