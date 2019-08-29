import {memoize} from 'helpers';


const smoothCoef = 4;

const getMinMax = memoize((values) => {
    // const min = Math.min(...values);
    const min = 0;
    const max = Math.max(...values);

    return [min, max];
});

const smoothLine = (values) => {
    const coef = 0;

    const result = [];
    const maxIndex = values.length - 1;

    for (let i = 0; i <= maxIndex; i++) {
        const startIndex = Math.max(i - coef, 0);
        const endIndex = Math.min(i + coef, maxIndex);

        const count = (endIndex - startIndex) + 1;
        let summ = 0;

        for (let j = startIndex; j <= endIndex; j++) {
            summ += values[j];
        }

        result.push(summ / count);
    }

    return result;
};

const prettifyLine = memoize((values, width, pixelRatio) => {
    const pointsCount = Math.round(width / (smoothCoef * pixelRatio));

    if (values.length / 2 < pointsCount) {
        return values;
    }

    const roundPointsCount = Math.floor(values.length / pointsCount);

    const result = [];

    const maxIndex = values.length - roundPointsCount;
    let index = 0;

    while (index < maxIndex) {
        let val = 0;
        const nextIndex = index + roundPointsCount;
        for (let j = index; j < nextIndex; j++) {
            val += values[j];
        }

        result.push(val / roundPointsCount);

        index += roundPointsCount;
    }

    let lastCount = 0;
    let val = 0;

    while (index < values.length) {
        lastCount++;
        val += values[index];
        index++;
    }

    result.push(val / lastCount);

    // return result;
    return smoothLine(result);
});

const getCoords = (values, width, height) => {
    const [min, max] = getMinMax(values);
    const valueHeight = max - min;
    const indexWidth = values.length - 1;

    const yCoef = (height / valueHeight) * 0.9;
    const xCoef = width / indexWidth;

    const coords = [];

    for (let i = 0; i < values.length; i++) {
        const x = i * xCoef;
        const y = (height * 0.95) - ((values[i] - min) * yCoef);

        coords.push([x, y]);
    }

    return coords;
};

const getAngles = (coords) => {
    const angles = [];

    for (let i = 0; i < coords.length - 1; i++) {
        const [startX, startY] = coords[i];
        const [endX, endY] = coords[i + 1];

        const shiftX = endX - startX;
        const shiftY = endY - startY;

        angles.push(Math.atan(shiftY / shiftX));
    }

    angles.push(angles[angles.length - 1]);

    return angles;
};

const renderLine = (ctx, values, width, height, color, pixelRatio) => {
    width *= pixelRatio;
    height *= pixelRatio;

    values = prettifyLine(values, width, pixelRatio);

    const coords = getCoords(values, width, height);
    const angles = getAngles(coords);

    const [firstX, firstY] = coords[0];

    ctx.beginPath();
    ctx.moveTo(Math.round(firstX), Math.round(firstY));
    let prevPointAngle = angles[0];

    for (let i = 1; i < coords.length; i++) {
        const [prevX, prevY] = coords[i - 1];
        const [currX, currY] = coords[i];
        const shiftX = currX - prevX;
        // const shiftY = currY - prevY;

        const currPointAngle = (angles[i - 1] + angles[i]) / 2;

        const shiftLength = shiftX / 2;
        // const shiftLength = Math.sqrt((shiftX * shiftX) + (shiftY * shiftY));

        const prevShiftX = prevX + (shiftLength * Math.cos(prevPointAngle));
        const prevShiftY = prevY + (shiftLength * Math.sin(prevPointAngle));

        const currShiftX = currX - (shiftLength * Math.cos(currPointAngle));
        const currShiftY = currY - (shiftLength * Math.sin(currPointAngle));

        // ctx.lineTo(currX, currY);
        ctx.bezierCurveTo(prevShiftX, prevShiftY, currShiftX, currShiftY, currX, currY);

        prevPointAngle = currPointAngle;
    }

    ctx.strokeStyle = color;
    ctx.stroke();
};

export default renderLine;
