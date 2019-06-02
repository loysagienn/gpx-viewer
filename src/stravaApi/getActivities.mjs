
import request from 'request-promise-native';
import {toCamelCase} from 'helpers';
import {getDateFromMonth} from 'helpers/date';
import {API_URL} from './constants';
import processError from './processError';


export default ({accessToken}, month, page = 1, countPerPage = 100) => {
    const date = getDateFromMonth(month);
    const startTimestamp = date.getTime() / 1000;
    const endTimestamp = date.setMonth(date.getMonth() + 1) / 1000;
    console.log(month, startTimestamp, endTimestamp);

    return request({
        method: 'GET',
        uri: `${API_URL}/athlete/activities`,
        qs: {
            access_token: accessToken,
            page,
            per_page: countPerPage,
            before: endTimestamp,
            after: startTimestamp,
        },
        json: true,
    }).then(toCamelCase).catch(processError);
};
