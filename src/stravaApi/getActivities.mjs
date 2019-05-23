
import request from 'request-promise-native';
import {toCamelCase} from 'helpers';
import {API_URL} from './constants';
import processError from './processError';


export default ({accessToken}, page = 1, countPerPage = 10) => request({
    method: 'GET',
    uri: `${API_URL}/athlete/activities`,
    qs: {
        access_token: accessToken,
        page,
        per_page: countPerPage,
    },
    json: true,
}).then(toCamelCase).catch(processError);
