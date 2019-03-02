
import request from 'request-promise-native';
import {ROUTES_IDS, getUrlByRoute} from 'router';
import {STRAVA_CLIENT_ID} from 'config';
import {STRAVA_CLIENT_SECRET} from 'config/private';

const stravaOauthTokenUrl = 'https://www.strava.com/oauth/token';

const GRANT_TYPES = {
    AUTHORIZATION_CODE: 'authorization_code',
    REFRESH_TOKEN: 'refresh_token',
};

export default async (koaCtx, next) => {
    const {route, session: {sessionId}} = koaCtx.state;

    if (route.id !== ROUTES_IDS.STRAVA_AUTH) {
        return next();
    }

    const {queryParams: {code, error, scope: scopeStr}} = route;

    if (error) {
        console.log('strava auth error:', error);

        return koaCtx.redirect(getUrlByRoute({id: ROUTES_IDS.INDEX}));
    }

    const scope = scopeStr.split(',');

    const options = {
        method: 'POST',
        uri: stravaOauthTokenUrl,
        qs: {
            code,
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            grant_type: GRANT_TYPES.AUTHORIZATION_CODE,
        },
        json: true, // Automatically parses the JSON string in the response
    };

    let result;

    try {
        result = await request(options);
    } catch (err) {
        console.log('strava oauth failed: ', err);

        return koaCtx.redirect(getUrlByRoute({id: ROUTES_IDS.INDEX}));
    }

    const {
        token_type: tokenType,
        access_token: accessToken,
        athlete,
        refresh_token: refreshToken,
        expires_at: expiresAt,
    } = result;

    await koaCtx.db.addUserCredentials({
        sessionId,
        tokenType,
        accessToken,
        athlete,
        refreshToken,
        expiresAt,
        scope,
    });

    console.log('success strava oauth! ', {
        sessionId,
        tokenType,
        accessToken,
        athlete,
        refreshToken,
        expiresAt,
        scope,
    });

    return koaCtx.redirect(getUrlByRoute({id: ROUTES_IDS.INDEX}));
};
