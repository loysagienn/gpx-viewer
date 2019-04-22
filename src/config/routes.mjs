
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
        id: 'NOT_FOUND',
        pattern: '*',
    },
];
