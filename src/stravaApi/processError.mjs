
import {ERRORS} from './constants';

export default (err) => {
    if (!err) {
        throw {
            type: ERRORS.UNKNOWN_ERROR,
            error: err,
        };
    }

    const {statusCode, error} = err;

    if (statusCode === 401) {
        throw {
            type: ERRORS.AUTHORIZATION_ERROR,
            error,
        };
    }

    throw {
        type: ERRORS.UNKNOWN_ERROR,
        error: err,
    };
};
