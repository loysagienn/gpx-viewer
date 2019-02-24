
import {combineReducers} from 'redux';
import {INIT_YMAPS} from '../actions';

const initialized = (state = false, action) => {
    if (action.type !== INIT_YMAPS) {
        return state;
    }

    return true;
};

const map = (state = null, action) => {
    if (action.type !== INIT_YMAPS) {
        return state;
    }

    return action.ymaps;
};

export default combineReducers({initialized, map});
