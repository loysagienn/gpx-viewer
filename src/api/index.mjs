
import getAthleteActivities from './getAthleteActivities';
import getAthleteInfo from './getAthleteInfo';
import clientLog from './clientLog';

export const getApi = db => ({
    getAthleteActivities: (...args) => getAthleteActivities(db, ...args),
    getAthleteInfo: (...args) => getAthleteInfo(db, ...args),
    clientLog: (...args) => clientLog(db, ...args),
});
