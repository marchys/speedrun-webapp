import React from 'react';
import { shallow } from 'enzyme';

import GameItem from 'games/components/GameItem';
import { Loading, AppError } from 'components/molecules';
import { Games } from '../Games';

const defaultGames = [
  { id: 'fe312', name: 'spiderman', image: 'https://www.google.com/' },
  { id: 'fasdtg', name: 'batman', image: 'https://github.com/' },
  { id: 'awetras', name: 'fallout', image: 'https://about.gitlab.com/' },
];

function setup({
  games = defaultGames,
  getGames = jest.fn(),
  loading = false,
  loaded = false,
  ...props
} = {}) {
  const wrapper = shallow(
    <Games games={games} getGames={getGames} loading={loading} loaded={loaded} {...props} />,
  );
  return {
    wrapper,
    get gameItems() {
      return wrapper.find(GameItem);
    },
    get title() {
      return wrapper.find('h1').text();
    },
    get loading() {
      return wrapper.find(Loading);
    },
    get error() {
      return wrapper.find(AppError);
    },
  };
}

test('should render', () => {
  const { wrapper } = setup();

  expect(wrapper.getElement()).not.toBe(null);
});

test('should show loading if loading prop', () => {
  const wrapper = setup({ loading: true });

  expect(wrapper.loading).toExist();
});

test('should show error if error prop', () => {
  const wrapper = setup({ error: { status: 500 } });

  expect(wrapper.error).toExist();
});

test('should render title', () => {
  const games = setup();

  expect(games.title).toMatchSnapshot();
});

test('should render a list of games passed', () => {
  const games = setup({ games: defaultGames });

  expect(games.gameItems).toHaveLength(3);
});
