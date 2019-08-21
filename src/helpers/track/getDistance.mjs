const EARTH_RADIUS = 6371000; // Radius of the earth in meters
const {sin, cos, atan2, sqrt} = Math;
const degToRad = deg => deg * (Math.PI / 180);

const getDistance = ([latStartDeg, lonStartDeg], [latEndDeg, lonEndDeg]) => {
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

    return distance;
};


export default getDistance;
