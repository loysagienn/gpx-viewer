
import {ROUTES_IDS} from 'router';
import buildInitialState from './buildInitialState';
import renderHtml from './renderHtml';
import checkAuthorization from './checkAuthorization';
import initRoute from './initRoute';
import authStrava from './authStrava';
import stravaCredentials from './stravaCredentials';

const handleHtmlRequest = async (koaCtx) => {
    const {initialState, route} = koaCtx.state;

    if (route.id === ROUTES_IDS.NOT_FOUND) {
        koaCtx.status = 404;
    }

    koaCtx.body = renderHtml(initialState);
};

export const initApp = (koaServer) => {
    koaServer.use(checkAuthorization);
    koaServer.use(initRoute);
    koaServer.use(stravaCredentials);
    koaServer.use(authStrava);
    koaServer.use(buildInitialState);
    koaServer.use(handleHtmlRequest);
};
