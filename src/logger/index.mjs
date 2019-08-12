import logDb from './logDb';
import logConsole from './logConsole';


const log = level => (data, ...rest) => {
    if (data && typeof data === 'object' && data.key) {
        logConsole(level, data);
        logDb(level, data);
    } else {
        console.log(data, ...rest);
    }
};

const info = log('info');

const error = log('error');

export default {info, error};
