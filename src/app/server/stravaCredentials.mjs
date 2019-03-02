

export default async (koaCtx, next) => {
    const {session} = koaCtx.state;

    const stravaCredentials = await koaCtx.db.getUserCredentials(session.sessionId);

    if (!stravaCredentials) {
        return next();
    }

    koaCtx.state.stravaCredentials = stravaCredentials;

    return next();
};
