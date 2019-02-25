
import * as developmentConfig from './development';
import * as productionConfig from './production';

export const isProductionMode = process.env.NODE_ENV === 'production';

const config = isProductionMode ? productionConfig : developmentConfig;

const YMAPS_JSONP_CALLBACK = '__YMAPS_JSONP_CALLBACK__';


const {
    httpPort,
    dbUrl,
    ramdaCdnUrl,
    reactCdnUrl,
    reactDomCdnUrl,
    recomposeCdnUrl,
    reduxCdnUrl,
    reactReduxCdnUrl,
    reduxThunkCdnUrl,
} = config;

export {
    httpPort,
    dbUrl,
    reactCdnUrl,
    ramdaCdnUrl,
    reactDomCdnUrl,
    recomposeCdnUrl,
    reduxCdnUrl,
    reactReduxCdnUrl,
    reduxThunkCdnUrl,
    YMAPS_JSONP_CALLBACK,
};
