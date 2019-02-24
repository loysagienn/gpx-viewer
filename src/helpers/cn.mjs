import {entries, isArray} from './';

const getObjectClassNames = className => entries(className)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ');

const processArg = (arg) => {
    if (isArray(arg)) {
        return makeClassName(arg);
    }

    if (typeof arg === 'object') {
        return getObjectClassNames(arg);
    }

    if (typeof arg === 'string') {
        return arg;
    }

    return null;
};

const makeClassName = args => args.map(processArg).filter(className => className).join(' ');

export default (...args) => makeClassName(args);
