// gql-frontend/webpack.config.ts

import path from 'path'; // -> error
import webpack, { Configuration } from 'webpack';
import HtmlWebPackPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';

const webpackConfig = (): Configuration => ({
  devtool: !isProduction ? 'source-map' : false,
  target: 'web',
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    fallback: {
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        commons: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      // TODO not sure about this?
      // publicPath: isProduction ? 'http://localhost:8080/' : '',
      publicPath: isProduction ? 'http://localhost:3000/' : '',
    }),
  ],
});

export default webpackConfig;
