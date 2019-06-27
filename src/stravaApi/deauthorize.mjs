
import request from 'request-promise-native';
import {DEAUTHORIZE_URL} from './constants';
import processError from './processError';


export default async ({accessToken}) => {
    const options = {
        method: 'POST',
        uri: DEAUTHORIZE_URL,
        qs: {
            access_token: accessToken,
        },
        json: true,
    };

    let result;

    try {
        result = await request(options);
    } catch (err) {
        processError(err);
    }

    return result;
};
