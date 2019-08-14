
import {combineReducers} from 'redux';
import {loading, loadError} from 'constants';
import {stringifyDateDay} from 'helpers/date';
import {
    PUSH_MONTH,
    PUSH_ROUTE,
    ADD_ACTIVITIES_SUMMARY,
    LOAD_ACTIVITY_INFO,
    LOAD_ACTIVITY_INFO_DONE,
    LOAD_ACTIVITY_INFO_FAIL,
} from 'app/actions';
import ymaps from './ymaps';


const route = (state = {}, action) => {
    if (action.type === PUSH_ROUTE) {
        return action.route;
    }

    return state;
};

const meta = (state = {}) => state;

const athlete = (state = null) => state;

const activitiesSummary = (state = {}, action) => {
    if (action.type === ADD_ACTIVITIES_SUMMARY) {
        const {activities: activityList} = action;

        return activityList.reduce(
            (acc, activity) => (acc[activity.id] = activity, acc),
            Object.assign({}, state),
        );
    }

    return state;
};

const activitiesInfo = (state = {}, action) => {
    if (action.type === LOAD_ACTIVITY_INFO) {
        return Object.assign({}, state, {
            [action.activityId]: {[loading]: true},
        });
    }

    if (action.type === LOAD_ACTIVITY_INFO_DONE) {
        return Object.assign({}, state, {
            [action.activityId]: action.activityInfo,
        });
    }

    if (action.type === LOAD_ACTIVITY_INFO_FAIL) {
        return Object.assign({}, state, {
            [action.activityId]: {[loadError]: action.error || 'error'},
        });
    }

    return state;
};

const activitiesByMonth = (state = {}, action) => {
    if (action.type === ADD_ACTIVITIES_SUMMARY) {
        const {monthKey, activities: activityList} = action;

        return Object.assign({}, state, {[monthKey]: activityList.map(({id}) => id)});
    }
    return state;
};

const monthsKeys = (state = [], action) => {
    if (action.type === PUSH_MONTH) {
        return state.concat(action.monthKey);
    }

    return state;
};

const todayKey = (state = stringifyDateDay(new Date())) => state;

const isDemo = (state = false) => state;


export const rootReducer = combineReducers({
    ymaps,
    route,
    athlete,
    activitiesSummary,
    activitiesInfo,
    activitiesByMonth,
    meta,
    monthsKeys,
    todayKey,
    isDemo,
});
