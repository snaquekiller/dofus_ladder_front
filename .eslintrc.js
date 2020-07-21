module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            legacyDecorators: true,
            arrowFunctions: true,
            blockBindings: true
        }
    },
    env: {
        browser: true,
        jquery: true
    },
    settings: {
        'import/resolver': 'webpack'
    },
    rules: {
        'comma-dangle': 'off',
        'max-len': [
            'error',
            {
                code: 120,
                ignoreComments: false
            }
        ],
        'arrow-body-style': ['warn', 'as-needed'],
        'arrow-parens': [
            'error',
            'as-needed',
            {
                requireForBlockBody: false
            }
        ],
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx']
            }
        ],
        'no-return-assign': 'off',
        "semi": ["error", "always"],
        'linebreak-style': 'off',
        'jsx-filename-extension': 'off',
        'class-methods-use-this': 'off',
        'no-shadow': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'react/no-did-mount-set-state': 'off',
        'react/forbid-prop-types': 'off',
        'react/no-unused-prop-types': 'off',
        'no-plusplus': 'off',
        'no-underscore-dangle': 'off',
        "react/destructuring-assignment": ["never"],
        "jsx-quotes": ["error", "prefer-single"],
        "quotes": ["error", "single"],
        "sort-keys": "on",
        "space-before-blocks": "error",
        "space-in-parens": "error",
        "no-dupe-keys": "error",
        "no-irregular-whitespace": "error",
    }
};