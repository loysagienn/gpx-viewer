
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
        processParams: ({activityId}) => ({activityId: Number(activityId)}),
    },
    {
        id: 'API_GET_ACTIVITIES',
        pattern: '/api/activities/summary/:monthKey',
        processParams: ({monthKey}) => ({monthKey}),
    },
    {
        id: 'API_GET_ACTIVITY_INFO',
        pattern: '/api/activities/info/:activityId',
        processParams: ({activityId}) => ({activityId: Number(activityId)}),
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
