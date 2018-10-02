import React from 'react';
import Games from 'games/containers/Games';

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
      <Games />
    </div>
  );
}

export default Root;
