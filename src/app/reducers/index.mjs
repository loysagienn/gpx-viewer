
import {combineReducers} from 'redux';
import {CHANGE_MONTH, PUSH_MONTH, ADD_ACTIVITIES} from 'app/actions';
import {DEFAULT_MONTH_COUNT} from 'constants';
import ymaps from './ymaps';

// const gpxContent = (state = {}) => state;

const getCurrentMonth = () => (new Date()).getMonth();

const route = (state = {}) => state;

const meta = (state = {}) => state;

const athlete = (state = null) => state;

const activities = (state = {}, action) => {
    if (action.type === ADD_ACTIVITIES) {
        const {monthKey, activities: activityList} = action;

        return Object.assign({}, state, {[monthKey]: activityList});
    }

    return state;
};

const activeMonth = (state = getCurrentMonth(), action) => {
    if (action.type === CHANGE_MONTH) {
        return action.month;
    }

    return state;
};

const monthCount = (state = DEFAULT_MONTH_COUNT, action) => {
    if (action.type === PUSH_MONTH) {
        return state + 1;
    }

    return state;
};

export const rootReducer = combineReducers({
    // gpxContent,
    ymaps,
    route,
    athlete,
    activities,
    meta,
    activeMonth,
    monthCount,
});
