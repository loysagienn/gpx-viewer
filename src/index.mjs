
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import {initApp} from './app/server';
import {httpPort} from './config';
import {requestLogger, sendStatic} from './koaMiddlewares';

const createServer = async () => {
    const koaServer = new Koa();

    koaServer.use(bodyParser());
    koaServer.use(requestLogger);
    koaServer.use(sendStatic);

    initApp(koaServer);

    koaServer.listen(httpPort);
};

createServer()
    .then(() => console.log('server is ready for requests'))
    .catch(error => console.log('error init server', error));
