module.exports = {
    extends: [
        'airbnb-typescript'
    ],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'linebreak-style': ['error', 'unix']
    },
    ignorePatterns: [
        'ext/**',
        'node_modules/**'
    ],
};