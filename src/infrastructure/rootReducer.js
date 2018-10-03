import { combineReducers } from 'redux';
import * as games from 'games/redux/reducer';
import * as speedruns from 'speedruns/redux/reducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    [games.name]: games.default,
    [speedruns.name]: speedruns.default,
    ...asyncReducers,
  });
}
