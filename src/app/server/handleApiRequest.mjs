import {ROUTE_TYPES, ROUTES_IDS} from 'router';
import log from 'logger';

const getAthleteActivities = async (api, state) => {
    const {stravaCredentials: credentials, route} = state;

    if (!credentials) {
        return {error: 'Unauthorized'};
    }

    return api.getAthleteActivities(credentials, route.params.monthKey, route.queryParams.ignoreCache);
};

const apiMap = {
    [ROUTES_IDS.API_GET_ACTIVITIES]: getAthleteActivities,
};

export default async (koaCtx, next) => {
    const {state, api} = koaCtx;
    const {route} = state;

    if (route.type !== ROUTE_TYPES.JSON) {
        return next();
    }

    const handler = apiMap[route.id];

    if (handler) {
        try {
            const result = await handler(api, state);

            if (result.error) {
                return koaCtx.body = result;
            }

            return koaCtx.body = {result};
        } catch (error) {
            log.error(error);

            return koaCtx.body = {error: 'Internal error'};
        }
    }

    return koaCtx.body = {error: 'Not found'};
};
