import { createSelector } from 'reselect';
import get from 'lodash/fp/get';

const speedrunsSelector = state => state.speedruns || {};

const mapSpeedrunData = ({ videos, players, times: { primary_t: primaryTime } } = {}) => ({
  video: get('links.[0].uri', videos),
  playerName: get('[0].name', players) || get('[0].id', players),
  time: primaryTime,
});

export const speedrunSelector = createSelector(speedrunsSelector, ({ speedruns }) =>
  speedruns.map(mapSpeedrunData),
);

export const loadingSelector = createSelector(speedrunsSelector, ({ loading }) => loading);

export const errorSelector = createSelector(speedrunsSelector, ({ error }) => error);

export const loadedSelector = createSelector(speedrunsSelector, ({ loaded }) => loaded);

export default {
  speedruns: speedrunSelector,
  loading: loadingSelector,
  error: errorSelector,
  loaded: loadedSelector,
};
