import {infoLogmarks, errorLogmarks} from 'constants/logmarks';
import {getUrlByRoute, ROUTES_IDS} from 'router';


let count = 0;
const MAX_ERROR_COUNT = 20;

const fetchLog = (method, data) => {
    if (count > MAX_ERROR_COUNT) {
        return null;
    }

    const url = getUrlByRoute(ROUTES_IDS.LOG);
    const headers = {
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({method, data});

    count++;

    return fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers,
        body,
    }).catch(error => console.log('error fetching log', error));
};

const getConsoleStyle = level => (level === 'error' ? '\x1b[31m%s\x1b[0m' : '\x1b[32m%s\x1b[0m');

const applyLog = (method, key, data, level) => {
    console.log(getConsoleStyle(level), `--------------- ${key} ---------------`);

    if (typeof data !== 'object' || data === null) {
        console.log(data);

        data = {data};
    } else {
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const prop in data) console.log(`${prop}:`, data[prop]);
    }

    console.log('');

    fetchLog(method, data);
};

const createLogmarksLogger = (level, logmarks) => Object.entries(logmarks).reduce(
    (acc, [method, key]) => {
        acc[method] = data => applyLog(method, key, data, level);

        return acc;
    },
    {},
);

const log = {
    ...createLogmarksLogger('info', infoLogmarks),
    ...createLogmarksLogger('error', errorLogmarks),
};


export default log;
