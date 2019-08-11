import {ROUTES_IDS} from 'router';
import {isDemoRoute} from 'helpers';
import {demoAthleteId} from 'config';


const getAthleteId = (session, route) => {
    if (isDemoRoute(route)) {
        return demoAthleteId;
    }

    if (route.id === ROUTES_IDS.API_GET_ACTIVITIES && route.params.athleteId === demoAthleteId) {
        return demoAthleteId;
    }

    return session.athleteId;
};

const withAthleteId = async (koaCtx, next) => {
    const {session, route} = koaCtx.state;

    koaCtx.state.athleteId = getAthleteId(session, route);

    return next();
};


export default withAthleteId;
