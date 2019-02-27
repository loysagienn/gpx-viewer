
import getDistance from './getDistance';


const SPEED_CALC_POINTS_COUNT = 2;

export default (track, index) => {
    let distance = 0;

    const startIndex = Math.max(0, index - SPEED_CALC_POINTS_COUNT);
    const endIndex = Math.min(track.length - 2, index + SPEED_CALC_POINTS_COUNT);

    const startTime = track[startIndex].time;
    const endTime = track[endIndex].time;

    const time = endTime - startTime;

    for (let i = startIndex; i < endIndex; i++) {
        const {lat: startLat, lon: startLon} = track[i];
        const {lat: endLat, lon: endLon} = track[i + 1];

        distance += getDistance(startLat, startLon, endLat, endLon);
    }

    if (distance === 0 || time === 0) {
        return 0;
    }

    return (distance / time) * 1000; // speed in m/s
};
