// production config
import { resolve } from 'path';
import { Configuration } from 'webpack';

const prodConfig: Configuration = {
  mode: 'production',
  entry: '../../src/index.tsx',
  output: {
    path: resolve(__dirname, '../../dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  devtool: 'cheap-module-source-map',
  plugins: [],
};

export default prodConfig;
