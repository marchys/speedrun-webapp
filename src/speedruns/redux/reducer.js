import { handleActions } from 'redux-actions';
import { consts } from './actions';

const initialState = {
  loading: false,
  error: null,
  loaded: false,
  speedruns: [],
};

export default handleActions(
  {
    [consts.fetchRunsRequest]: state => ({
      ...state,
      loading: true,
    }),
    [consts.fetchRunsSuccess]: (state, { payload: { data } }) => ({
      ...state,
      loading: false,
      loaded: true,
      speedruns: data,
    }),
    [consts.fetchRunsFailure]: (state, { payload: { error } }) => ({
      ...state,
      loading: false,
      loaded: false,
      error,
    }),
  },
  initialState,
);

export const name = 'speedruns';
