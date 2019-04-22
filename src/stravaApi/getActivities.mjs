
import request from 'request-promise-native';
import {toCamelCase} from 'helpers';
import {API_URL} from './constants';
import processError from './processError';

// export default async ({accessToken}) => {
//     const options = {
//         method: 'GET',
//         uri: `${API_URL}/athlete/activities`,
//         qs: {
//             access_token: accessToken,
//             page: 1,
//             per_page: 10,
//         },
//         json: true,
//     };

//     const result = await request(options);

//     return toCamelCase(result);
// };


export default ({accessToken}) => request({
    method: 'GET',
    uri: `${API_URL}/athlete/activities`,
    qs: {
        access_token: accessToken,
        page: 1,
        per_page: 10,
    },
    json: true,
}).then(toCamelCase).catch(processError);
