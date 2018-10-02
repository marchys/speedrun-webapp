const plugins = ['@babel/plugin-syntax-dynamic-import'];

if (process.env.NODE_ENV === 'development') {
  plugins.push('react-hot-loader/babel');
}

if (process.env.NODE_ENV === 'test') {
  plugins.push('babel-plugin-dynamic-import-node');
}

module.exports = {
  plugins,
  presets: ['@babel/preset-env', '@babel/preset-react'],
};
