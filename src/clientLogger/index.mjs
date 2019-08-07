let count = 0;
const MAX_ERROR_COUNT = 20;

const fetchLog = (level, data) => {
    if (count > MAX_ERROR_COUNT) {
        return null;
    }

    const url = `/api/log/${level}`;
    const headers = {
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify(data);

    count++;

    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers,
        body,
    }).catch(error => console.log('error fetching log', error));
};


const info = (data, ...rest) => {
    if (data && typeof data === 'object' && data.key) {
        const {key, ...params} = data;

        console.log(key, params);

        fetchLog('info', data);
    } else {
        console.log(data, ...rest);
    }
};


const error = (data, ...rest) => {
    if (data && typeof data === 'object' && data.key) {
        const {key, ...params} = data;

        console.log(key, params);

        fetchLog('error', data);
    } else {
        console.error(data, ...rest);
    }
};


window.logger = {info, error};
