// @flow

import mongodb from 'mongodb';
import {dbUrl} from 'config';
import {DATABASE_ID} from './constants';
import {getSession, addSession, updateSession} from './session';
import {getAthleteCredentials, removeAthleteCredentials, addAthleteCredentials} from './athleteCredentials';
import {getAthleteInfo, removeAthleteInfo, addAthleteInfo} from './athleteInfo';
import {getAthleteActivities, removeAthleteActivities, addAthleteActivities} from './athleteActivities';

const {MongoClient} = mongodb;

let dbApi = null;

const createDbApi = (database) => {
    const gpxSessionDb = database.db(DATABASE_ID);

    return {
        getSession: sessionId => getSession(gpxSessionDb, sessionId),
        addSession: session => addSession(gpxSessionDb, session),
        updateSession: (sessionId, update) => updateSession(gpxSessionDb, sessionId, update),

        getAthleteCredentials: athleteId => getAthleteCredentials(gpxSessionDb, athleteId),
        addAthleteCredentials: credentials => addAthleteCredentials(gpxSessionDb, credentials),
        removeAthleteCredentials: athleteId => removeAthleteCredentials(gpxSessionDb, athleteId),

        addAthleteInfo: athleteInfo => addAthleteInfo(gpxSessionDb, athleteInfo),
        getAthleteInfo: athleteId => getAthleteInfo(gpxSessionDb, athleteId),
        removeAthleteInfo: athleteId => removeAthleteInfo(gpxSessionDb, athleteId),

        addAthleteActivities: athleteActivities => addAthleteActivities(gpxSessionDb, athleteActivities),
        getAthleteActivities: (athleteId, monthKey) => getAthleteActivities(gpxSessionDb, athleteId, monthKey),
        removeAthleteActivities: (athleteId, monthKey) => removeAthleteActivities(gpxSessionDb, athleteId, monthKey),
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
