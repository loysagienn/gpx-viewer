
export default (db, credentials) => {
    const {athleteId} = credentials;

    console.log(`Unauthorize user ${athleteId}`);

    return db.removeAthleteCredentials(athleteId);
};
