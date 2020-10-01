const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = ({ NODE_ENV, ANALYZE }) => {
  const isProduction = NODE_ENV === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      // pathinfo: isDevelopment,
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].js',
      chunkFilename: isProduction ? '[id].[chunkhash:8].js' : '[id].js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, 'tsconfig.json'),
        }),
      ],
    },
    module: {
      rules: [{
          enforce: 'pre',
          test: /\.(tsx?|jsx?)$/,
          loader: 'eslint-loader',
          include: path.resolve(__dirname, './src'),
          exclude: /node_modules/,
          options: {
            configFile: path.resolve(__dirname, '.eslintrc.js'),
          },
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.(tsx?|jsx?)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      ],
    },
    bail: isProduction,
    plugins: [
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      new CircularDependencyPlugin({
        include: /src/,
        exclude: /node_modules/,
        failOnError: true,
      }),
      ...(ANALYZE ? [new BundleAnalyzerPlugin()] : []),
    ],
  };
};
