import {ROUTE_TYPES, ROUTES_IDS} from 'router';
import log from 'logger';

const getAthleteActivities = async (api, state) => {
    const {stravaCredentials: credentials, route} = state;

    if (!credentials) {
        return {error: 'Unauthorized'};
    }

    return api.getAthleteActivities(credentials, route.params.monthKey, route.queryParams.ignoreCache);
};

const clientLog = (api, state, requestBody) => api.clientLog(requestBody);

const getActivityInfo = async (api, state) => {
    const {stravaCredentials: credentials, route} = state;

    if (!credentials) {
        return {error: 'Unauthorized'};
    }

    return api.getActivityInfo(credentials, route.params.activityId);
};

const apiMap = {
    [ROUTES_IDS.API_GET_ACTIVITIES]: getAthleteActivities,
    [ROUTES_IDS.LOG]: clientLog,
    [ROUTES_IDS.API_GET_ACTIVITY_INFO]: getActivityInfo,
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
                if (result.error.status) {
                    koaCtx.status = result.error.status;
                }

                return koaCtx.body = result;
            }

            return koaCtx.body = {result};
        } catch (error) {
            log.handleApiRequestError({error});

            koaCtx.status = 500;
            return koaCtx.body = {error: 'Internal error'};
        }
    }

    koaCtx.status = 404;
    return koaCtx.body = {error: 'Not found'};
};
