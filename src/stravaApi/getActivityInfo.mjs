import request from 'request-promise-native';
import {toCamelCase} from 'helpers';
import {API_URL} from './constants';
import processError from './processError';


export default ({accessToken}, activityId) => request({
    method: 'GET',
    uri: `${API_URL}/activities/${activityId}`,
    qs: {
        access_token: accessToken,
    },
    json: true,
}).then(toCamelCase).catch(processError);
