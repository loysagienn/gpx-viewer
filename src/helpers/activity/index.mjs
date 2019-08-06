import {ACTIVITY_TYPES} from 'constants';


export const getTimeStr = (time) => {
    const totalTimeInSeconds = Math.round(time);

    const seconds = totalTimeInSeconds % 60;

    const leftTimeInMinutes = Math.round((time - seconds) / 60);

    const minutes = leftTimeInMinutes % 60;

    const hours = Math.round((leftTimeInMinutes - minutes) / 60);

    if (!hours) {
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const getDistanceStr = (distance) => {
    distance = Math.round(distance);

    if (distance < 1000) {
        return [distance, 'метров'];
    }

    const val = Math.round(distance / 100) / 10;

    return [val, 'км'];
};

export const getHeartrateStr = heartrate => Math.round(heartrate);

export const getActivityTypeStr = type => ACTIVITY_TYPES[type] || type;

export const getSpeedStr = speed => `${Math.round(speed * 36) / 10}`;

export const getPaseStr = (speed) => {
    const secondsPerKm = Math.round(1000 / speed);

    const seconds = secondsPerKm % 60;

    const minutes = Math.round((secondsPerKm - seconds) / 60);

    const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${minutes}:${secondsStr}`;
};

export {default as decodePolyline} from './decodePolyline';
export {default as getPolylineSvg} from './getPolylineSvg';
