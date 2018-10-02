import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  bigAvatar: {
    width: 80,
    height: 80,
  },
};

export default function GameItem({ name, image }) {
  return (
    <ListItem button>
      <Avatar src={image} alt={`${name} logo`} style={styles.bigAvatar} />
      <ListItemText primary={name} />
    </ListItem>
  );
}

GameItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
