import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { history } from '../utilities';
import auth from './auth';
import evaluationPlatform from './evaluationPlatform';
import payment from './payment';
import { isProd } from 'utilities/constants';
import logger from 'redux-logger';
import talkToExpert from './talkToExpert';
import { useDispatch } from 'react-redux';
import logoutReducer from './logout';
import stripePayment from './stripePayment';

const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

if (window.enableLogging && !isProd()) {
  middleware.push(logger)
}
const appReducer = combineReducers({
  router: connectRouter(history),
  auth,
  evaluationPlatform,
  payment,
  talkToExpert,
  stripePayment
});

const rootReducer = (state: any, action: any) => {
  return appReducer(logoutReducer(state, action), action);
}

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

!isProd() && (window.store = store)

export type RootState = ReturnType<typeof rootReducer>
export default store;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();