import log from 'logger';


const removeAthleteCredentials = (db, credentials) => {
    const {athleteId} = credentials;

    log.removeAthleteCredentials({athleteId});

    return db.removeAthleteCredentials(athleteId);
};


export default removeAthleteCredentials;
