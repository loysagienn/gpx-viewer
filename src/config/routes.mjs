
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
        id: 'ACTIVITY',
        pattern: '/activity/:activityId',
    },
    {
        id: 'API_GET_ACTIVITIES',
        pattern: '/api/activities/:monthKey',
    },
    {
        id: 'NOT_FOUND',
        pattern: '*',
    },
];
