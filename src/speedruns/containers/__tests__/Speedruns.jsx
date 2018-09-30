import React from 'react';
import { shallow } from 'enzyme';

import GameItem from 'speedruns/components/GameItem';
import Speedruns from '../Speedruns';

const defaultGames = [
  { id: 'fe312', name: 'spiderman', image: 'https://www.google.com/' },
  { id: 'fasdtg', name: 'batman', image: 'https://github.com/' },
  { id: 'awetras', name: 'fallout', image: 'https://about.gitlab.com/' },
];

function setup({ games = defaultGames } = {}) {
  const wrapper = shallow(<Speedruns games={games} />);
  return {
    wrapper,
    get gameItems() {
      return wrapper.find(GameItem);
    },
    get title() {
      return wrapper.find('h1').text();
    },
  };
}
test('should render', () => {
  const { wrapper } = setup();

  expect(wrapper.getElement()).not.toBe(null);
});

test('should render title', () => {
  const speedruns = setup();

  expect(speedruns.title).toMatchSnapshot();
});

test('should render a list of games passed', () => {
  const speedruns = setup({ games: defaultGames });

  expect(speedruns.gameItems).toHaveLength(3);
});
