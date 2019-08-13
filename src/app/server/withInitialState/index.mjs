import {ERRORS} from 'stravaApi/constants';
import log from 'logger';
import removeAthleteCredentials from '../strava/removeAthleteCredentials';
import getActivitiesData from './getActivitiesData';


const getYmaps = () => ({
    initialized: false,
});


const getAthleteData = async (koaCtx) => {
    const {state, api, db} = koaCtx;
    const {stravaCredentials: credentials, route} = state;

    if (!credentials) {
        return {};
    }

    try {
        const [info, activities] = await Promise.all([
            api.getAthleteInfo(credentials, route.queryParams.ignoreCache),
            getActivitiesData(koaCtx),
        ]);

        const {activitiesSummary, activitiesByMonth} = activities;

        return {info, activitiesSummary, activitiesByMonth};
    } catch (error) {
        log.getAthleteDataError({error});

        if (error.type === ERRORS.AUTHORIZATION_ERROR) {
            await removeAthleteCredentials(db, credentials);
            return {};
        }

        throw error;
    }
};

const withInitialState = async (koaCtx, next) => {
    const {state, origin} = koaCtx;

    const ymaps = getYmaps();

    const {route, session} = state;

    const {info, activitiesSummary, activitiesByMonth} = await getAthleteData(koaCtx);

    state.initialState = {
        ymaps,
        route,
        isDemo: session.isDemo,
        athlete: info,
        activitiesSummary,
        activitiesByMonth,
        meta: {origin},
    };

    return next();
};


export default withInitialState;
