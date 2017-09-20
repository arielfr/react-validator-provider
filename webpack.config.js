const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: [
    path.resolve() + '/src/index.js'
  ],
  externals: [
    nodeExternals()
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['babel-loader'],
      },
    ]
  },
  output: {
    path: path.resolve() + '/lib',
    filename: 'index.js',
    library: 'ReactValidatorProvider',
    libraryTarget: 'commonjs2',
  }
};