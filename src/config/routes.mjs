
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
        id: 'DEMO',
        pattern: '/demo',
    },
    {
        id: 'ACTIVITY',
        pattern: '/activity/:activityId',
    },
    {
        id: 'API_GET_ACTIVITIES',
        pattern: '/api/athlete/:athleteId/activities/:monthKey',
        processParams: ({monthKey, athleteId}) => ({monthKey, athleteId: Number(athleteId)}),
    },
    {
        id: 'NOT_FOUND',
        pattern: '*',
    },
];
