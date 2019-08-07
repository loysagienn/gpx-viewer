
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {initApp} from 'app/server';
import {httpPort} from 'config';
import {getDb} from 'db';
import {getApi} from 'api';
import log from 'logger';
import {requestLogger, sendStatic} from 'koaMiddlewares';

const createServer = async () => {
    const koaServer = new Koa();

    const db = await getDb();
    const api = getApi(db);

    koaServer.context.db = db;
    koaServer.context.api = api;

    koaServer.use(bodyParser());
    // нужно для получения нового ssl сертификата
    // koaServer.use(confirmSshKey);
    koaServer.use(sendStatic);
    koaServer.use(requestLogger);

    initApp(koaServer);

    koaServer.listen(httpPort);
};

createServer()
    .then(() => log.info('server is ready for requests'))
    .catch(error => log.error('error init server', error));
