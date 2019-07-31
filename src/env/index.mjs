
// eslint-disable-next-line no-undef
export const nextFrame = typeof requestAnimationFrame === 'undefined' ? setTimeout : requestAnimationFrame;

export const addWindowEvent = (event, handler, options) => {
    if (typeof window === 'undefined') {
        return;
    }

    // eslint-disable-next-line no-undef
    window.addEventListener(event, handler, options);
};

export const removeWindowEvent = (event, handler, options) => {
    if (typeof window === 'undefined') {
        return;
    }

    // eslint-disable-next-line no-undef
    window.removeEventListener(event, handler, options);
};

// eslint-disable-next-line no-undef
export const locationAssign = url => (typeof window === 'undefined' ? null : window.location.assign(url));
