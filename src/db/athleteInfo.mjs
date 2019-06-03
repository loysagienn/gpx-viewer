
import {ATHLETE_INFO_COLLECTION} from './constants';

export const getAthleteInfo = (db, athleteId) => db
    .collection(ATHLETE_INFO_COLLECTION)
    .find({athleteId})
    .toArray()
    .then(([athleteInfo]) => athleteInfo);

export const removeAthleteInfo = (db, athleteId) => db
    .collection(ATHLETE_INFO_COLLECTION)
    .deleteOne({athleteId});

export const addAthleteInfo = async (db, athleteInfo) => {
    const {athleteId} = athleteInfo;

    const exsistingInfo = await getAthleteInfo(db, athleteId);

    if (exsistingInfo) {
        await removeAthleteInfo(db, athleteId);
    }

    return db.collection(ATHLETE_INFO_COLLECTION).insertOne(athleteInfo);
};
