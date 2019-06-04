
import getAthleteActivities from './getAthleteActivities';
import getAthleteInfo from './getAthleteInfo';

export const getApi = db => ({
    getAthleteActivities: (...args) => getAthleteActivities(db, ...args),
    getAthleteInfo: (...args) => getAthleteInfo(db, ...args),
});
