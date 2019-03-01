
import routesConfig from 'config/routes';
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

export const ROUTES_IDS = getRoutesIds(routes);

export const getRouteByUrl = url => getRouteByUrlHelper(routes, url);

export const getUrlByRoute = route => getUrlByRouteHelper(routesMap, route);
