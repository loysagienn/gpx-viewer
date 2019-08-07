import {getDb} from 'db';

const logsQueue = [];

const prepareData = (data) => {
    if (!data.timestamp) {
        data.timestamp = Date.now();
    }

    return data;
};

let dbLog = (level, data) => logsQueue.push([level, data]);

getDb().then((db) => {
    dbLog = (level, data) => {
        data = prepareData(data);

        if (level === 'error') {
            db.logError(data).catch(() => console.log('log error'));
        } else {
            db.logInfo(data).catch(() => console.log('log error'));
        }
    };

    logsQueue.forEach(([level, data]) => dbLog(level, data));
});

const info = (data, ...rest) => {
    if (data && typeof data === 'object' && data.key) {
        const {key, ...params} = data;

        console.log(key, params);

        dbLog('info', data);
    } else {
        console.log(data, ...rest);
    }
};

const error = (data, ...rest) => {
    if (data && typeof data === 'object' && data.key) {
        const {key, ...params} = data;

        console.log(key, params);

        dbLog('error', data);
    } else {
        console.error(data, ...rest);
    }
};

export default {info, error};
