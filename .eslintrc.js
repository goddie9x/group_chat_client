module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ['plugin:react/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['react', '@typescript-eslint', 'react-hooks', 'simple-import-sort', 'import'],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        'react/prop-types': 'off',
        'react/no-unescaped-entities': 'off',
        semi: 'off',
        '@typescript-eslint/semi': ['error'],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'max-len': [1, 300, 2],
        'generator-star-spacing': 'off',
        'space-before-function-paren': 'off',
        '@typescript-eslint/prefer-as-const': 'off',
        'no-duplicate-case': 'warn',
        'react/self-closing-comp': [
            'error',
            {
                component: true,
                html: true,
            },
        ],
        'no-console': ['warn', { allow: ['error', 'info'] }],
    },
};