const path = require('path');
const DevMode = process.env.NODE_ENV !== 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: DevMode ? 'development' : 'production',
    devtool: 'source-map',
    entry: './src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ]
    },

    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: DevMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: DevMode ? '[id.css' : '[id].[hash].css'
        })
    ],

    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [{
                loader: MiniCssExtractPlugin.loader
            }, {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }]
        }]
    }
};