
import {ERRORS} from 'stravaApi/constants';
import {DEFAULT_MONTH_COUNT} from 'constants';
import {isDemoRoute} from 'helpers';
import {stringifyDateMonth} from 'helpers/date';
import log from 'logger';
import removeAthleteCredentials from './strava/removeAthleteCredentials';


const getYmaps = () => ({
    initialized: false,
});

const getActivitiesByMonth = async (state, api, monthCount = DEFAULT_MONTH_COUNT) => {
    const {stravaCredentials: credentials, route} = state;

    const date = new Date();
    const months = [];

    while (monthCount--) {
        months.push(stringifyDateMonth(date));

        date.setMonth(date.getMonth() - 1);
    }

    const activities = await Promise.all(
        months.map(month => api.getAthleteActivities(credentials, month, route.queryParams.ignoreCache)),
    );

    return activities.reduce((acc, list, index) => Object.assign(acc, {[months[index]]: list}), {});
};

const getAthleteData = async ({state, db, api}) => {
    const {stravaCredentials: credentials, route} = state;

    if (!credentials) {
        return {};
    }

    try {
        const [info, activities] = await Promise.all([
            api.getAthleteInfo(credentials, route.queryParams.ignoreCache),
            getActivitiesByMonth(state, api, DEFAULT_MONTH_COUNT),
        ]);

        return {info, activities};
    } catch (error) {
        log.error({
            key: 'get-athlete-data',
            error,
        });

        if (error.type === ERRORS.AUTHORIZATION_ERROR) {
            await removeAthleteCredentials(db, credentials);
        }

        return {};
    }
};

const withInitialState = async (koaCtx, next) => {
    const {state, origin} = koaCtx;

    const ymaps = getYmaps();

    const {route} = state;

    const {info, activities} = await getAthleteData(koaCtx);

    state.initialState = {
        ymaps,
        route,
        isDemo: isDemoRoute(route),
        athlete: info,
        activities,
        meta: {origin},
    };

    return next();
};


export default withInitialState;
