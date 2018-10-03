import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';

import Root from './infrastructure/Root';


document.body.style.margin = 0;
document.body.style.backgroundColor = '#EEEEEE';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app'),
  );
};

render(Root);

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./infrastructure/Root', () => {
      render(Root);
    });
  }
}
