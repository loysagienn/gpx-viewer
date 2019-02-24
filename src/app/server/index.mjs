
import buildInitialState from './buildInitialState';
import renderHtml from './renderHtml';

const handleHtmlRequest = async (koaCtx) => {
    const initialState = await buildInitialState(koaCtx);

    koaCtx.body = renderHtml(initialState);
};

export const initApp = (koaServer) => {
    koaServer.use(handleHtmlRequest);
};
