import { createSelector } from 'reselect';

const gamesSelector = state => state.games || {};

const mapGameData = ({ id, names, assets }) => ({
  id,
  name: names.international,
  image: assets['cover-medium'].uri,
});

export const gameSelector = createSelector(gamesSelector, ({ games }) => games.map(mapGameData));

export const loadingSelector = createSelector(gamesSelector, ({ loading }) => loading);

export const errorSelector = createSelector(gamesSelector, ({ error }) => error);

export const loadedSelector = createSelector(gamesSelector, ({ loaded }) => loaded);

export default {
  games: gameSelector,
  loading: loadingSelector,
  error: errorSelector,
  loaded: loadedSelector,
};
