
import {ERRORS} from 'stravaApi/constants';
import {DEFAULT_MONTH_COUNT} from 'constants';
import {stringifyDateMonth} from 'helpers/date';
import log from 'logger';
import unauthorizeStravaUser from './unauthorizeStravaUser';


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
    } catch (err) {
        log.error(err);

        if (err.type === ERRORS.AUTHORIZATION_ERROR) {
            await unauthorizeStravaUser(db, credentials);
        }

        return {};
    }
};

export default async (koaCtx, next) => {
    const {state, origin} = koaCtx;

    const ymaps = getYmaps();

    const {route} = state;

    const {info, activities} = await getAthleteData(koaCtx);

    state.initialState = {
        ymaps,
        route,
        athlete: info,
        activities,
        meta: {origin},
    };

    return next();
};
