
const getClosedTransform = (targetRect, popup) => {
    const scaleX = Math.round(100 * (targetRect.width / popup.offsetWidth)) / 100;
    const scaleY = Math.round(100 * (targetRect.height / popup.offsetHeight)) / 100;
    const translateX = 0;
    const translateY = 0;

    return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
};

const getTargetX = (origin, width) => {
    if (origin === 'right') {
        return width;
    }

    if (origin === 'left') {
        return 0;
    }

    if (origin === 'center') {
        return width / 2;
    }

    return 0;
};

const getTargetY = (origin, height) => {
    if (origin === 'top') {
        return 0;
    }

    if (origin === 'bottom') {
        return height;
    }

    if (origin === 'center') {
        return height / 2;
    }

    return 0;
};


const getShownTransform = (targetRect, popupNode, targetOrigin = '', popupOrigin = '') => {
    const {offsetWidth: popupWidth, offsetHeight: popupHeight} = popupNode;
    const [xTargetOrigin = 'left', yTargetOrigin = 'bottom'] = targetOrigin.split(' ');
    const [xPopupOrigin = 'left', yPopupOrigin = 'top'] = popupOrigin.split(' ');

    const targetX = getTargetX(xTargetOrigin, targetRect.width);
    const targetY = getTargetY(yTargetOrigin, targetRect.height);
    const popupX = getTargetX(xPopupOrigin, popupWidth);
    const popupY = getTargetY(yPopupOrigin, popupHeight);

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
