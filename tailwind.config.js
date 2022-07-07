module.exports = {
    content: ['./src/**/*.{html,svelte,js}'],
    theme: {
        extend: {}
    },
    plugins: [
        require('daisyui'),
        require('@tailwindcss/forms'),
    ]
};
