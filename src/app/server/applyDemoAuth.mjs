import {ROUTES_IDS, getUrlByRoute} from 'router';


const redirectToIndex = ctx => ctx.redirect(getUrlByRoute({id: ROUTES_IDS.INDEX}));


export default async (koaCtx, next) => {
    const {route, session} = koaCtx.state;

    if (route.id === ROUTES_IDS.DEMO_LOGIN) {
        await koaCtx.db.updateSession(session.sessionId, {isDemo: true});

        return redirectToIndex(koaCtx);
    }

    if (route.id === ROUTES_IDS.DEMO_LOGOUT) {
        await koaCtx.db.updateSession(session.sessionId, {isDemo: false});

        return redirectToIndex(koaCtx);
    }

    return next();
};
