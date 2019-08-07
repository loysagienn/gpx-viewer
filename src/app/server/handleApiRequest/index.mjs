import {ROUTE_TYPES, ROUTES_IDS} from 'router';
import log from 'logger';

const getAthleteActivities = async (api, state) => {
    const {stravaCredentials: credentials, route} = state;

    if (!credentials) {
        return {error: 'Unauthorized'};
    }

    return api.getAthleteActivities(credentials, route.params.monthKey, route.queryParams.ignoreCache);
};

const clientLog = async (api, state, requestBody) => api.clientLog(state.route.params.level, requestBody);

const apiMap = {
    [ROUTES_IDS.API_GET_ACTIVITIES]: getAthleteActivities,
    [ROUTES_IDS.LOG]: clientLog,
};

export default async (koaCtx, next) => {
    const {state, api} = koaCtx;
    const {route} = state;

    if (route.type !== ROUTE_TYPES.JSON) {
        return next();
    }

    const handler = apiMap[route.id];

    if (handler) {
        const requestBody = koaCtx.method === 'POST' ? koaCtx.request.body : null;

        try {
            const result = await handler(api, state, requestBody);

            if (result && result.error) {
                return koaCtx.body = result;
            }

            return koaCtx.body = {result};
        } catch (error) {
            log.error({
                key: 'handle-api-request',
                error,
            });

            return koaCtx.body = {error: 'Internal error'};
        }
    }

    return koaCtx.body = {error: 'Not found'};
};
