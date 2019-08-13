import log from 'logger';

export default async (ctx, next) => {
    const startTime = Date.now();

    const result = await next();

    const processTime = Date.now() - startTime;

    log.requestTiming({
        url: `${ctx.host}${ctx.url}`,
        time: processTime,
    });

    return result;
};
