import {toPairs} from 'ramda';

export default (queryParams) => {
    if (!queryParams) {
        return '';
    }

    const queryParamsArr = toPairs(queryParams);

    if (queryParamsArr.length === 0) {
        return '';
    }

    return queryParamsArr.map(([key, value]) => `${key}=${value}`).join('&');
};
