import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from 'lib/store';

import Application from './Application';
import PostIndexPage from './PostIndexPage';
import PostNewPage from './PostNewPage';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export default class AppRouter extends React.Component {

  render() {
    return (
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={Application}>
        <Route path="posts" component={PostIndexPage} />
        <Route path="posts/new" component={PostNewPage} />
      </Route>
    </Router>
  </Provider>
    );
  }
}
