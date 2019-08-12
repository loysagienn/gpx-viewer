// @flow

export type ActivityIdT = number;

export type ActivityType = 'Run' | 'Ride';

export type ActivitySummaryT = {
    id: ActivityIdT,
    name: string,
    distance?: number,
    elapsedTime?: number,
    movingTime?: number,
    averageHeartrate?: number,
    type: ActivityType,
    averageSpeed?: number,
    totalElevationGain?: number,
    polyline?: string,
    url?: activityUrl,
};
