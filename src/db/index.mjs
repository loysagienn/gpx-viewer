// @flow

import mongodb from 'mongodb';
import {dbUrl} from 'config';

const {MongoClient} = mongodb;

let dbApi = null;

const DATABASE_ID = 'gpx-viewer';
const SESSION_COLLECTION = 'sessions';
const USER_CREDENTIALS = 'user-credentials';

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

const removeUserCredentials = (db, athleteId) => db
    .collection(USER_CREDENTIALS)
    .deleteOne({athleteId});

const addUserCredentials = async (db, credentials) => {
    const {athleteId} = credentials;

    const existingCredentials = await getUserCredentials(db, athleteId);

    if (existingCredentials) {
        removeUserCredentials(db, athleteId);
    }

    return db.collection(USER_CREDENTIALS).insertOne(credentials);
};


const createDbApi = (database) => {
    const gpxSessionDb = database.db(DATABASE_ID);

    return {
        getSession: sessionId => getSession(gpxSessionDb, sessionId),
        addSession: session => addSession(gpxSessionDb, session),
        updateSession: (sessionId, update) => updateSession(gpxSessionDb, sessionId, update),
        getUserCredentials: athleteId => getUserCredentials(gpxSessionDb, athleteId),
        addUserCredentials: credentials => addUserCredentials(gpxSessionDb, credentials),
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
