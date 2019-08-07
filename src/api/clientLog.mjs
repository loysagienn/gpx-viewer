import log from 'logger';

const clientLog = (db, level, body) => {
    body.isClientLog = true;

    if (level === 'error') {
        return log.error(body);
    }

    return log.info(body);
};

export default clientLog;
