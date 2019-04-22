
import request from 'request-promise-native';
import {STRAVA_CLIENT_ID} from 'config';
import {STRAVA_CLIENT_SECRET} from 'config/private';
import {OAUTH_TOKEN_URL, GRANT_TYPES} from './constants';
import processError from './processError';


export default async (refreshToken) => {
    const options = {
        method: 'POST',
        uri: OAUTH_TOKEN_URL,
        qs: {
            refresh_token: refreshToken,
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            grant_type: GRANT_TYPES.REFRESH_TOKEN,
        },
        json: true,
    };

    let result;

    try {
        result = await request(options);
    } catch (err) {
        processError(err);
    }

    const {
        token_type: tokenType,
        access_token: accessToken,
        refresh_token: newRefreshToken,
        expires_at: expiresAt,
    } = result;

    return {
        tokenType,
        accessToken,
        refreshToken: newRefreshToken,
        expiresAt,
    };
};
