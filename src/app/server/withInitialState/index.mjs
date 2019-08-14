import addAthleteData from './addAthleteData';
import addBaseState from './addBaseState';

const withInitialState = async (koaCtx, next) => {
    const initialState = {};

    await Promise.all([
        addBaseState(koaCtx, initialState),
        addAthleteData(koaCtx, initialState),
    ]);

    koaCtx.state.initialState = initialState;

    return next();
};


export default withInitialState;
