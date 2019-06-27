module.exports = {
    parser: 'babel-eslint',
    extends: [
        'airbnb',
        'plugin:flowtype/recommended'
    ],
    env: {
        node: true,
    },
    'plugins': [
        'flowtype',
        'jest',
        'import'
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: [
                    ".js",
                    ".mjs"
                ]
            },
            'babel-module': {
                root: ['./src'],
            }
        }
    },
    rules: {
        'max-len': ['error', {code: 120, ignoreStrings: true, ignoreTemplateLiterals: true}],
        'indent': ['error', 4],
        'object-curly-spacing': ['error', 'never'],
        'object-curly-newline': 'off',
        'no-use-before-define': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.mjs', '.js'] }],
        'react/sort-comp': 'off',
        'react/jsx-tag-spacing': {
            beforeSelfClosing: 'never',
        },
        'react/require-default-props': 'off',
        'react/prop-types': 'off',
        // 'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'no-param-reassign': 'off',
        'no-console': 'off',
        'no-return-assign': 'off',
        'no-underscore-dangle': 'off',
        'function-paren-newline': 'off',
        'no-plusplus': 'off',
        'no-throw-literal': 'off',

        'flowtype/use-flow-type': 1,
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/no-noninteractive-tabindex': 'off',
    },
    overrides: [
        {
            files: [
                'src/app/**/*.mjs',
                'src/helpers/**/*.mjs',
            ],
            env: {
                'shared-node-browser': true,
            },
        },
        {
            files: [
                'src/app/client/**/*.mjs',
            ],
            env: {
                browser: true,
            },
        },
        {
            files: [
                'src/app/server/**/*.mjs',
            ],
            env: {
                node: true,
            },
        },
        {
            files: [
                'src/**/__tests__/**/*.mjs',
            ],
            env: {
                jest: true,
            },
        }
    ]
};
