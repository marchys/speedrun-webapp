import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';

import List from '@material-ui/core/List';
import { Loading, AppError } from 'components/molecules';

import GameItem from 'games/components/GameItem';
import selectors from 'games/redux/selectors';
import actions from 'games/redux/actions';

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

export class Games extends React.Component {
  componentDidMount() {
    const { getGames } = this.props;
    getGames();
  }

  renderGames() {
    const { games, loading, error } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <AppError />;
    }

    return (
      <List style={style.list}>
        {games.map(({ id, name, image }) => (
          <GameItem key={id} name={name} image={image} />
        ))}
      </List>
    );
  }

  render() {
    return (
      <div style={style.container}>
        <h1 style={style.title}> Games </h1>
        {this.renderGames()}
      </div>
    );
  }
}

Games.propTypes = {
  getGames: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
};

Games.defaultProps = {
  games: [],
  error: void 0,
};

const mapStateToProps = createStructuredSelector({
  loading: selectors.loading,
  games: selectors.games,
  error: selectors.error,
});

const connectToStore = connect(
  mapStateToProps,
  {
    getGames: actions.getGames,
  },
);

export default compose(connectToStore)(Games);
