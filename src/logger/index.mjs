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
            db.logError(data);
        } else {
            db.logInfo(data);
        }
    };

    logsQueue.forEach(([level, data]) => dbLog(level, data));
});

const info = (data, ...rest) => {
    console.log(data, ...rest);

    if (data && typeof data === 'object' && data.key) {
        dbLog('info', data);
    }
};

const error = (data, ...rest) => {
    console.error(data, ...rest);

    if (data && typeof data === 'object' && data.key) {
        dbLog('error', data);
    }
};

export default {info, error};
