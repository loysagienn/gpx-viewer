
const EARTH_RADIUS = 6371; // Radius of the earth in km
const {sin, cos, atan2, sqrt} = Math;

const SPEED_CALC_POINTS_COUNT = 3;

const degToRad = deg => deg * (Math.PI / 180);

const distanceCollection = {};

const getDistance = (latStartDeg, lonStartDeg, latEndDeg, lonEndDeg) => {
    const key = [latStartDeg, lonStartDeg, latEndDeg, lonEndDeg].join(',');

    if (distanceCollection[key]) {
        return distanceCollection[key];
    }

    const latStart = degToRad(latStartDeg);
    const lonStart = degToRad(lonStartDeg);
    const latEnd = degToRad(latEndDeg);
    const lonEnd = degToRad(lonEndDeg);

    const latShift = latEnd - latStart;
    const lonShift = lonEnd - lonStart;

    const a = (sin(latShift / 2) * sin(latShift / 2)) +
        (cos(latStart) * cos(latEnd) * sin(lonShift / 2) * sin(lonShift / 2));

    const c = 2 * atan2(sqrt(a), sqrt(1 - a));

    const distance = EARTH_RADIUS * c;

    distanceCollection[key] = distance;

    return distance;

    // const R = 6371; // Radius of the earth in km
    // const dLat = degToRad(lat2 - lat1); // deg2rad below
    // const dLon = degToRad(lon2 - lon1);
    // const a = (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
    //     (Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2));

    // const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // const d = R * c; // Distance in km
    // return d;
};

const getPase = (track, index) => {
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

    if (distance === 0) {
        return 10;
    }

    return (time / distance) / 1000 / 60;
};

export const prepareSvgData = (track) => {
    const firstPoint = track[0];
    const lastPoint = track[track.length - 1];

    const startTime = firstPoint.time;
    const endTime = lastPoint.time;
    const trackTime = endTime - startTime;

    return track.map(({lat, lon, elevation, time}, index) => ({
        lat,
        lon,
        elevation,
        pase: getPase(track, index),
        timeFromStart: time - startTime,
        timePart: (time - startTime) / trackTime,
    }));
};
