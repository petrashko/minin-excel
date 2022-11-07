"use strict";

const path = require('path');
//
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const dist = path.resolve(__dirname, 'dist');

module.exports = (env, argv) => {

    const isProd = argv.mode === 'production';
    const isDev = !isProd;

    const fileName = (ext) => {
        // [contenthash]: Случайно генерируемый хэш
        const hash = isProd ? `[contenthash].bundle` : 'bundle';

        // [name]: Заменятся названиями ключей из объекта entry.
        // Например, выходной файл: main.bundle.js.
        // Если, в объекте entry несколько полей - будет
        // генерироваться несколько выходных js-файлов.
        return `[name].${hash}.${ext}`
    }

    return {
        context: path.resolve(__dirname, 'src'),

        entry: {
            main: ['core-js/stable', 'regenerator-runtime/runtime', './index.js']
        },

        output: {
            path: dist,
            // [name]: Заменятся названиями ключей из объекта entry.
            // Например, выходной файл: main.bundle.js.
            // Если, в объекте entry несколько полей - будет
            // генерироваться несколько выходных js-файлов.
            //filename: '[name].bundle.js',

            // Заменили на вызов функции
            filename: fileName('js'),
            //
            clean: true
        },

        resolve: {
            // Расширение '.js' в операции import можно не указывать.
            extensions: ['.js'],
            alias: {
                // @: Абсалютный алиас для операции import.
                // Указывает на папку src.
                '@': path.resolve(__dirname, 'src'),
                '@core': path.resolve(__dirname, 'src', 'core')
            }
        },

        devtool: isDev ? 'source-map' : false,

        devServer: {
            port: 4000,
            open: true,
            hot: true,
            watchFiles: './'
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'src', 'favicon.ico'),
                        to: dist
                    },
                    {
                        from: 'assets/**/*',
                        to: dist
                    }
                    //{from: 'other', to: 'public'}
                ]
            }),
            new MiniCssExtractPlugin({
                // [name]: Заменятся названиями ключей из объекта entry.
                //filename: '[name].bundle.css'

                // Заменили на вызов функции
                filename: fileName('css')
            })
        ],

        module: {
            rules: [
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.m?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }
            ],
        }
    }
}
