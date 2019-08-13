import log from 'logger';

const prepareData = (body) => {
    const data = Object.assign({}, body);

    data.isClientLog = true;

    return data;
};

const clientLog = async (db, {method, data}) => {
    // eslint-disable-next-line no-prototype-builtins
    if (log.hasOwnProperty(method)) {
        log[method](prepareData(data));

        return 'ok';
    }

    const error = {
        status: 404,
        message: `Log method "${method}" is not found`,
    };

    return {error};
};

export default clientLog;
