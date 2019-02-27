
const EARTH_RADIUS = 6371000; // Radius of the earth in meters
const {sin, cos, atan2, sqrt} = Math;

const CALCULATED_DISTANCES = {};

const degToRad = deg => deg * (Math.PI / 180);

export default (latStartDeg, lonStartDeg, latEndDeg, lonEndDeg) => {
    const key = [latStartDeg, lonStartDeg, latEndDeg, lonEndDeg].join(',');

    if (CALCULATED_DISTANCES[key]) {
        return CALCULATED_DISTANCES[key];
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

    CALCULATED_DISTANCES[key] = distance;

    return distance;
};
