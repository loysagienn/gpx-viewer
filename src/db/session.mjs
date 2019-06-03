
import {SESSION_COLLECTION} from './constants';

export const getSession = (db, sessionId) => db
    .collection(SESSION_COLLECTION)
    .find({sessionId})
    .toArray()
    .then(([session]) => session);

export const addSession = async (db, session) => {
    const existingSession = await getSession(db, session.sessionId);

    if (existingSession) {
        throw new Error(`Session with id "${session.sessionId}" already exists`);
    }

    return db.collection(SESSION_COLLECTION).insertOne(session);
};

export const updateSession = async (db, sessionId, update) => db
    .collection(SESSION_COLLECTION)
    .updateOne({sessionId}, {$set: update});
