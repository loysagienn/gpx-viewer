import addKoaMiddlewares from './addKoaMiddlewares';


export const initApp = koaServer => addKoaMiddlewares(koaServer);
