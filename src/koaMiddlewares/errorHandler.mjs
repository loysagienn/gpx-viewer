import log from 'logger';

const errorHandler = async (ctx, next) => {
    try {
        const result = await next();

        return result;
    } catch (error) {
        if (error instanceof Error) {
            log.globalHandlerError({
                message: error.message,
                stack: error.stack,
            });
        } else {
            log.globalHandlerError({error});
        }

        ctx.status = 500;

        return ctx.body = 'Internal server error';
    }
};

export default errorHandler;
