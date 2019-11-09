import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import {store} from './_helpers/store';
import {saveState} from './_helpers/localStorage';
import './assets/css/styles.css';

//this method is fired everytime a change occurs in the store, so save the state to localStorage
store.subscribe(() => {
    let currentState = store.getState();
    saveState(currentState);
})

ReactDOM.render(
    <Provider store = {store}>
        <App/> 
    </Provider>
    ,
    document.getElementById('root')
);

serviceWorker.unregister();
