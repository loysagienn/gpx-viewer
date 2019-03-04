
import request from 'request-promise-native';
import {STRAVA_CLIENT_ID} from 'config';
import {STRAVA_CLIENT_SECRET} from 'config/private';
import {OAUTH_TOKEN_URL, GRANT_TYPES} from './constants';


export default async (code) => {
    const options = {
        method: 'POST',
        uri: OAUTH_TOKEN_URL,
        qs: {
            code,
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            grant_type: GRANT_TYPES.AUTHORIZATION_CODE,
        },
        json: true,
    };

    const result = await request(options);

    const {
        token_type: tokenType,
        access_token: accessToken,
        athlete,
        refresh_token: refreshToken,
        expires_at: expiresAt,
    } = result;

    return {tokenType, accessToken, athlete, refreshToken, expiresAt};
};
