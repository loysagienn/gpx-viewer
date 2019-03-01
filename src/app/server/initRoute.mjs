import {normalizeUrl} from 'helpers';
import {getRouteByUrl} from 'router';

export default async ({state, request}, next) => {
    const url = normalizeUrl(request.url);

    state.route = getRouteByUrl(url);

    return next();
};
