import { combineReducers } from 'redux';
import * as reducer from 'games/redux/reducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    [reducer.name]: reducer.default,
    ...asyncReducers,
  });
}
