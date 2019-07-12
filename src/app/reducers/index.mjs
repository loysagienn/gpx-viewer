
import {combineReducers} from 'redux';
import {stringifyDateDay} from 'helpers/date';
import {SHOW_DAY, PUSH_MONTH, ADD_ACTIVITIES} from 'app/actions';
import {DEFAULT_MONTH_COUNT} from 'constants';
import ymaps from './ymaps';


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

const activeDayKey = (state = null, action) => {
    if (action.type === SHOW_DAY) {
        return action.dayKey;
    }

    return state;
};

const monthCount = (state = DEFAULT_MONTH_COUNT, action) => {
    if (action.type === PUSH_MONTH) {
        return state + 1;
    }

    return state;
};

const todayKey = (state = stringifyDateDay(new Date())) => state;

export const rootReducer = combineReducers({
    ymaps,
    route,
    athlete,
    activities,
    meta,
    activeDayKey,
    monthCount,
    todayKey,
});
