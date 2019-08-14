import log from 'logger';

import {stringifyDateMonth, getDateFromMonthKey} from 'helpers/date';
import {selectLastMonthKey} from '../selectors';
import {addActivitiesSummary} from './activities';


export const PUSH_MONTH = 'PUSH_MONTH';


export const pushMonth = () => async (dispatch, getState, api) => {
    const {athlete} = getState();
    const lastMonthKey = selectLastMonthKey(getState());

    let date;

    if (lastMonthKey) {
        date = getDateFromMonthKey(lastMonthKey);

        date.setMonth(date.getMonth() - 1);
    } else {
        date = new Date();
    }

    const monthKey = stringifyDateMonth(date);

    dispatch({type: PUSH_MONTH, monthKey});

    log.loadMonthActivities({
        athleteId: athlete.id,
        monthKey,
    });

    return api.getAthleteActivities(monthKey)
        .then(result => dispatch(addActivitiesSummary(monthKey, result)))
        .catch(error => log.getAthleteActivitiesError({error}));
};
