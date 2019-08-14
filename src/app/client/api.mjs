
import {ROUTES_IDS, getUrlByRoute} from 'router';

const makeRequest = route => fetch(getUrlByRoute(route), {credentials: 'include'})
    .then(result => result.json())
    .then(({result, error}) => {
        if (error) {
            throw error;
        }

        return result;
    });

const getAthleteActivities = monthKey => makeRequest(
    {id: ROUTES_IDS.API_GET_ACTIVITIES, params: {monthKey}},
);

const getActivityInfo = activityId => makeRequest(
    {id: ROUTES_IDS.API_GET_ACTIVITY_INFO, params: {activityId}},
);

export default {
    getAthleteActivities,
    getActivityInfo,
};
