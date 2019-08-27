import {generateRandomString} from 'helpers';
import {DOMAIN, SESSION_ID_COOKIE_NAME} from 'config';


const SESSION_ID_LENGTH = 32;
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days

const createSession = koaCtx => ({
    sessionId: generateRandomString(SESSION_ID_LENGTH),
    userAgent: koaCtx.headers['user-agent'],
    timestamp: Date.now(),
});

const getSession = async (koaCtx) => {
    const {cookies} = koaCtx;

    const sessionId = cookies.get(SESSION_ID_COOKIE_NAME);

    if (sessionId) {
        const session = await koaCtx.db.getSession(sessionId);

        if (session) {
            return session;
        }
    }

    const session = createSession(koaCtx);

    // todo: error handling
    await koaCtx.db.addSession(session);

    cookies.set(
        SESSION_ID_COOKIE_NAME,
        session.sessionId,
        {domain: DOMAIN, maxAge: COOKIE_MAX_AGE},
    );

    return session;
};


const withSession = async (koaCtx, next) => {
    const session = await getSession(koaCtx);

    koaCtx.state.session = session;

    const result = await next();

    return result;
};

export default withSession;
