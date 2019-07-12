import {normalizeUrl} from 'helpers';
import {getRouteByUrl} from 'router';

const withRoute = async ({state, request}, next) => {
    const url = normalizeUrl(request.url);

    state.route = getRouteByUrl(url);

    return next();
};

export default withRoute;
