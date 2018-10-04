const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const env = process.env.NODE_ENV;

const publicPath = env === 'development' ? '/' : './';

module.exports = {
  appDist: resolveApp('dist'),
  appSrc: resolveApp('src'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  publicPath,
};
