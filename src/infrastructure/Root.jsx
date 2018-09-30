import React from 'react';
import Speedruns from '../speedruns/containers/Speedruns';

const style = {
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '690px',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
};

function Root() {
  return (
    <div style={style}>
      <Speedruns />
    </div>
  );
}

let ExportedRoot = Root; // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV === 'development') {
  const { hot, setConfig } = require('react-hot-loader'); //eslint-disable-line
  setConfig({ logLevel: 'debug' });
  ExportedRoot = hot(module)(Root);
}

export default ExportedRoot;
