
import * as developmentConfig from './development';
import * as productionConfig from './production';

export const isProductionMode = process.env.NODE_ENV === 'production';

const config = isProductionMode ? productionConfig : developmentConfig;

const YMAPS_JSONP_CALLBACK = '__YMAPS_JSONP_CALLBACK__';

const STRAVA_CLIENT_ID = '32976';

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
    reselectCdnUrl,
    DOMAIN,
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
    reselectCdnUrl,
    YMAPS_JSONP_CALLBACK,
    STRAVA_CLIENT_ID,
    DOMAIN,
};
