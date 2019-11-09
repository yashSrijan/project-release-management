import { createStore, applyMiddleware } from 'redux';
//import logger from 'redux-logger';

import {loadState} from './localStorage';
import rootReducer from '../_reducers/rootReducer';

//this function is executed everytime after a reload happens on the app so as to fetch the previous store
let persistedState = loadState();

export const store = createStore (
    rootReducer,
    persistedState,
    // applyMiddleware (
    //     logger 
    // )
);