
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {initApp} from 'app/server';
import {getDb} from 'db';
import {getApi} from 'api';
import log from 'logger';
import {errorHandler, requestLogger, sendStatic, confirmSshKey} from 'koaMiddlewares';

const createServer = async ({httpPort, instanceId, ymapsApiKey, stravaClientSecret}) => {
    const koaServer = new Koa();

    const db = await getDb();
    const api = getApi(db);

    koaServer.context.db = db;
    koaServer.context.api = api;
    koaServer.context.instanceId = instanceId;
    koaServer.context.ymapsApiKey = ymapsApiKey;
    koaServer.context.stravaClientSecret = stravaClientSecret;
    koaServer.context.sshConfirm = {
        'mytracks.store/.well-known/acme-challenge/sffkS0YYcS9sRGTNvDy2HqhhsAW0htLJGFkAnEoS1OE': 'sffkS0YYcS9sRGTNvDy2HqhhsAW0htLJGFkAnEoS1OE._QEH4s1cey8y5Xv-lS9CQl4KSyhQUJypZteDnt0qAHk',
        'mytracks.store/.well-known/acme-challenge/Y1WqdAZoFpiHaOZgTM0iCnupnCZ_WmTd-JsLfocJ04g': 'Y1WqdAZoFpiHaOZgTM0iCnupnCZ_WmTd-JsLfocJ04g._QEH4s1cey8y5Xv-lS9CQl4KSyhQUJypZteDnt0qAHk',
    };

    koaServer.use(bodyParser());
    // нужно для получения нового ssl сертификата
    koaServer.use(confirmSshKey);
    koaServer.use(sendStatic);
    koaServer.use(errorHandler);
    koaServer.use(requestLogger);

    initApp(koaServer);

    koaServer.listen(httpPort);
};

const logServerStart = httpPort => console.log(
    '\x1b[36m%s\x1b[0m',
    `\n--------------- server start on port ${httpPort} ---------------\n`,
);


export const startServer = async ({httpPort, instanceId, ymapsApiKey, stravaClientSecret}) => {
    try {
        const result = await createServer({httpPort, instanceId, ymapsApiKey, stravaClientSecret});

        logServerStart(httpPort);

        return result;
    } catch (error) {
        log.initServerError({error});

        throw error;
    }
};
