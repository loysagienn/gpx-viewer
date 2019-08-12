import {demoAthleteId} from 'config';


const withAthleteId = async (koaCtx, next) => {
    const {athleteId, isDemo} = koaCtx.state.session;

    koaCtx.state.athleteId = isDemo ? demoAthleteId : athleteId;

    return next();
};


export default withAthleteId;
