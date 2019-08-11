import {memoize} from 'helpers';
import decodePolyline from './decodePolyline';

const skipPoints = (points) => {
    const step = Math.ceil(points.length / 100);

    let index = 0;
    const result = [];

    while (index < points.length) {
        result.push(points[index]);
        index += step;
    }

    return result;
};

const getPolylineMapUrl = (polyline) => {
    const polylinePoints = decodePolyline(polyline);

    const pointsStr = skipPoints(polylinePoints).map(([lon, lat]) => `${lat},${lon}`).join(',');

    return `https://static-maps.yandex.ru/1.x/?l=map&size=450,450&scale=1.5&pl=c:ff0000ff,w:3,${pointsStr}`;
};

export default memoize(getPolylineMapUrl);
