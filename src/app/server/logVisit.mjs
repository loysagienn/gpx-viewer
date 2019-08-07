import log from 'logger';
import {isDemoRoute} from 'helpers';


export default async (koaCtx, next) => {
    console.log(koaCtx.state);
    const {athleteId, route, session} = koaCtx.state;
    const {sessionId} = session;

    if (athleteId) {
        if (isDemoRoute(route)) {
            log.info({
                key: 'visit-demo',
                sessionId,
            });
        } else {
            log.info({
                key: 'visit-athlete',
                athleteId,
                sessionId,
            });
        }
    }

    return next();
};
