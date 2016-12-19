import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import {mailings_reducer} from './components/Mailing';
import {recipients_reducer} from './components/Recipient';
import {content_reducer} from './components/Content';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const AppReducer = combineReducers({
  mailings: mailings_reducer,
  recipients: recipients_reducer,
  content: content_reducer
});

const persistedState = loadState();

const store = createStore(AppReducer, persistedState, applyMiddleware(logger));

store.subscribe(throttle(()=>{
  saveState(store.getState());
}, 1000));

export default store;
