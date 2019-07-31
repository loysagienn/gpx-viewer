import {getWindowSize} from 'env';

const getClosedTransform = (targetRect, popup) => {
    const scaleX = Math.round(100 * (targetRect.width / popup.offsetWidth)) / 100;
    const scaleY = Math.round(100 * (targetRect.height / popup.offsetHeight)) / 100;
    const translateX = 0;
    const translateY = 0;

    return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
};

const getTargetShift = (origin, size) => {
    if (origin === 'start') {
        return 0;
    }

    if (origin === 'end') {
        return size;
    }

    if (origin === 'center') {
        return size / 2;
    }

    return 0;
};

const getPopupShift = (origin, targetPos, targetSize, popupSize, windowSize) => {
    if (origin === 'start') {
        return 0;
    }

    if (origin === 'end') {
        return popupSize;
    }

    if (origin === 'center') {
        return popupSize / 2;
    }

    const shiftSize = (popupSize - targetSize) / 2;
    const halfSpace = (windowSize - targetSize) / 2;
    const coef = (halfSpace - targetPos) / halfSpace;
    const shift = shiftSize * coef;

    return (popupSize / 2) - shift;
};

const getShownTransform = (targetRect, popupNode, targetOrigin, popupOrigin) => {
    const {offsetWidth: popupWidth, offsetHeight: popupHeight} = popupNode;
    const [xTargetOrigin, yTargetOrigin] = targetOrigin;
    const [xPopupOrigin, yPopupOrigin] = popupOrigin;
    const [windowWidth, windowHeight] = getWindowSize();

    const targetX = getTargetShift(xTargetOrigin, targetRect.width);
    const targetY = getTargetShift(yTargetOrigin, targetRect.height);
    const popupX = getPopupShift(xPopupOrigin, targetRect.left, targetRect.width, popupWidth, windowWidth);
    const popupY = getPopupShift(yPopupOrigin, targetRect.top, targetRect.height, popupHeight, windowHeight);

    const translateX = targetX - popupX;
    const translateY = targetY - popupY;
    return `translate(${translateX}px, ${translateY}px) scale(1, 1)`;
};

const setPopupPosition = (targetNode, popupNode, shown, targetOrigin, popupOrigin) => {
    const targetRect = targetNode.getBoundingClientRect();
    // const popupRect = popupNode.getBoundingClientRect();

    if (shown) {
        popupNode.style.opacity = '1';
        popupNode.style.transform = getShownTransform(targetRect, popupNode, targetOrigin, popupOrigin);
    } else {
        popupNode.style.opacity = '0';
        popupNode.style.transform = getClosedTransform(targetRect, popupNode);
    }
};

export default setPopupPosition;
