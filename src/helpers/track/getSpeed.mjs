import getDistance from './getDistance';


const getSpeed = ({size, time, coords}) => {
    const speed = [0];

    for (let i = 1; i < size; i++) {
        const pointDistance = getDistance(coords[i - 1], coords[i]);
        const pointTime = time[i] - time[i - 1];

        speed[i] = pointDistance / pointTime;
    }

    // eslint-disable-next-line prefer-destructuring
    speed[0] = speed[1];

    return speed;
};


export default getSpeed;
