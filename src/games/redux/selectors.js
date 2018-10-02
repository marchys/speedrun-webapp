import { createSelector } from 'reselect';

const gamesSelector = state => state.games || {};
export const gameSelector = createSelector(gamesSelector, ({ games }) =>
  games.map(({ id, names, assets }) => ({
    id,
    name: names.international,
    image: assets['cover-medium'].uri,
  })),
);
export const loadingSelector = createSelector(gamesSelector, ({ loading }) => loading);
export const errorSelector = createSelector(gamesSelector, ({ error }) => error);

export default {
  games: gameSelector,
  loading: loadingSelector,
  error: errorSelector,
};
