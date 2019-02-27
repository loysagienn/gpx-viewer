/** @jsx createElement */

import {createElement} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from 'app/reducers';
import App from '../components/App';

export const renderApp = store => (
    <Provider store={store}>
        <App/>
    </Provider>
);

export const getStore = (initialState, composeEnhancers = compose) => createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
);
