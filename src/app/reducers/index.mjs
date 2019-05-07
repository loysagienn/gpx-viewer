
import {combineReducers} from 'redux';
import {CHANGE_MONTH} from 'app/actions';
import ymaps from './ymaps';

// const gpxContent = (state = {}) => state;

const getCurrentMonth = () => (new Date()).getMonth();

const route = (state = {}) => state;

const meta = (state = {}) => state;

const athlete = (state = null) => state;

const activeMonth = (state = getCurrentMonth(), action) => {
    if (action.type === CHANGE_MONTH) {
        return action.month;
    }

    return state;
};

export const rootReducer = combineReducers({
    // gpxContent,
    ymaps,
    route,
    athlete,
    meta,
    activeMonth,
});
