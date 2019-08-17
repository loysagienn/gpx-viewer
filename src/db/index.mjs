// @flow

import mongodb from 'mongodb';
import {dbUrl} from 'config';
import {DATABASE_ID} from './constants';
import {getSession, addSession, updateSession} from './session';
import {getAthleteCredentials, removeAthleteCredentials, addAthleteCredentials} from './athleteCredentials';
import {getAthleteInfo, removeAthleteInfo, addAthleteInfo} from './athleteInfo';
import {getAthleteActivities, removeAthleteActivities, addAthleteActivities} from './athleteActivities';
import {getActivityInfo, addActivityInfo, removeActivityInfo} from './activityInfo';
import {logInfo, logError} from './logs';

const {MongoClient} = mongodb;

let dbApi = null;

const createDbApi = (database) => {
    const gpxDb = database.db(DATABASE_ID);

    return {
        getSession: sessionId => getSession(gpxDb, sessionId),
        addSession: session => addSession(gpxDb, session),
        updateSession: (sessionId, update) => updateSession(gpxDb, sessionId, update),

        getAthleteCredentials: athleteId => getAthleteCredentials(gpxDb, athleteId),
        addAthleteCredentials: credentials => addAthleteCredentials(gpxDb, credentials),
        removeAthleteCredentials: athleteId => removeAthleteCredentials(gpxDb, athleteId),

        addAthleteInfo: athleteInfo => addAthleteInfo(gpxDb, athleteInfo),
        getAthleteInfo: athleteId => getAthleteInfo(gpxDb, athleteId),
        removeAthleteInfo: athleteId => removeAthleteInfo(gpxDb, athleteId),

        addActivityInfo: activityInfo => addActivityInfo(gpxDb, activityInfo),
        getActivityInfo: activityId => getActivityInfo(gpxDb, activityId),
        removeActivityInfo: activityId => removeActivityInfo(gpxDb, activityId),

        addAthleteActivities: athleteActivities => addAthleteActivities(gpxDb, athleteActivities),
        getAthleteActivities: (athleteId, monthKey) => getAthleteActivities(gpxDb, athleteId, monthKey),
        removeAthleteActivities: (athleteId, monthKey) => removeAthleteActivities(gpxDb, athleteId, monthKey),

        logInfo: data => logInfo(gpxDb, data),
        logError: data => logError(gpxDb, data),
    };
};

export const getDb = async (): Promise<DatabaseT> => {
    if (!dbApi) {
        const database = await MongoClient.connect(dbUrl, {
            useNewUrlParser: true,
        });

        dbApi = createDbApi(database);
    }

    return dbApi;
};
