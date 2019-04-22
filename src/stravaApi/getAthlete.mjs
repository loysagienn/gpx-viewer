
import request from 'request-promise-native';
import {toCamelCase} from 'helpers';
import {API_URL, ERRORS} from './constants';

const processError = (err) => {
    if (!err) {
        throw {
            type: ERRORS.UNKNOWN_ERROR,
            error: err,
        };
    }

    const {statusCode, error} = err;

    if (statusCode === 401) {
        throw {
            type: ERRORS.AUTHORIZATION_ERROR,
            error,
        };
    }

    throw {
        type: ERRORS.UNKNOWN_ERROR,
        error: err,
    };
};


export default ({accessToken}) => request({
    method: 'GET',
    uri: `${API_URL}/athlete`,
    qs: {
        access_token: accessToken,
    },
    json: true,
}).then(toCamelCase).catch(processError);
