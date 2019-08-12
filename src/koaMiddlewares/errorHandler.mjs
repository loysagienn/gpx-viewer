import log from 'logger';

const errorHandler = async (ctx, next) => {
    try {
        const result = await next();

        return result;
    } catch (error) {
        const err = {
            key: 'global-handler-error',
        };

        if (error instanceof Error) {
            err.message = error.message;
            err.stack = error.stack;
        } else {
            err.error = error;
        }

        log.error(err);

        ctx.status = 500;

        return ctx.body = 'Internal server error';
    }
};

export default errorHandler;
