const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const buildVersion = require('./buildVersion');

const isProductionMode = process.env.NODE_ENV === 'production';

const staticDir = isProductionMode ? '/home/vajs/public/mytracks' : path.resolve(__dirname, 'static');

module.exports = {
    mode: isProductionMode ? 'production' : 'development',
    optimization: {
        usedExports: true,
    },
    entry: {
        app: './src/app/client/index.mjs',
    },
    externals: {
        ramda: 'R',
        react: 'React',
        'react-dom': 'ReactDOM',
        recompose: 'Recompose',
        redux: 'Redux',
        'react-redux': 'ReactRedux',
        'redux-thunk': 'ReduxThunk',
        reselect: 'Reselect',
        window: 'window',
    },
    output: {
        path: staticDir,
        filename: `[name].${buildVersion}.js`,
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                exclude: /(node_modules)/,
                // Для того чтобы можно было импортить не .mjs модули через destructuring
                type: 'javascript/auto',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-flow', '@babel/preset-react'],
                        plugins: [],
                    },
                },
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[name]__[local]',
                            },
                        },
                        {
                            loader: 'stylus-loader',
                        },
                    ],
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin(`[name].${buildVersion}.css`),
    ],
    // devtool: isProductionMode ? 'none' : 'cheap-module-source-map',
    devtool: 'none',
};
