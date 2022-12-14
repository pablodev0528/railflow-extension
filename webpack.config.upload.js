const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const {
    getHTMLPlugins,
    getOutput,
    getCopyPlugins,
    getEntry,
    getResolves,
    getDefinePlugins,
    getCleanWebpackPlugin,
    config,
    getExtensionManifestPlugin,
    getEslintPlugin,
} = require('./webpack.utils');

const NODE_ENV = 'production';
const TARGET = process.env.TARGET;

const generalConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        // options: {
                        //     transpileOnly: true,
                        // },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
        ],
    },
    resolve: getResolves(),
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
};

module.exports = [
    {
        ...generalConfig,
        entry: getEntry(config.SRC_DIR),
        output: getOutput(TARGET, config.DIST_DIR),
        plugins: [
            ...getCleanWebpackPlugin(TARGET, config.DIST_DIR, config.DIST_DIR),
            new webpack.ProgressPlugin(),
            ...getEslintPlugin(),
            ...getExtensionManifestPlugin(TARGET),
            ...getDefinePlugins({ NODE_ENV }),
            ...getHTMLPlugins(TARGET, config.DIST_DIR, config.SRC_DIR),
            ...getCopyPlugins(TARGET, config.DIST_DIR, config.SRC_DIR),
        ],
    },
];
