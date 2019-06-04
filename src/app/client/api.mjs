
import {ROUTES_IDS, getUrlByRoute} from 'router';

const makeRequest = route => fetch(getUrlByRoute(route), {credentials: 'include'}).then(result => result.json());

const getAthleteActivities = monthKey => makeRequest({id: ROUTES_IDS.API_GET_ACTIVITIES, params: {monthKey}});

export default {
    getAthleteActivities,
};
