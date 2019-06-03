import log from 'logger';

export default (db, credentials) => {
    const {athleteId} = credentials;

    log.info(`Unauthorize user ${athleteId}`);

    return db.removeAthleteCredentials(athleteId);
};
