import {getActivityInfo as getActivity} from 'stravaApi';


const getActivityInfo = async (db, credentials, activityId) => {
    const activityInfo = await getActivity(credentials, activityId);

    return activityInfo;
};


export default getActivityInfo;
