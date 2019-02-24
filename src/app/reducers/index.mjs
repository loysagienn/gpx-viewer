
import {combineReducers} from 'redux';
import ymaps from './ymaps';

const gpxContent = (state = {}) => state;


export const rootReducer = combineReducers({
    gpxContent,
    ymaps,
});
