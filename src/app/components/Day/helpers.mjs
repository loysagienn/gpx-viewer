
export const getTimeStr = (time) => {
    const totalTimeInSeconds = Math.round(time);

    const seconds = totalTimeInSeconds % 60;

    const leftTimeInMinutes = Math.round((time - seconds) / 60);

    const minutes = leftTimeInMinutes % 60;

    const hours = Math.round((leftTimeInMinutes - minutes) / 60);

    if (!hours) {
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    }

    // if (seconds > 30) {
    //     if (minutes < 59) {
    //         minutes++;
    //     } else {
    //         hours++;
    //         minutes = 0;
    //     }
    // }

    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const getDistanceStr = (distance) => {
    distance = Math.round(distance);

    if (distance < 1000) {
        return `${distance} метров`;
    }

    const val = Math.round(distance / 100) / 10;

    return `${val} км`;
};
