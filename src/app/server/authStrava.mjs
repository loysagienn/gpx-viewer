
import {ROUTES_IDS, getUrlByRoute} from 'router';
import {authorize} from 'stravaApi';


const redirectToIndex = ctx => ctx.redirect(getUrlByRoute({id: ROUTES_IDS.INDEX}));

const auth = async (koaCtx, sessionId, code, scope) => {
    const {tokenType, accessToken, athlete, refreshToken, expiresAt} = await authorize(code);

    const {id: athleteId} = athlete;

    return Promise.all([
        koaCtx.db.addUserCredentials({athleteId, tokenType, accessToken, refreshToken, expiresAt, scope}),
        koaCtx.db.updateSession(sessionId, {athleteId}),
    ]);
};

export default async (koaCtx, next) => {
    const {route, session: {sessionId}} = koaCtx.state;

    if (route.id !== ROUTES_IDS.STRAVA_AUTH) {
        return next();
    }

    const {queryParams: {code, error, scope: scopeStr}} = route;

    if (error) {
        console.log('strava auth error:', error);

        return redirectToIndex(koaCtx);
    }

    const scope = scopeStr.split(',');

    try {
        await auth(koaCtx, sessionId, code, scope);
    } catch (err) {
        console.log('strava oauth failed: ', err);
    }

    return redirectToIndex(koaCtx);
};
