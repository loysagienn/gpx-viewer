const stylus = require('stylus');
const {resolvePath} = require('./buildHelpers');


const isProductionMode = process.env.NODE_ENV === 'production';

const isWebpackCaller = ({name}) => name === 'babel-loader';

// для серверной сборки, для клиентской все разруливает вебпак
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

    const moduleResolverOptions = {
        resolvePath,
        root: './src',
        pathAlias: {
            config: `config/${isProductionMode ? 'production' : 'development'}`,
        },
    };

    const presets = [
        '@babel/preset-flow',
        '@babel/preset-react',
    ];
    const plugins = [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-proposal-class-properties',
        ['module-resolver', moduleResolverOptions],
    ];

    if (isWebpack) {
        Object.assign(moduleResolverOptions.pathAlias, {
            logger: 'app/client/logger',
        });
    } else {
        plugins.push('@babel/plugin-transform-modules-commonjs');
        plugins.push(cssModulesTransform);
    }

    return {presets, plugins};
};
