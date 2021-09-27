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
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    // publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      // path: require.resolve('path-browserify'),
    },
  },

  context: path.resolve(__dirname, './src'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  devServer: {
    // contentBase: path.join(__dirname, 'src'),
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
      template: path.join(__dirname, 'src', 'index.html'),
    }),
  ],
});

export default webpackConfig;
