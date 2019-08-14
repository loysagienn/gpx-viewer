import assignState from './assignState';


const getYmapsState = () => ({
    initialized: false,
});

const addBaseState = async (koaCtx, initialState) => {
    const {state, origin} = koaCtx;

    const ymaps = getYmapsState();

    const {route, session} = state;

    return assignState(initialState, {
        ymaps,
        route,
        isDemo: session.isDemo,
        meta: {origin},
    });
};


export default addBaseState;
