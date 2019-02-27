import getSession from './getSession';


export default async (koaCtx, next) => {
    const session = await getSession(koaCtx);

    koaCtx.state.session = session;

    console.log('\n-------------------- start request handle --------------------');
    console.log(`session id: ${session.sessionId}`);

    const result = await next();

    console.log('--------------------- end request handle ---------------------\n');

    return result;
};
