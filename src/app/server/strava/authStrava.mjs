
import {ROUTES_IDS, getUrlByRoute} from 'router';
import {authorize} from 'stravaApi';
import log from 'logger';


const redirectToIndex = ctx => ctx.redirect(getUrlByRoute({id: ROUTES_IDS.INDEX}));

const auth = async (koaCtx, sessionId, code, scope) => {
    const {tokenType, accessToken, athlete, refreshToken, expiresAt} = await authorize(code);

    const {id: athleteId} = athlete;

    return Promise.all([
        koaCtx.db.addAthleteCredentials({athleteId, tokenType, accessToken, refreshToken, expiresAt, scope}),
        koaCtx.db.updateSession(sessionId, {athleteId}),
    ]);
};

const authStrava = async (koaCtx, next) => {
    const {route, session: {sessionId}} = koaCtx.state;

    if (route.id !== ROUTES_IDS.STRAVA_AUTH) {
        return next();
    }

    const {queryParams: {code, error, scope: scopeStr}} = route;

    if (error) {
        log.error({
            key: 'error-from-strava-auth',
            error,
        });

        return redirectToIndex(koaCtx);
    }

    const scope = scopeStr.split(',');

    try {
        await auth(koaCtx, sessionId, code, scope);
    } catch (err) {
        log.error({
            key: 'strava-auth-request',
            error: err,
        });
    }

    return redirectToIndex(koaCtx);
};

export default authStrava;
