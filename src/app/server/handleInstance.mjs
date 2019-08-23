import {instanceId, DOMAIN} from 'config';


const INSTANCE_ID_COOKIE_NAME = 'instance_id';
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24; // 24 hours


const handleInstance = (koaCtx, next) => {
    const {cookies} = koaCtx;

    if (cookies.get(INSTANCE_ID_COOKIE_NAME) === instanceId) {
        return next();
    }

    cookies.set(
        INSTANCE_ID_COOKIE_NAME,
        instanceId,
        {domain: DOMAIN, maxAge: COOKIE_MAX_AGE},
    );

    return next();
};


export default handleInstance;
