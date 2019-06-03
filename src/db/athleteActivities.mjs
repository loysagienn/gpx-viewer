
import {ATHLETE_ACTIVITIES_COLLECTION} from './constants';

export const getAthleteActivities = (db, athleteId, monthKey) => db
    .collection(ATHLETE_ACTIVITIES_COLLECTION)
    .find({athleteId, monthKey})
    .toArray()
    .then(([athleteActivities]) => athleteActivities);

export const removeAthleteActivities = (db, athleteId, monthKey) => db
    .collection(ATHLETE_ACTIVITIES_COLLECTION)
    .deleteOne({athleteId, monthKey});

export const addAthleteActivities = async (db, athleteActivities) => {
    const {athleteId, monthKey} = athleteActivities;

    const exsistingActivities = await getAthleteActivities(db, athleteId, monthKey);

    if (exsistingActivities) {
        await removeAthleteActivities(db, athleteId, monthKey);
    }

    return db.collection(ATHLETE_ACTIVITIES_COLLECTION).insertOne(athleteActivities);
};
