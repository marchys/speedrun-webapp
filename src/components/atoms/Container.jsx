import React from 'react';
import PropTypes from 'prop-types';

const style = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
};

export default function Container({ children }) {
  return <div style={style}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
