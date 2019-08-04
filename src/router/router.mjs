import UrlPattern from 'url-pattern';
import {reduce, map, assoc} from 'ramda';
import {stringifyQueryParams, parseQueryParams} from 'helpers';

export const ROUTE_TYPES = {
    HTML: 'HTML',
    JSON: 'JSON',
};

export const getRoutes = map(({id, pattern, processParams}) => ({
    id,
    pattern: new UrlPattern(pattern),
    processParams,
}));

export const getRoutesMap = reduce((acc, {id, pattern}) => assoc(id, {id, pattern}, acc), {});

export const getRoutesIds = reduce((acc, {id}) => assoc(id, id, acc), {});

const matchRoute = (routes, path) => {
    for (let i = 0; i < routes.length; i++) {
        const {id, pattern, processParams} = routes[i];

        let params = pattern.match(path);

        if (params) {
            if (processParams) {
                params = processParams(params);
            }
            return {id, params};
        }
    }

    return null;
};

export const getRouteByUrl = (routes, url) => {
    const [path, queryString] = url.split('?');

    const route = matchRoute(routes, path);

    if (!route) {
        return null;
    }

    route.type = url.startsWith('/api') ? ROUTE_TYPES.JSON : ROUTE_TYPES.HTML;

    route.queryParams = queryString ? parseQueryParams(queryString) : {};

    return route;
};

export const getUrlByRoute = (routesMap, route) => {
    const {id, params, queryParams} = route;
    const {pattern} = routesMap[id];

    const path = pattern.stringify(params);

    const queryString = stringifyQueryParams(queryParams);

    if (!queryString) {
        return path;
    }

    return `${path}?${queryString}`;
};
