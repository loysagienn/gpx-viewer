export {default as getSpeed} from './getSpeed';
export {default as compressValues} from './compressValues';

export const getPaseBySpeed = (speed) => {
    const secondsPerKm = Math.round(1000 / speed);

    const minutes = Math.floor(secondsPerKm / 60);
    const seconds = secondsPerKm - (minutes * 60);

    return [minutes, seconds];
};

export const getSpeedByPase = ([minutes, seconds]) => {
    const secondsPerKm = (minutes * 60) + seconds;

    return 1000 / secondsPerKm;
};
