
export const getPaseBySpeed = speed => (1 / speed / 60) * 1000; // pase in min/km by speed in m/s

export const stringifyPase = (pase) => {
    const minutes = Math.floor(pase);

    const seconds = Math.round((pase % 1) * 60);

    return `${minutes}:${seconds}`;
};
