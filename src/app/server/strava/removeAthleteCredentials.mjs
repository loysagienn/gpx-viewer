import log from 'logger';


const removeAthleteCredentials = (db, credentials) => {
    const {athleteId} = credentials;

    log.info({
        key: 'remove-athlete-credentials',
        athleteId,
    });

    return db.removeAthleteCredentials(athleteId);
};


export default removeAthleteCredentials;
