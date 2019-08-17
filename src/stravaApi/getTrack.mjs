import request from 'request-promise-native';
import {toCamelCase} from 'helpers';
import {API_URL} from './constants';
import processError from './processError';

const streamTypes = [
    'time',
    // 'distance',
    'latlng',
    'altitude',
    // 'velocity_smooth',
    'heartrate',
    // 'cadence',
    'temp',
    // 'moving',
];

export default ({accessToken}, activityId) => request({
    method: 'GET',
    uri: `${API_URL}/activities/${activityId}/streams`,
    qs: {
        access_token: accessToken,
        keys: streamTypes.join(','),
        key_by_type: true,
    },
    json: true,
}).then(toCamelCase).catch(processError);
