import {getDevicePixelRatio} from 'env';
import decodePolyline from './decodePolyline';


const getMinMax = (points) => {
    if (points.length === 0) {
        return [0, 0, 0, 0];
    }
    let [minY, minX] = points[0];
    let [maxY, maxX] = points[0];

    for (let i = 1; i < points.length; i++) {
        const [y, x] = points[i];

        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    }

    return [minX, minY, maxX, maxY];
};

const getPolylineNode = points => (
    `<polyline stroke='red' stroke-opacity='0.3' stroke-width='3px' fill='none' stroke-linejoin='round' points='${points}'/>`
);

const getSvgNode = (width, height, content) => (
    `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'>${content}</svg>`
);

const getCssUrl = svg => (
    `url("data:image/svg+xml;utf8,${svg}")`
);

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

const getPolylineSvg = (polyline) => {
    const polylinePoints = decodePolyline(polyline);

    const [minX, minY, maxX, maxY] = getMinMax(polylinePoints);

    const coef = 300 / (maxX - minX);
    const padding = 3;
    const width = Math.round((maxX - minX) * coef) + (padding * 2);
    const height = Math.round((maxY - minY) * coef) + (padding * 2);

    const pointsStr = skipPoints(polylinePoints).map(([lon, lat]) => `${lat},${lon}`).join(',');

    // const mapSize = Math.round(getDevicePixelRatio() * 400);

    return `url(https://static-maps.yandex.ru/1.x/?l=map&size=450,450&scale=1.5&pl=c:ff0000ff,w:3,${pointsStr})`;

    // const getX = x => Math.round((x - minX) * coef) + padding;
    // const getY = y => height - (Math.round((y - minY) * coef) + padding);

    // const polylineStr = polylinePoints
    //     .map(([y, x]) => `${getX(x)},${getY(y)}`)
    //     .join(' ');

    // return [width, height, polylineStr];

    // return getCssUrl(getSvgNode(width, height, getPolylineNode(polylineStr)));
};

export default getPolylineSvg;
