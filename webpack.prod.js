const HtmlWebpack = require( 'html-webpack-plugin' )
const MiniCssExtract = require("mini-css-extract-plugin");

const cssMinimizer =require('css-minimizer-webpack-plugin');
const Tercer = require('terser-webpack-plugin');



module.exports = {
    mode: 'production',

    output: {
        clean : true,
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/, 
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: '/style.css$/',
                use: [ MiniCssExtract.loader, 'css-loader']

            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },
    optimization:{
        minimize: true,
        minimizer: [
            new cssMinimizer(),
            new Tercer(),
        ]
    },
    plugins: [
        new HtmlWebpack({
            title: 'mi webpack app',
            filename: 'index.html',
            template: './src/index.html'
        } ),

        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        
    ]


}
