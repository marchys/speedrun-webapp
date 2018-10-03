import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import compose from 'lodash/fp/compose';

import Container from 'components/atoms/Container';
import { Loading, AppError } from 'components/molecules';

import gamesSelectors from 'games/redux/selectors';
import gamesActions from 'games/redux/actions';

export class GameDetails extends React.Component {
  componentDidMount() {
    const { gamesLoaded, getGames } = this.props;
    if (!gamesLoaded) {
      getGames();
    }
  }

  renderBaseGame() {
    const { gamesLoading, gamesError } = this.props;

    if (gamesLoading) {
      return <Loading />;
    }

    if (gamesError) {
      return <AppError />;
    }

    const {
      games,
      match: {
        params: { id },
      },
    } = this.props;

    const foundGame = games.find(game => game.id === id);

    if (!foundGame) {
      return <p> Could Not find game</p>;
    }

    const { name, image } = foundGame;

    return (
      <div>
        <h2> {name} </h2>
        <img src={image} alt={`${name} logo`} />
      </div>
    );
  }

  render() {
    return (
      <Container>
        <h1> Game Details</h1>
        <Link to="/"> Back </Link>
        {this.renderBaseGame()}
      </Container>
    );
  }
}

GameDetails.propTypes = {
  getGames: PropTypes.func.isRequired,
  gamesLoading: PropTypes.bool.isRequired,
  gamesLoaded: PropTypes.bool.isRequired,
  gamesError: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
};

GameDetails.defaultProps = {
  gamesError: void 0,
  games: [],
  match: {
    params: {
      id: '',
    },
  },
};

const mapStateToProps = createStructuredSelector({
  gamesLoading: gamesSelectors.loading,
  gamesLoaded: gamesSelectors.loaded,
  gamesError: gamesSelectors.error,
  games: gamesSelectors.games,
});

const connectToStore = connect(
  mapStateToProps,
  {
    getGames: gamesActions.getGames,
  },
);

export default compose(connectToStore)(GameDetails);
