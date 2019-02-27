// @flow

import mongodb from 'mongodb';
import {dbUrl} from 'config';

const {MongoClient} = mongodb;

let dbApi = null;

const DATABASE_ID = 'gpx-viewer';
const SESSION_COLLECTION = 'sessions';

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

    db.collection(SESSION_COLLECTION).insertOne(session);
};

const createDbApi = (database) => {
    const gpxSessionDb = database.db(DATABASE_ID);

    return {
        getSession: sessionId => getSession(gpxSessionDb, sessionId),
        addSession: session => addSession(gpxSessionDb, session),
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
