import {memoize} from 'helpers';


const calculateBounds = (points) => {
    if (points.length === 0) {
        return [0, 0, 0, 0];
    }

    let [minLat, minLon] = points[0];
    let [maxLat, maxLon] = points[0];

    for (let i = 1; i < points.length; i++) {
        const [lat, lon] = points[i];

        if (lat < minLat) minLat = lat;
        if (lon < minLon) minLon = lon;
        if (lat > maxLat) maxLat = lat;
        if (lon > maxLon) maxLon = lon;
    }

    return [[minLat, minLon], [maxLat, maxLon]];
};


export default memoize(calculateBounds);
