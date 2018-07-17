/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

let libraryName = pkg.name;

module.exports = {
  entry: __dirname + '/index.js',
  devtool: 'none',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.min.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: ['@babel/preset-env']
        }
      },
    ]
  },
};
