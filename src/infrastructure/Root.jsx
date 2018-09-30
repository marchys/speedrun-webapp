import React from 'react';
import Speedruns from '../speedruns/containers/Speedruns';

function Root() {
  return <Speedruns />;
}

let ExportedRoot = Root; // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV === 'development') {
  const { hot, setConfig } = require('react-hot-loader'); //eslint-disable-line
  setConfig({ logLevel: 'debug' });
  ExportedRoot = hot(module)(Root);
}

export default ExportedRoot;
