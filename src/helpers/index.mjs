// @flow

export const {isArray} = Array;

export const {keys, entries, assign} = Object;

export const isObject = (val: mixed) => (typeof val === 'object') && (val !== null) && (!isArray(val));

export {default as cn} from './cn';

export {default as generateRandomString} from './generateRandomString';

export {default as normalizeUrl} from './normalizeUrl';

export {default as stringifyQueryParams} from './stringifyQueryParams';

export {default as parseQueryParams} from './parseQueryParams';

export {default as toCamelCase} from './toCamelCase';

export {default as memoizeByStringParam} from './memoizeByStringParam';
