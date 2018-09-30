import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';

import GameItem from '../components/GameItem';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  list: {
    backgroundColor: '#68a88b',
    width: '100%',
  },
};

export default function Speedruns({ games }) {
  return (
    <div style={style.container}>
      <h1 style={style.title}> Speedruns </h1>
      <List style={style.list}>
        {games.map(({ id, name, image }) => (
          <GameItem key={id} name={name} image={image} />
        ))}
      </List>
    </div>
  );
}

Speedruns.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
};

Speedruns.defaultProps = {
  games: [
    {
      id: 'k6qqkx6g',
      name: '! Fishy !',
      image: 'https://www.speedrun.com/themes/fishy/cover-128.png',
    },
    {
      id: '46wxo91r',
      name: '&meow; (Meow)',
      image: 'https://www.speedrun.com/themes/meow/cover-128.png',
    },
    {
      id: 'pdvp7kdw',
      name: "'Allo 'Allo! Cartoon Fun!",
      image: 'https://www.speedrun.com/themes/Allo_Allo_Cartoon_Fun/cover-128.png',
    },
  ],
};
