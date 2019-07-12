import {ROUTES_IDS, getUrlByRoute} from 'router';
import {deauthorize} from 'stravaApi';
import removeAthleteCredentials from './removeAthleteCredentials';


const redirectToIndex = ctx => ctx.redirect(getUrlByRoute({id: ROUTES_IDS.INDEX}));


export default async (koaCtx, next) => {
    if (koaCtx.state.route.id !== ROUTES_IDS.STRAVA_UNAUTH) {
        return next();
    }

    const {stravaCredentials} = koaCtx.state;

    await deauthorize(stravaCredentials);
    await removeAthleteCredentials(koaCtx.db, stravaCredentials);

    return redirectToIndex(koaCtx);
};
