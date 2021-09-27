// development config
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

interface Configuration extends WebpackConfiguration {
  devServer: DevServerConfiguration;
}

const devConfig: Configuration = {
  mode: 'development',
  entry: './index.tsx',
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'cheap-module-source-map',
  // devtool: 'souce-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

export default devConfig;
