import {memoize} from 'helpers';
import {getDevicePixelRatio} from 'env';


const pointInterval = 2;

const compressValues = (values, width) => {
    const devicePointInterval = pointInterval * getDevicePixelRatio();
    const originalPointsCount = values.length;
    const expectCompressedPointsCount = Math.round(width / devicePointInterval);
    const combinePointsInterval = Math.round(originalPointsCount / expectCompressedPointsCount);
    const compressedValues = [];

    // Индекс предпоследней точки
    const penultimatePointIndex = originalPointsCount - combinePointsInterval;
    let index = 0;

    while (index < penultimatePointIndex) {
        let val = 0;

        const nextIndex = index + combinePointsInterval;

        for (let i = index; i < nextIndex; i++) {
            val += values[i];
        }

        compressedValues.push(val / combinePointsInterval);

        index = nextIndex;
    }

    const lastPointCombineInterval = originalPointsCount - index;
    let lastPointTotalVal = 0;

    while (index < originalPointsCount) {
        lastPointTotalVal += values[index];
        index++;
    }

    compressedValues.push(lastPointTotalVal / lastPointCombineInterval);

    return compressedValues;
};


export default memoize(compressValues);
