import getActivitiesSummary from './getActivitiesSummary';
import assignState from './assignState';


const addAthlete = async (api, credentials, route, initialState) => {
    const athlete = await api.getAthleteInfo(credentials, route.queryParams.ignoreCache);

    assignState(initialState, {athlete});

    return initialState;
};

const addActivitiesSummary = async (api, credentials, route, initialState) => {
    const {activitiesSummary, activitiesByMonth} = await getActivitiesSummary(api, credentials, route);

    return assignState(initialState, {activitiesSummary, activitiesByMonth});
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
    ]);

    return initialState;
};

export default addAthleteData;
