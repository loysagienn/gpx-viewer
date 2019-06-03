import {mergeRight} from 'ramda';
import {updateToken} from 'stravaApi';
import log from 'logger';
import unauthorizeStravaUser from './unauthorizeStravaUser';

const EXPIRES_SHIFT = 60; // one minute

export default async (koaCtx, next) => {
    const {session: {athleteId}} = koaCtx.state;

    if (!athleteId) {
        return next();
    }

    const credentials = await koaCtx.db.getAthleteCredentials(athleteId);

    if (!credentials) {
        return next();
    }

    const {expiresAt, refreshToken} = credentials;

    const now = Date.now() / 1000;

    if (expiresAt - EXPIRES_SHIFT > now) {
        koaCtx.state.stravaCredentials = credentials;

        return next();
    }

    let result;

    try {
        result = await updateToken(refreshToken);
    } catch (err) {
        log.error(err);

        await unauthorizeStravaUser(koaCtx.db, credentials);

        return next();
    }

    const newCredentials = mergeRight(credentials, result);

    await koaCtx.db.addAthleteCredentials(newCredentials);

    log.info('Strava credentials updated: ', newCredentials);

    koaCtx.state.stravaCredentials = newCredentials;

    return next();
};
