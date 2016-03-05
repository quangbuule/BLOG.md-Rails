import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import * as reducers from 'reducers';

export default createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);
