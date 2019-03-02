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

const getUserCredentials = (db, sessionId) => db
    .collection(USER_CREDENTIALS)
    .find({sessionId})
    .toArray()
    .then(([credentials]) => credentials);

const removeUserCredentials = (db, sessionId) => db
    .collection(USER_CREDENTIALS)
    .deleteOne({sessionId});

const addUserCredentials = async (db, credentials) => {
    const {sessionId} = credentials;

    const existingCredentials = await getUserCredentials(db, sessionId);

    if (existingCredentials) {
        removeUserCredentials(db, sessionId);
    }

    return db.collection(USER_CREDENTIALS).insertOne(credentials);
};


const createDbApi = (database) => {
    const gpxSessionDb = database.db(DATABASE_ID);

    return {
        getSession: sessionId => getSession(gpxSessionDb, sessionId),
        addSession: session => addSession(gpxSessionDb, session),
        getUserCredentials: sessionId => getUserCredentials(gpxSessionDb, sessionId),
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
