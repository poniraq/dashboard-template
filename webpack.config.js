const path = require('path');
const DevMode = process.env.NODE_ENV !== 'production';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


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
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/lib/template/assets/img/favicon.png'),
            to: path.resolve(__dirname, 'dist/assets/images/favicon.png')
        }])
    ],

    module: {
        rules: [{
            test: /jquery-mousewheel/, loader: "imports-loader?define=>false&this=>window"
        }, {
            test: /malihu-custom-scrollbar-plugin/, loader: "imports-loader?define=>false&this=>window"
        }, {
            test: /\.s?css$/,
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
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/images'
                }
            }]
        }, {
            test: /\.(ttf|woff2?|eot)(\?v=.+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'assets/fonts'
                }
            }]
        }]
    }
};