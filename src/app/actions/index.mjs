import log from 'logger';


import {stringifyDateMonth} from 'helpers/date';

export const INIT_YMAPS = 'INIT_YMAPS';

export const initYmaps = ymaps => ({
    type: 'INIT_YMAPS',
    ymaps,
});

export const SHOW_DAY = 'SHOW_DAY';

export const showDay = dayKey => (dispatch, getState) => {
    const {activeDayKey} = getState();

    if (activeDayKey === dayKey) {
        return;
    }

    dispatch({
        type: SHOW_DAY,
        dayKey,
    });
};

export const ADD_ACTIVITIES = 'ADD_ACTIVITIES';

export const addActivities = (monthKey, activities) => ({
    type: ADD_ACTIVITIES,
    monthKey,
    activities,
});

export const PUSH_MONTH = 'PUSH_MONTH';

export const pushMonth = () => async (dispatch, getState, api) => {
    dispatch({type: PUSH_MONTH});

    const {monthCount} = getState();

    const date = new Date();

    const offset = monthCount - 1;

    date.setMonth(date.getMonth() - offset);

    const monthKey = stringifyDateMonth(date);

    const {result, error} = await api.getAthleteActivities(monthKey);

    if (error) {
        log.error(error);
    } else if (result) {
        dispatch(addActivities(monthKey, result));
    }
};
