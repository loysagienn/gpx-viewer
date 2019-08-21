import {ROUTES_IDS} from 'router';
import getActivitiesSummary from './getActivitiesSummary';
import assignState from './assignState';


const addAthlete = async (api, credentials, route, initialState) => {
    const athlete = await api.getAthleteInfo(credentials, route.queryParams.ignoreCache);

    assignState(initialState, {athlete});

    return initialState;
};

const addActivitiesSummary = async (api, credentials, route, initialState) => {
    if (route.id !== ROUTES_IDS.INDEX) {
        return initialState;
    }

    const {activitiesSummary, activitiesByMonth, monthsKeys} = await getActivitiesSummary(api, credentials, route);

    return assignState(initialState, {activitiesSummary, activitiesByMonth, monthsKeys});
};

const addActivitiesInfo = async (api, credentials, route, initialState) => {
    if (route.id !== ROUTES_IDS.ACTIVITY) {
        return initialState;
    }

    const {activityId} = route.params;

    const activityInfo = await api.getActivityInfo(credentials, activityId, route.queryParams.ignoreCache);

    const activitiesInfo = {[activityId]: activityInfo};

    return assignState(initialState, {activitiesInfo});
};

const addAthleteData = async (koaCtx, initialState) => {
    const {state, api} = koaCtx;
    const {stravaCredentials: credentials, route} = state;

    if (!credentials) {
        return initialState;
    }

    await Promise.all([
        addAthlete(api, credentials, route, initialState),
        addActivitiesSummary(api, credentials, route, initialState),
        addActivitiesInfo(api, credentials, route, initialState),
    ]);

    return initialState;
};

export default addAthleteData;
