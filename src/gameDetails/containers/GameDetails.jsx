import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import compose from 'lodash/fp/compose';
import { setSeconds, format, addMinutes } from 'date-fns';

import Container from 'components/atoms/Container';
import { Loading, AppError } from 'components/molecules';

import Button from '@material-ui/core/Button';

import gamesSelectors from 'games/redux/selectors';
import gamesActions from 'games/redux/actions';
import speedrunsActions from 'speedruns/redux/actions';
import speedrunsSelectors from 'speedruns/redux/selectors';

export class GameDetails extends React.Component {
  componentDidMount() {
    const {
      gamesLoaded,
      getGames,
      getSpeedruns,
      match: {
        params: { id },
      },
    } = this.props;

    getSpeedruns(id);

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

  renderSpeedrunData() {
    const { speedrunsLoading, speedrunsError } = this.props;

    if (speedrunsLoading) {
      return <Loading />;
    }

    if (speedrunsError) {
      return <AppError />;
    }

    const { speedruns } = this.props;

    if (speedruns.length === 0) {
      return <p> Could Not find speedruns</p>;
    }

    const { video, playerName, time } = speedruns[0];

    const date = setSeconds(new Date(0), time);

    const adjustedTime = addMinutes(date, date.getTimezoneOffset());

    return (
      <div>
        {video && (
          <Button href={video} target="_blank">
            Video
          </Button>
        )}
        <p> {playerName} </p>
        <p> {format(adjustedTime, 'HH:mm:ss')} </p>
      </div>
    );
  }

  render() {
    return (
      <Container>
        <h1> Game Details</h1>
        <Link to="/"> Back </Link>
        {this.renderBaseGame()}
        {this.renderSpeedrunData()}
      </Container>
    );
  }
}

GameDetails.propTypes = {
  getGames: PropTypes.func.isRequired,
  getSpeedruns: PropTypes.func.isRequired,
  gamesLoading: PropTypes.bool.isRequired,
  gamesLoaded: PropTypes.bool.isRequired,
  gamesError: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  speedrunsLoading: PropTypes.bool.isRequired,
  speedrunsError: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
  speedruns: PropTypes.arrayOf(
    PropTypes.shape({
      video: PropTypes.string.isRequired,
      playerName: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
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
  speedrunsError: void 0,
  games: [],
  speedruns: [],
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
  speedrunsLoading: speedrunsSelectors.loading,
  speedrunsError: speedrunsSelectors.error,
  speedruns: speedrunsSelectors.speedruns,
});

const connectToStore = connect(
  mapStateToProps,
  {
    getGames: gamesActions.getGames,
    getSpeedruns: speedrunsActions.getSpeedruns,
  },
);

export default compose(connectToStore)(GameDetails);
