import {ROUTES_IDS, getUrlByRoute} from 'router';
import {deauthorize} from 'stravaApi';
import {demoAthleteId} from 'config';
import removeAthleteCredentials from './removeAthleteCredentials';


const redirectToIndex = ctx => ctx.redirect(getUrlByRoute({id: ROUTES_IDS.INDEX}));

const clearAthleteIdFromSession = (koaCtx, sessionId) => koaCtx.db.updateSession(sessionId, {athleteId: null});


export default async (koaCtx, next) => {
    const {route, stravaCredentials, session: {sessionId}, athleteId} = koaCtx.state;

    if (route.id === ROUTES_IDS.STRAVA_UNAUTH) {
        if (stravaCredentials) {
            // демо режим не ломаем :)
            if (athleteId !== demoAthleteId) {
                // закрываем доступ у стравы, сносим учетные данные и athleteId из сессии
                await deauthorize(stravaCredentials);
                await removeAthleteCredentials(koaCtx.db, stravaCredentials);
            }

            await clearAthleteIdFromSession(koaCtx, sessionId);
        }

        return redirectToIndex(koaCtx);
    }

    if (route.id === ROUTES_IDS.LOGOUT) {
        if (stravaCredentials) {
            // на логаут просто сносим athleteId из сессии
            await clearAthleteIdFromSession(koaCtx, sessionId);
        }

        return redirectToIndex(koaCtx);
    }

    return next();
};
