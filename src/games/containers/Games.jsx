import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import compose from 'lodash/fp/compose';
import noop from 'lodash/fp/noop';

import List from '@material-ui/core/List';
import { Loading, AppError } from 'components/molecules';
import Container from 'components/atoms/Container';

import GameItem from 'games/components/GameItem';
import selectors from 'games/redux/selectors';
import actions from 'games/redux/actions';

const style = {
  list: {
    backgroundColor: '#68a88b',
    width: '100%',
  },
};

export class Games extends React.Component {
  componentDidMount() {
    const { getGames, loaded } = this.props;
    if (!loaded) {
      getGames();
    }
  }

  handleGameClick(id) {
    const {
      history: { push },
    } = this.props;
    push(`/game-details/${id}`);
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
          <GameItem key={id} name={name} image={image} onClick={() => this.handleGameClick(id)} />
        ))}
      </List>
    );
  }

  render() {
    return (
      <Container>
        <h1 style={style.title}> Games </h1>
        {this.renderGames()}
      </Container>
    );
  }
}

Games.propTypes = {
  getGames: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Games.defaultProps = {
  games: [],
  error: void 0,
  history: {
    push: noop,
  },
};

const mapStateToProps = createStructuredSelector({
  loading: selectors.loading,
  loaded: selectors.loaded,
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
