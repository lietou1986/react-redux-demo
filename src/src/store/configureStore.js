import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';

import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from '../middlewares/promiseMiddleware'

import user from '../reducers/user';
import home from '../reducers/home';
import company from '../reducers/company';
import dm from '../reducers/dm';
import message from '../reducers/message';
import monitor from '../reducers/monitor';
import remoteconfig from '../reducers/remoteconfig';
import se from '../reducers/se';

const reducer = combineReducers({
  user,
  home,
  company,
  dm,
  message,
  monitor,
  remoteconfig,
  se
});

var buildStore;

if (__DEBUG__) {
  buildStore = compose(
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware({
        promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']
      })
    ), require('../views/tools/devtools').instrument()
  )(createStore);
} else {
  buildStore = compose(
    applyMiddleware(
      thunkMiddleware,
      promiseMiddleware({
        promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']
      })
    )
  )(createStore);
}

export default function configureStore(initialState) {
  return buildStore(reducer, initialState);
}