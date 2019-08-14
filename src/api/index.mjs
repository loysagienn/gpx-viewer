import getAthleteActivities from './getAthleteActivities';
import getAthleteInfo from './getAthleteInfo';
import getActivityInfo from './getActivityInfo';
import clientLog from './clientLog';

export const getApi = db => ({
    getAthleteActivities: (...args) => getAthleteActivities(db, ...args),
    getAthleteInfo: (...args) => getAthleteInfo(db, ...args),
    clientLog: (...args) => clientLog(db, ...args),
    getActivityInfo: (...args) => getActivityInfo(db, ...args),
});
