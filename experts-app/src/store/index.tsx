import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';

import auth from '../actions/auth/authSlice';
import expertFeedbackQueries from '../actions/expert/query/queriesSlice';
import submission from '../actions/expert/query/submission/submissionSlice';
import candidate from '../actions/expert/query/candidate/candidateSlice';
import meeting from '../actions/expert/query/meeting/meetingSlice';
import jobs from '../actions/hiringManager/jobs/jobsSlice';

export const history = createBrowserHistory();


const middleware = [...getDefaultMiddleware(), routerMiddleware(history)];

const appReducer = combineReducers({
    router: connectRouter(history),
    auth,
    submission,
    candidate,
    meeting,
    expertFeedbackQueries,
    jobs
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'auth/logout') return appReducer(undefined, action);
    return appReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>
