
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
        const {activities: activityList} = action;

        return activityList.reduce(
            (acc, activity) => (acc[activity.id] = activity, acc),
            Object.assign({}, state),
        );
    }

    return state;
};

const activitiesByMonth = (state = {}, action) => {
    if (action.type === ADD_ACTIVITIES) {
        const {monthKey, activities: activityList} = action;

        return Object.assign({}, state, {[monthKey]: activityList.map(({id}) => id)});
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

const isDemo = (state = false) => state;


export const rootReducer = combineReducers({
    ymaps,
    route,
    athlete,
    activities,
    activitiesByMonth,
    meta,
    activeDayKey,
    monthCount,
    todayKey,
    isDemo,
});
