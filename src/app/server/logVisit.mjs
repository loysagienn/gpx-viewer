import log from 'logger';


export default async (koaCtx, next) => {
    const {athleteId, session} = koaCtx.state;
    const {sessionId, isDemo} = session;

    if (athleteId) {
        if (isDemo) {
            log.visitDemo({sessionId});
        } else {
            log.visitAthlete({athleteId, sessionId});
        }
    }

    return next();
};
