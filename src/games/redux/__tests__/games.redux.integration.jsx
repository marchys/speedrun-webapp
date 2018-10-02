import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import speedrunsClient from 'libs/speedrunsClient';

import reducer, { name } from 'games/redux/reducer';
import actions from 'games/redux/actions';
import selectors from 'games/redux/selectors';

jest.mock('libs/speedrunsClient');

function setup(initialState = {}) {
  const middlewares = [thunk];

  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    combineReducers({ [name]: reducer }),
    initialState,
    compose(...enhancers),
  );

  return {
    store,
  };
}

test('should have initial state', async () => {
  const { store } = setup();

  expect(store.getState()).toMatchSnapshot();
});

describe('get games', () => {
  beforeEach(async () => {
    speedrunsClient.post.mockClear();
  });

  test('should show loading', async () => {
    speedrunsClient.get.mockReturnValueOnce(new Promise(() => {}));
    const { store } = setup();

    store.dispatch(actions.getGames());

    expect(selectors.loading(store.getState())).toBe(true);
  });

  describe('success', () => {
    const games = [
      {
        id: 'k6qqkx6g',
        names: {
          international: '! Fishy !',
        },
        assets: {
          'cover-medium': {
            uri: 'http://google.es',
          },
        },
      },
    ];

    function setupSuccess(response) {
      speedrunsClient.get.mockImplementationOnce(async () => ({
        data: { data: response },
      }));
    }

    test('should store games in store', async () => {
      setupSuccess(games);
      const { store } = setup();

      await store.dispatch(actions.getGames());

      expect(selectors.games(store.getState())).toEqual([
        { id: 'k6qqkx6g', name: '! Fishy !', image: 'http://google.es' },
      ]);
    });

    test('should hide loading', async () => {
      setupSuccess(games);
      const { store } = setup();

      await store.dispatch(actions.getGames());

      expect(selectors.loading(store.getState())).toBe(false);
    });
  });

  describe('failure', () => {
    const customError = 'custom error';
    function setupFailure(error) {
      speedrunsClient.get.mockImplementationOnce(async () => ({
        error,
      }));
    }

    beforeEach(async () => {
      speedrunsClient.post.mockClear();
    });

    test('should store error in store', async () => {
      setupFailure(customError);
      const { store } = setup();

      await store.dispatch(actions.getGames());

      expect(selectors.error(store.getState())).toEqual(customError);
    });

    test('should hide loading', async () => {
      setupFailure(customError);
      const { store } = setup();

      await store.dispatch(actions.getGames());

      expect(selectors.loading(store.getState())).toBe(false);
    });
  });
});
