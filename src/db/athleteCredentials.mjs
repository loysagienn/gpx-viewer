
import {ATHLETE_CREDENTIALS_COLLECTION} from './constants';

export const getAthleteCredentials = (db, athleteId) => db
    .collection(ATHLETE_CREDENTIALS_COLLECTION)
    .find({athleteId})
    .toArray()
    .then(([credentials]) => credentials);

export const removeAthleteCredentials = (db, athleteId) => db
    .collection(ATHLETE_CREDENTIALS_COLLECTION)
    .deleteOne({athleteId});

export const addAthleteCredentials = async (db, credentials) => {
    const {athleteId} = credentials;

    const existingCredentials = await getAthleteCredentials(db, athleteId);

    if (existingCredentials) {
        await removeAthleteCredentials(db, athleteId);
    }

    return db.collection(ATHLETE_CREDENTIALS_COLLECTION).insertOne(credentials);
};
