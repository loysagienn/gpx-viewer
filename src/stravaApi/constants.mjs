
const STRAVA_ORIGIN = 'https://www.strava.com';

export const OAUTH_TOKEN_URL = `${STRAVA_ORIGIN}/oauth/token`;

export const DEAUTHORIZE_URL = `${STRAVA_ORIGIN}/oauth/deauthorize`;

export const API_URL = `${STRAVA_ORIGIN}/api/v3`;

export const GRANT_TYPES = {
    AUTHORIZATION_CODE: 'authorization_code',
    REFRESH_TOKEN: 'refresh_token',
};

export const ERRORS = {
    AUTHORIZATION_ERROR: 'STRAVA_AUTHORIZATION_ERROR',
    UNKNOWN_ERROR: 'STRAVA_UNKNOWN_ERROR',
};
