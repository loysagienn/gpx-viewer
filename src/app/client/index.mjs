
import {render} from 'react-dom';
import {compose} from 'redux';
import {renderApp, getStore} from '../common';
import {initYmaps} from './ymaps';
import {initHistory} from './history';
import {initMetrika} from './metrika';
import api from './api';

const {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: composeEnhancers = compose,
    __INITIAL_STATE__: initialState = {},
} = window;

const appRootDomNode = document.getElementById('app');

const store = getStore(initialState, api, composeEnhancers);

initYmaps(store);
initMetrika(store);
initHistory(store);

render(renderApp(store), appRootDomNode);
