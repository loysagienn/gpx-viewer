import {LOGS_INFO_COLLECTION, LOGS_ERROR_COLLECTION} from './constants';

export const logInfo = async (db, data) => db.collection(LOGS_INFO_COLLECTION).insertOne(data);

export const logError = async (db, data) => db.collection(LOGS_ERROR_COLLECTION).insertOne(data);
