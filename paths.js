const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appDist: resolveApp('dist'),
  appSrc: resolveApp('src'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
};
