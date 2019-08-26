const confirmSshKey = async (ctx, next) => {
    if (ctx.request.url in ctx.sshConfirm) {
        return ctx.body = ctx.sshConfirm[ctx.request.url];
    }

    return next();
};

export default confirmSshKey;
