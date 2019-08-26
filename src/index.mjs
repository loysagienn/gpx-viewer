
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {initApp} from 'app/server';
import {getDb} from 'db';
import {getApi} from 'api';
import log from 'logger';
import {errorHandler, requestLogger, sendStatic} from 'koaMiddlewares';

const createServer = async ({httpPort, instanceId}) => {
    const koaServer = new Koa();

    const db = await getDb();
    const api = getApi(db);

    koaServer.context.db = db;
    koaServer.context.api = api;
    koaServer.context.instanceId = instanceId;

    koaServer.use(bodyParser());
    // нужно для получения нового ssl сертификата
    // koaServer.use(confirmSshKey);
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


export const startServer = async ({httpPort, instanceId}) => {
    try {
        const result = await createServer({httpPort, instanceId});

        logServerStart(httpPort);

        return result;
    } catch (error) {
        log.initServerError({error});

        throw error;
    }
};
