import { createStore, applyMiddleware, combineReducers } from 'redux';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';
import {mailings_reducer} from './components/Mailing';

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const AppReducer = combineReducers({
  mailings: mailings_reducer
});

const persistedState = loadState();

const store = createStore(AppReducer, persistedState, applyMiddleware(logger));

store.subscribe(throttle(()=>{
  saveState({
    mailings: store.getState().mailings
  });
}, 1000));

export default store;
