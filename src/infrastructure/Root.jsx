import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Games from 'games/containers/Games';
import GameDetails from 'gameDetails/containers/GameDetails';
import NotFound from 'components/organisms/NotFound';
import configureStore from './configureStore';

const style = {
  display: 'flex',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '690px',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
};

const store = configureStore();

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div style={style}>
          <Switch>
            <Route exact path="/" component={Games} />
            <Route exact path="/game-details/:id" component={GameDetails} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default Root;
