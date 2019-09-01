import request from 'request-promise-native';
import {toCamelCase} from 'helpers';
import {getSpeed} from 'helpers/track';
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
    // 'temp',
    // 'moving',
];

const processResult = ({time, latlng, altitude, heartrate, temp, cadence}) => {
    const size = latlng.data.length;

    const track = {
        size,
        time: time ? time.data : null,
        coords: latlng ? latlng.data : null,
        altitude: altitude ? altitude.data : null,
        heartrate: heartrate ? heartrate.data : null,
        temp: temp ? temp.data : null,
        cadence: cadence ? cadence.data : null,
    };

    const [speed, minSpeed, maxSpeed] = getSpeed(track);

    Object.assign(track, {speed, minSpeed, maxSpeed});

    return track;
};

export default ({accessToken}, activityId) => request({
    method: 'GET',
    uri: `${API_URL}/activities/${activityId}/streams`,
    qs: {
        access_token: accessToken,
        keys: streamTypes.join(','),
        key_by_type: true,
    },
    json: true,
})
    .then(toCamelCase)
    .then(processResult)
    .catch(processError);
