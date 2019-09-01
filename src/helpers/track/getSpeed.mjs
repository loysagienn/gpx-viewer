import getDistance from './getDistance';


const getSpeed = ({size, time, coords}) => {
    const speed = [0];
    let min = 0;
    let max = 0;

    for (let i = 1; i < size; i++) {
        const pointDistance = getDistance(coords[i - 1], coords[i]);
        const pointTime = time[i] - time[i - 1];

        const pointSpeed = pointDistance / pointTime;

        if (pointSpeed > max) {
            max = pointSpeed;
        }

        if (pointSpeed < min) {
            min = pointSpeed;
        }

        speed[i] = pointSpeed;
    }

    // eslint-disable-next-line prefer-destructuring
    speed[0] = speed[1];

    return [speed, min, max];
};


export default getSpeed;
