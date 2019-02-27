
import {getPaseBySpeed, stringifyPase} from './pase';
import getSpeed from './getSpeed';


export default (track) => {
    const firstPoint = track[0];
    const lastPoint = track[track.length - 1];

    const startTime = firstPoint.time;
    const endTime = lastPoint.time;
    const trackTime = endTime - startTime;
    let maxSpeed = 0;

    const points = track.map(({lat, lon, elevation, time}, index) => {
        const speed = getSpeed(track, index);
        const pase = getPaseBySpeed(speed);
        const paseStr = stringifyPase(pase);
        maxSpeed = Math.max(maxSpeed, speed);

        return {
            lat,
            lon,
            elevation,
            speed,
            paseStr,
            timeFromStart: time - startTime,
            timeSpot: (time - startTime) / trackTime,
        };
    });

    return {points, maxSpeed};
};
