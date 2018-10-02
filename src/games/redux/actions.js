import { createAction } from 'redux-actions';
import speedrunsClient from 'libs/speedrunsClient';

const fetchGamesRequest = createAction('FETCH_GAMES_REQUEST');
const fetchGamesSuccess = createAction('FETCH_GAMES_SUCCESS');
const fetchGamesFailure = createAction('FETCH_GAMES_FAILURE');

const getGames = () => async dispatch => {
  dispatch(fetchGamesRequest());

  const { data, error } = await speedrunsClient.get('/games');

  if (error) {
    dispatch(fetchGamesFailure({ error }));
    return;
  }

  dispatch(fetchGamesSuccess(data));
};

export const consts = {
  fetchGamesRequest,
  fetchGamesSuccess,
  fetchGamesFailure,
};

export default {
  getGames,
};
