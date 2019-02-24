
import send from 'koa-send';
import path from 'path';

export default async (ctx, next) => {
    if (!ctx.path.startsWith('/static')) {
        return next();
    }

    const filePath = ctx.path.replace(/^\/static[/]*/, '');
    const root = path.join(__dirname, '../../static');

    return send(ctx, filePath, {root});
};
