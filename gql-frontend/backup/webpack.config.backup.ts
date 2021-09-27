// gql-frontend/webpack.config.ts

import path from 'path'; // -> error
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import HtmlWebPackPlugin from 'html-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer: DevServerConfiguration;
}

const isProduction = process.env.NODE_ENV === 'production';

const webpackConfig = (): Configuration => ({
  // const webpackConfig = () => ({
  devtool: !isProduction ? 'source-map' : false,
  target: 'web',
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  // entry: path.resolve(__dirname, './src/index.tsx'),
  // entry: path.join(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  // resolveLoader: {
  //   modules: [path.resolve(__dirname, 'node_modules')],
  // },

  resolve: {
    // modules: [path.join(__dirname, 'node_modules')],
    extensions: ['.js', '.ts', '.tsx', '.json'],
    fallback: {
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      // path: require.resolve('path-browserify'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          // loader: 'ts-loader',
          loader: 'babel-loader',
          // options: {
          //   transpileOnly: true,
          // },
        },

        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
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
