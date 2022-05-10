module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: ['plugin:@typescript-eslint/recommended'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/semi': ['error', 'never'],
        '@typescript-eslint/quotes': ['error', 'single'],
        "@typescript-eslint/indent": ["error", 2],  // knwon problem https://github.com/typescript-eslint/typescript-eslint/issues/1232
        "object-curly-spacing": ["error", "always"],
        "no-multiple-empty-lines": ["error", {"max": 1, "maxEOF": 0}],
        "@typescript-eslint/ban-ts-comment": "off"

    },
};
