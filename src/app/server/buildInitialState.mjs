
// import fs from 'fs';
// import util from 'util';
// import path from 'path';
// import {parseGpx} from 'app/gpx';
import {getAthlete, getActivities} from 'stravaApi';
import {ERRORS} from 'stravaApi/constants';
import {isProductionMode} from 'config';
import unauthorizeStravaUser from './unauthorizeStravaUser';

// const readFile = util.promisify(fs.readFile);

// const getGpxcontent = async () => {
//     const gpxBuffer = await readFile(path.join(__dirname, '../../../static/track.gpx'));
//     const gpxString = gpxBuffer.toString();

//     return parseGpx(gpxString);
// };

const getYmaps = () => ({
    initialized: false,
});

const getAthleteInfo = async (credentials, db) => {
    const {athleteId} = credentials;

    // кэшируем в базе для тестирования, придумать решение получше, это отстой
    // if (!isProductionMode) {
    //     const {info: athleteInfo} = (await db.getAthleteInfo(athleteId)) || {};

    //     if (athleteInfo) {
    //         return athleteInfo;
    //     }
    // }

    const info = await getAthlete(credentials);

    if (!isProductionMode) {
        await db.addAthleteInfo({athleteId, info});
    }

    return info;
};

const getAthleteActivities = async (credentials, db) => {
    const {athleteId} = credentials;

    // кэшируем в базе для тестирования, придумать решение получше, это отстой
    // if (!isProductionMode) {
    //     const {activities: athleteActivities} = (await db.getAthleteActivities(athleteId)) || {};

    //     if (athleteActivities) {
    //         return athleteActivities;
    //     }
    // }

    const activities = await getActivities(credentials);

    if (!isProductionMode) {
        await db.addAthleteActivities({athleteId, activities});
    }

    return activities;
};

const getAthleteData = async ({state, db}) => {
    const {stravaCredentials: credentials} = state;

    if (!credentials) {
        return null;
    }

    try {
        const [info, activities] = await Promise.all([
            getAthleteInfo(credentials, db),
            getAthleteActivities(credentials, db),
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
    // const gpxContent = await getGpxcontent();

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
