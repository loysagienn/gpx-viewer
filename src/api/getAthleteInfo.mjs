
import {getAthlete} from 'stravaApi';
import {isProductionMode} from 'config';


const getAthleteInfo = async (db, credentials, ignoreCache) => {
    const {athleteId} = credentials;

    if (!ignoreCache && !isProductionMode) {
        const {info: athleteInfo} = (await db.getAthleteInfo(athleteId)) || {};

        if (athleteInfo) {
            return athleteInfo;
        }
    }

    const info = await getAthlete(credentials);

    if (!isProductionMode) {
        await db.addAthleteInfo({athleteId, info});
    }

    return info;
};

export default getAthleteInfo;
