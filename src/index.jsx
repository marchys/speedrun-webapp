import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';

import Root from './infrastructure/Root';
import configureStore from './infrastructure/configureStore';

document.body.style.margin = 0;
document.body.style.backgroundColor = '#EEEEEE';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
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
