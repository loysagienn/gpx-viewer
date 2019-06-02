
import {getAthlete, getActivities} from 'stravaApi';
import {ERRORS} from 'stravaApi/constants';
import {isProductionMode} from 'config';
import {stringifyDateMonth} from 'helpers/date';
import unauthorizeStravaUser from './unauthorizeStravaUser';


const getYmaps = () => ({
    initialized: false,
});

const getAthleteInfo = async (credentials, db, ignoreCache) => {
    const {athleteId} = credentials;

    // кэшируем в базе для тестирования, придумать решение получше, это отстой
    if (!ignoreCache && !isProductionMode) {
        const {info: athleteInfo} = (await db.getAthleteInfo(athleteId)) || {};

        if (athleteInfo) {
            return athleteInfo;
        }
    }

    const info = await getAthlete(credentials);

    if (!isProductionMode) {
        await db.addAthleteInfo({athleteId, info});
    }

    return info;
};

const getAthleteActivities = async (credentials, db, month, ignoreCache) => {
    const {athleteId} = credentials;

    // кэшируем в базе для тестирования, придумать решение получше, это отстой
    if (!ignoreCache && !isProductionMode) {
        const {activities: athleteActivities} = (await db.getAthleteActivities(athleteId)) || {};

        if (athleteActivities) {
            return athleteActivities;
        }
    }

    const activities = await getActivities(credentials, month);

    if (!isProductionMode) {
        await db.addAthleteActivities({athleteId, activities});
    }

    return activities;
};

const getActivitiesByMonth = async (state, db, monthCount = 1) => {
    const {stravaCredentials: credentials, route} = state;

    const date = new Date();
    const months = [];

    while (monthCount--) {
        months.push(stringifyDateMonth(date));

        date.setMonth(date.getMonth() - 1);
    }

    const activities = await Promise.all(
        months.map(month => getAthleteActivities(credentials, db, month, route.queryParams.ignoreCache)),
    );

    return activities.reduce((acc, list, index) => Object.assign(acc, {[months[index]]: list}), {});
};

const getAthleteData = async ({state, db}) => {
    const {stravaCredentials: credentials, route} = state;

    if (!credentials) {
        return null;
    }

    // const currentMonth = stringifyDateMonth(new Date());

    try {
        const [info, activities] = await Promise.all([
            getAthleteInfo(credentials, db, route.queryParams.ignoreCache),
            getActivitiesByMonth(state, db, 3),
        ]);

        return {info, activities};
    } catch (err) {
        console.log(err);

        if (err.type === ERRORS.AUTHORIZATION_ERROR) {
            await unauthorizeStravaUser(db, credentials);
        }

        return null;
    }
};

export default async (koaCtx, next) => {
    const {state, origin} = koaCtx;

    const ymaps = getYmaps();

    const {route} = state;

    const athlete = await getAthleteData(koaCtx);

    state.initialState = {
        ymaps,
        route,
        athlete,
        meta: {origin},
    };

    return next();
};
