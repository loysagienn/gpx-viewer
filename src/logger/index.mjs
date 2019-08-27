import {infoLogmarks, errorLogmarks} from 'constants/logmarks';
import logDb from './logDb';

const getConsoleStyle = level => (level === 'error' ? '\x1b[31m%s\x1b[0m' : '\x1b[32m%s\x1b[0m');

const applyLog = (level, key, data) => {
    let dbData;
    console.log(getConsoleStyle(level), `--------------- ${key} ---------------`);

    if (typeof data !== 'object' || data === null) {
        console.log(data);

        dbData = {data, key};
    } else {
        // eslint-disable-next-line no-restricted-syntax,guard-for-in
        for (const prop in data) console.log(`${prop}:`, data[prop]);

        dbData = Object.assign({}, data, {key});
    }

    console.log('');

    logDb(level, dbData);
};

const createLogmarksLogger = (level, logmarks) => Object.entries(logmarks).reduce(
    (acc, [name, key]) => {
        acc[name] = data => applyLog(level, key, data);

        return acc;
    },
    {},
);

const log = {
    ...createLogmarksLogger('info', infoLogmarks),
    ...createLogmarksLogger('error', errorLogmarks),
};


export default log;
