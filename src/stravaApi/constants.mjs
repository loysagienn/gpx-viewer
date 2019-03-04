
const STRAVA_ORIGIN = 'https://www.strava.com';

export const OAUTH_TOKEN_URL = `${STRAVA_ORIGIN}/oauth/token`;

export const API_URL = `${STRAVA_ORIGIN}/api/v3`;

export const GRANT_TYPES = {
    AUTHORIZATION_CODE: 'authorization_code',
    REFRESH_TOKEN: 'refresh_token',
};
