import { handleActions } from 'redux-actions';
import { consts } from './actions';

const initialState = {
  loading: false,
  error: null,
  loaded: false,
  games: [],
};

export default handleActions(
  {
    [consts.fetchGamesRequest]: state => ({
      ...state,
      loading: true,
    }),
    [consts.fetchGamesSuccess]: (state, { payload: { data } }) => ({
      ...state,
      loading: false,
      loaded: true,
      games: data,
    }),
    [consts.fetchGamesFailure]: (state, { payload: { error } }) => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    }),
  },
  initialState,
);

export const name = 'games';
