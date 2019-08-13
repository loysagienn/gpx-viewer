
export default [
    {
        id: 'INDEX',
        pattern: '/',
    },
    {
        id: 'STRAVA_AUTH',
        pattern: '/strava-auth',
    },
    {
        id: 'STRAVA_UNAUTH',
        pattern: '/strava-unauth',
    },
    {
        id: 'LOGOUT',
        pattern: '/logout',
    },
    {
        id: 'DEMO_LOGIN',
        pattern: '/demo',
    },
    {
        id: 'DEMO_LOGOUT',
        pattern: '/demo-logout',
    },
    {
        id: 'ACTIVITY',
        pattern: '/activity/:activityId',
    },
    {
        id: 'API_GET_ACTIVITIES',
        pattern: '/api/activities/:monthKey',
        processParams: ({monthKey}) => ({monthKey}),
    },
    {
        id: 'LOG',
        pattern: '/api/log',
    },
    {
        id: 'NOT_FOUND',
        pattern: '*',
    },
];
