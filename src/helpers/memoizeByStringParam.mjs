export default (func) => {
    const cache = {};

    return str => (cache[str] || (cache[str] = func(str)));
};
