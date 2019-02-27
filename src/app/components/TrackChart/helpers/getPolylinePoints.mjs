
export default ({points, maxSpeed}, width, height) => {
    const speedAxisSize = maxSpeed + 1;
    const getTimeCoords = ({timeSpot}) => timeSpot * width;
    const getSpeedCoords = ({speed}) => ((speedAxisSize - speed) / speedAxisSize) * height;

    return points.map(point => `${getTimeCoords(point)},${getSpeedCoords(point)}`).join(' ');
};
