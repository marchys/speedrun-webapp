const HtmlWebPackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

module.exports = {
  context: paths.appSrc,
  entry: 'index.jsx',
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
    new HtmlWebPackPlugin({
      template: paths.appHtml,
    }),
  ],
  resolve: {
    modules: ['node_modules', paths.appSrc],
    extensions: ['.js', '.jsx'],
  },
};
