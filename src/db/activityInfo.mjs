
import {ACTIVITIES_INFO_COLLECTION} from './constants';

export const getActivityInfo = (db, id) => db
    .collection(ACTIVITIES_INFO_COLLECTION)
    .find({id})
    .toArray()
    .then(([activityInfo]) => activityInfo);

export const removeActivityInfo = (db, id) => db
    .collection(ACTIVITIES_INFO_COLLECTION)
    .deleteOne({id});

export const addActivityInfo = async (db, activityInfo) => {
    const {id} = activityInfo;

    const exsistingInfo = await getActivityInfo(db, id);

    if (exsistingInfo) {
        await removeActivityInfo(db, id);
    }

    return db.collection(ACTIVITIES_INFO_COLLECTION).insertOne(activityInfo);
};
