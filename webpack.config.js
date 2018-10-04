const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths');

module.exports = {
  context: paths.appSrc,
  entry: ['@babel/polyfill', 'index.jsx'],
  output: {
    path: paths.appDist,
    publicPath: paths.publicPath,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(['SPEEDRUNS_API']),
    new HtmlWebPackPlugin({
      template: paths.appHtml,
    }),
  ],
  resolve: {
    modules: ['node_modules', paths.appSrc],
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/v1': {
        target: 'http://www.speedrun.com',
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
