import UrlPattern from 'url-pattern';
import {reduce, map, assoc, compose, split, toPairs} from 'ramda';

export const ROUTE_TYPES = {
    HTML: 'HTML',
    JSON: 'JSON',
};

export const getRoutes = map(({id, pattern}) => ({id, pattern: new UrlPattern(pattern)}));

export const getRoutesMap = reduce((acc, {id, pattern}) => assoc(id, {id, pattern}, acc, {}));

export const getRoutesIds = reduce((acc, {id}) => assoc(id, id, acc), {});

const matchRoute = (routes, path) => {
    for (let i = 0; i < routes.length; i++) {
        const {id, pattern} = routes[i];

        const params = pattern.match(path);

        if (params) {
            return {id, params};
        }
    }

    return null;
};

const getQueryParams = compose(reduce((acc, [id, value]) => assoc(id, value, acc), {}), map(split('=')), split('&'));

const stringifyQueryParams = (queryParams) => {
    if (!queryParams) {
        return '';
    }

    const queryParamsArr = toPairs(queryParams);

    if (queryParamsArr.length === 0) {
        return '';
    }

    return queryParamsArr.map(([key, value]) => `${key}=${value}`).join('&');
};

export const getRouteByUrl = (routes, url) => {
    const [path, queryString] = url.split('?');

    const route = matchRoute(routes, path);

    if (!route) {
        return null;
    }

    route.type = url.startsWith('/api') ? ROUTE_TYPES.JSON : ROUTE_TYPES.HTML;

    route.queryParams = queryString ? getQueryParams(queryString) : {};

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
