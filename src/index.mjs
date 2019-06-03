
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {initApp} from 'app/server';
import {httpPort} from 'config';
import {getDb} from 'db';
import log from 'logger';
import {requestLogger, sendStatic} from 'koaMiddlewares';

const createServer = async () => {
    const koaServer = new Koa();

    koaServer.context.db = await getDb();

    koaServer.use(bodyParser());
    koaServer.use(requestLogger);
    koaServer.use(sendStatic);

    initApp(koaServer);

    koaServer.listen(httpPort);
};

createServer()
    .then(() => log.info('server is ready for requests'))
    .catch(error => log.error('error init server', error));
