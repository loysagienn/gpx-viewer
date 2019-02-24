// @flow

export const {isArray} = Array;

export const {keys, entries, assign} = Object;

export const isObject = (val: mixed) => (typeof val === 'object') && (val !== null) && (!isArray(val));

export {default as cn} from './cn';
