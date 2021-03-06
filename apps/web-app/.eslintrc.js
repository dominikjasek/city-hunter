module.exports = {
    env: {
        "browser": true,
        "es2021": true
    },
    settings: {
        react: {
            version: "detect",
            "self-closing-comp": ["error", {
                "component": true,
                "html": true
            }]
        }
    },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: [
        "react",
        "@typescript-eslint"
    ],
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "no-multiple-empty-lines": ["error", {"max": 1, "maxEOF": 1}],
        "semi": ["error", "never"],
        "@typescript-eslint/member-delimiter-style": ["error", {
            "multiline": {
                "delimiter": "none",
                "requireLast": true
            },
            "singleline": {
                "delimiter": "semi",
                "requireLast": false
            }
        }],
        "object-curly-spacing": ["error", "always"],
        "array-bracket-spacing": ["error", "never"],
        "computed-property-spacing": ["error", "always"],
        "indent": ["error", 2],
        "no-multi-spaces": "error",
        "no-trailing-spaces": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error", {"argsIgnorePattern": "^_"}],
        "quotes": ["error", "single"]
    }
}
