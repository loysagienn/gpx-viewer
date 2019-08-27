
import routesConfig from './routes';
import {
    getRoutes,
    getRoutesMap,
    getRoutesIds,
    getRouteByUrl as getRouteByUrlHelper,
    getUrlByRoute as getUrlByRouteHelper,
} from './router';

export {ROUTE_TYPES} from './router';

const routes = getRoutes(routesConfig);

const routesMap = getRoutesMap(routes);

const getRouteFromArgs = ([arg, ...rest]) => {
    if (typeof arg === 'string') {
        const id = arg;

        if (rest.length === 0) {
            return {id};
        }

        const [params] = rest;

        return {id, params};
    }

    return arg;
};

export const ROUTES_IDS = getRoutesIds(routes);

export const getRouteByUrl = url => getRouteByUrlHelper(routes, url);

export const getUrlByRoute = (...args) => getUrlByRouteHelper(routesMap, getRouteFromArgs(args));
