import log from 'logger';


export default async (koaCtx, next) => {
    const {athleteId, session} = koaCtx.state;
    const {sessionId, isDemo} = session;

    if (athleteId) {
        if (isDemo) {
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
