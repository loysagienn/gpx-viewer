
import request from 'request-promise-native';
import {toCamelCase} from 'helpers';
import {API_URL} from './constants';


export default ({accessToken}) => request({
    method: 'GET',
    uri: `${API_URL}/athlete`,
    qs: {
        access_token: accessToken,
    },
    json: true,
}).then(toCamelCase);
