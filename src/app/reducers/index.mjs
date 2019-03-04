
import {combineReducers} from 'redux';
import ymaps from './ymaps';

const gpxContent = (state = {}) => state;

const route = (state = {}) => state;

const meta = (state = {}) => state;

const athlete = (state = null) => state;

export const rootReducer = combineReducers({
    gpxContent,
    ymaps,
    route,
    athlete,
    meta,
});
