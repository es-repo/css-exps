module.exports = {
    env: {
        browser: true,
        es2020: true
    },

    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022
    },

    extends: ['eslint:recommended'],
    overrides: [],
    ignorePatterns: ['.eslintrc.cjs'],

    globals: {
        strict: true
    },

    rules: {
        'no-unused-vars': 'error',
        'no-non-null-assertion': 'off',
        'quotes': ['error', 'single'],
        'no-var': 'error',
        'prefer-const': 'error'
    }
};
