import log from 'logger';
import getSession from './getSession';


export default async (koaCtx, next) => {
    const session = await getSession(koaCtx);

    koaCtx.state.session = session;

    log.info('\n-------------------- start request handle --------------------');
    log.info(`session id: ${session.sessionId}`);

    const result = await next();

    log.info('--------------------- end request handle ---------------------\n');

    return result;
};
