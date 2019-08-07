import {SSH_CONFIRM} from 'config/private';

const confirmSshKey = async (ctx, next) => {
    if (ctx.request.url in SSH_CONFIRM) {
        return ctx.body = SSH_CONFIRM[ctx.request.url];
    }

    return next();
};

export default confirmSshKey;
