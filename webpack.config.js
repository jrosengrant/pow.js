const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { debug } = require('console');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  devServer: {
    static: {
      publicPath: '/build',
      directory: path.resolve(__dirname, './build'),
    },
    port: 8080,
    compress: true,
    proxy: {
      '/entries': {
        target: 'http://localhost:8080',
        router: () => 'http://localhost:3000',
        logLevel: 'debug', //optional
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
