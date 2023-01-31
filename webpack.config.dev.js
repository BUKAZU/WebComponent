process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const cssFilename = 'index.css';

module.exports = {
  entry: './dev.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: { loader: 'babel-loader' },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      process: 'process/browser',
    },
  },
  optimization: {},
  plugins: [    
    new MiniCssExtractPlugin({
      filename: cssFilename,
    }),
  ],
};
