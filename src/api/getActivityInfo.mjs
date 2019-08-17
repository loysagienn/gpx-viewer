import {getActivityInfo as getActivity, getTrack} from 'stravaApi';
import log from 'logger';


const cacheActivityInfo = (db, activityInfo) => db.addActivityInfo(activityInfo)
    .catch(error => log.cacheActivityInfoError({error}));

const getActivityFromApi = async (credentials, activityId) => {
    const [activityInfo, activityTrack] = await Promise.all([
        getActivity(credentials, activityId),
        getTrack(credentials, activityId),
    ]);

    activityInfo.track = activityTrack;

    return activityInfo;
};

const getActivityInfo = async (db, credentials, activityId, ignoreCache) => {
    if (!ignoreCache) {
        const activityInfo = await db.getActivityInfo(activityId);

        if (activityInfo) {
            return activityInfo;
        }
    }

    const activityInfo = await getActivityFromApi(credentials, activityId);

    cacheActivityInfo(db, activityInfo);

    return activityInfo;
};


export default getActivityInfo;
