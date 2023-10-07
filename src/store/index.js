import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import { transferReducer } from './transferReducer';
import { sortReducer } from './sortReducer';
import { fetchReducer } from './fetchReducer';

const loggerMiddleware = (store) => (next) => (action) => {
  const res = next(action);
  // console.log(store.getState());
  return res;
};
const rootReducer = combineReducers({
  checkProps: transferReducer,
  sortProps: sortReducer,
  fetchProps: fetchReducer,
});
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(loggerMiddleware, reduxThunk)));
