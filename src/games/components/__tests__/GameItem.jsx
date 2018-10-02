import React from 'react';
import { shallow } from 'enzyme';

import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import GameItem from '../GameItem';

function setup({ name = 'spiderman', id = '6745nf', image = 'https://www.google.com/' } = {}) {
  const wrapper = shallow(<GameItem name={name} id={id} image={image} />);
  return {
    wrapper,
    get text() {
      return wrapper.find(ListItemText).props().primary;
    },
    get image() {
      return wrapper.find(Avatar);
    },
  };
}

test('should render', () => {
  const { wrapper } = setup();

  expect(wrapper.getElement()).not.toBe(null);
});

test('should display name', () => {
  const name = 'batman';
  const gameItem = setup({ name });

  expect(gameItem.text).toBe(name);
});

describe('img', () => {
  test('should display', () => {
    const image = 'https://github.com/';
    const gameItem = setup({ image });

    expect(gameItem.image.props().src).toBe(image);
  });

  test('should have alt as name+logo', () => {
    const name = 'fish';
    const gameItem = setup({ name });

    expect(gameItem.image.props().alt).toBe(`${name} logo`);
  });
});
