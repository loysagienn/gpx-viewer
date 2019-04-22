// @flow

import mongodb from 'mongodb';
import {dbUrl} from 'config';

const {MongoClient} = mongodb;

let dbApi = null;

const DATABASE_ID = 'gpx-viewer';
const SESSION_COLLECTION = 'sessions';
const USER_CREDENTIALS = 'user-credentials';
const ATHLETE_INFO = 'athlete-info';
const ATHLETE_ACTIVITIES = 'athlete-activities';

const getSession = (db, sessionId) => db
    .collection(SESSION_COLLECTION)
    .find({sessionId})
    .toArray()
    .then(([session]) => session);

const addSession = async (db, session) => {
    const existingSession = await getSession(db, session.sessionId);

    if (existingSession) {
        throw new Error(`Session with id "${session.sessionId}" already exists`);
    }

    return db.collection(SESSION_COLLECTION).insertOne(session);
};

const updateSession = async (db, sessionId, update) => db
    .collection(SESSION_COLLECTION)
    .updateOne({sessionId}, {$set: update});

const getUserCredentials = (db, athleteId) => db
    .collection(USER_CREDENTIALS)
    .find({athleteId})
    .toArray()
    .then(([credentials]) => credentials);

const removeAthleteCredentials = (db, athleteId) => db
    .collection(USER_CREDENTIALS)
    .deleteOne({athleteId});

const addUserCredentials = async (db, credentials) => {
    const {athleteId} = credentials;

    const existingCredentials = await getUserCredentials(db, athleteId);

    if (existingCredentials) {
        await removeAthleteCredentials(db, athleteId);
    }

    return db.collection(USER_CREDENTIALS).insertOne(credentials);
};

const getAthleteInfo = (db, athleteId) => db
    .collection(ATHLETE_INFO)
    .find({athleteId})
    .toArray()
    .then(([athleteInfo]) => athleteInfo);

const removeAthleteInfo = (db, athleteId) => db
    .collection(ATHLETE_INFO)
    .deleteOne({athleteId});

const addAthleteInfo = async (db, athleteInfo) => {
    const {athleteId} = athleteInfo;

    const exsistingInfo = await getAthleteInfo(db, athleteId);

    if (exsistingInfo) {
        await removeAthleteInfo(db, athleteId);
    }

    return db.collection(ATHLETE_INFO).insertOne(athleteInfo);
};

const getAthleteActivities = (db, athleteId) => db
    .collection(ATHLETE_ACTIVITIES)
    .find({athleteId})
    .toArray()
    .then(([athleteActivities]) => athleteActivities);

const removeAthleteActivities = (db, athleteId) => db
    .collection(ATHLETE_ACTIVITIES)
    .deleteOne({athleteId});

const addAthleteActivities = async (db, athleteActivities) => {
    const {athleteId} = athleteActivities;

    const exsistingActivities = await getAthleteActivities(db, athleteId);

    if (exsistingActivities) {
        await removeAthleteActivities(db, athleteId);
    }

    return db.collection(ATHLETE_ACTIVITIES).insertOne(athleteActivities);
};


const createDbApi = (database) => {
    const gpxSessionDb = database.db(DATABASE_ID);

    return {
        getSession: sessionId => getSession(gpxSessionDb, sessionId),
        addSession: session => addSession(gpxSessionDb, session),
        updateSession: (sessionId, update) => updateSession(gpxSessionDb, sessionId, update),
        getUserCredentials: athleteId => getUserCredentials(gpxSessionDb, athleteId),
        addUserCredentials: credentials => addUserCredentials(gpxSessionDb, credentials),
        removeAthleteCredentials: athleteId => removeAthleteCredentials(gpxSessionDb, athleteId),

        addAthleteInfo: athleteInfo => addAthleteInfo(gpxSessionDb, athleteInfo),
        getAthleteInfo: athleteId => getAthleteInfo(gpxSessionDb, athleteId),
        removeAthleteInfo: athleteId => removeAthleteInfo(gpxSessionDb, athleteId),

        addAthleteActivities: athleteActivities => addAthleteActivities(gpxSessionDb, athleteActivities),
        getAthleteActivities: athleteId => getAthleteActivities(gpxSessionDb, athleteId),
        removeAthleteActivities: athleteId => removeAthleteActivities(gpxSessionDb, athleteId),
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
