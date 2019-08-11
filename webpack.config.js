const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProductionMode = process.env.NODE_ENV === 'production';

const publicDir = isProductionMode ? '/home/vajs/public/gpx-viewer' : '/Users/vajs/projects/wweb/gpx/static';

module.exports = {
    mode: isProductionMode ? 'production' : 'development',
    entry: {
        app: './src/app/client/index.mjs',
        logger: './src/clientLogger/index.mjs',
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
        // в файлах пишем import from 'logger', но в src есть папка logger,
        // это серверный логгер, который пишет в базу,
        // и babel переделывает это в что-то вроде import from '../../../logger'
        // а на клиенте нам нужен клиентский логгер, который отправляет запрос, поэтому
        // в babel сделан отдельный алиас, который переделывает это в import from 'log'
        // тут мы уже говорим вебпаку, что этот log надо брать из window.logger
        log: 'logger',
    },
    output: {
        path: publicDir,
        filename: '[name].js',
    },
    // watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: 1000,
    //     ignored: /node_modules/,
    // },
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
        new ExtractTextPlugin('[name].css'),
    ],
    devtool: isProductionMode ? 'none' : 'cheap-eval-source-map',
};
