const stylus = require('stylus');

const isWebpackCaller = ({name}) => name === 'babel-loader';

const cssModulesTransform = [
    'css-modules-transform',
    {
        generateScopedName: '[name]__[local]',
        extensions: ['.css', '.styl'],
        preprocessCss: (css, filename) => stylus(css).set('filename', filename).render(),
    },
];


module.exports = (api) => {
    const isWebpack = api.caller(isWebpackCaller);

    api.cache.forever();

    const presets = [
        '@babel/preset-flow',
        '@babel/preset-react',
    ];
    const plugins = [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',

    ];

    if (isWebpack) {
        plugins.push(
            ['module-resolver', {
                root: ['./src'],
                // для клиента не используем серверный логгер, который ходит в базу, а используем клиентский
                alias: {
                    logger: 'log',
                },
            }],
        );
    } else {
        plugins.push('@babel/plugin-transform-modules-commonjs');
        plugins.push(cssModulesTransform);
        plugins.push(
            ['module-resolver', {
                root: ['./src'],
            }],
        );
    }

    return {presets, plugins};
};
