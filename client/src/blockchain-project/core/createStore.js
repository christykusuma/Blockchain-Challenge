import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { batch, batching } from 'redux-batch-middleware';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import reducers from './reducers';

export const history = createBrowserHistory();

const middleWares = [
  routerMiddleware(history),
  thunk,
  batch
];

const createStoreWithMiddleware = applyMiddleware(...middleWares)(createStore);

const store = createStoreWithMiddleware(
  batching(reducers),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;