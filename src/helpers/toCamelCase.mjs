
import {entries, isArray, isObject, assign} from 'helpers';

const transformKey = (key) => {
    const isValidKey = /^([a-zA-Z1-9]+[_-])*[a-zA-Z1-9]+$/.test(key);

    if (!isValidKey) return key;

    return key.replace(/[_-]([a-zA-Z1-9])/g, (match, char) => char.toUpperCase());
};

const toCamelCase = (val) => {
    if (isArray(val)) {
        return val.map(toCamelCase);
    }

    if (isObject(val)) {
        return entries(val)
            .map(([key, value]) => ([transformKey(key), toCamelCase(value)]))
            .reduce((acc, [key, value]) => assign(acc, {[key]: value}), {});
    }

    return val;
};

export default toCamelCase;
