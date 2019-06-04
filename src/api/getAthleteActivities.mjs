
import {getActivities} from 'stravaApi';
import {isProductionMode} from 'config';


const getAthleteActivities = async (db, credentials, monthKey, ignoreCache) => {
    const {athleteId} = credentials;

    // кэшируем в базе для тестирования, придумать решение получше, это отстой
    if (!ignoreCache && !isProductionMode) {
        const {activities: athleteActivities} = (await db.getAthleteActivities(athleteId, monthKey)) || {};

        if (athleteActivities) {
            return athleteActivities;
        }
    }

    const activities = await getActivities(credentials, monthKey);

    if (!isProductionMode) {
        await db.addAthleteActivities({athleteId, monthKey, activities});
    }

    return activities;
};

export default getAthleteActivities;
