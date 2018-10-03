import { createAction } from 'redux-actions';
import speedrunsClient from 'libs/speedrunsClient';

const fetchRunsRequest = createAction('FETCH_RUNS_REQUEST');
const fetchRunsSuccess = createAction('FETCH_RUNS_SUCCESS');
const fetchRunsFailure = createAction('FETCH_RUNS_FAILURE');

const getSpeedruns = game => async dispatch => {
  dispatch(fetchRunsRequest());

  const { data, error } = await speedrunsClient.get('/runs?', { params: { game } });

  if (error) {
    dispatch(fetchRunsFailure({ error }));
    return;
  }

  dispatch(fetchRunsSuccess(data));
};

export const consts = {
  fetchRunsRequest,
  fetchRunsSuccess,
  fetchRunsFailure,
};

export default {
  getSpeedruns,
};
