const getClosedTransform = (targetRect, popup) => {
    const scaleX = Math.round(100 * (targetRect.width / popup.offsetWidth / 2)) / 100;
    const scaleY = Math.round(100 * (targetRect.height / popup.offsetHeight)) / 100;
    const translateX = targetRect.left + (targetRect.width / 4);
    const translateY = targetRect.top;

    return `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
};

const getShownTransform = (targetRect, popupNode, targetOrigin = '', popupOrigin = '') => {
    const {offsetWidth: popupWidth, offsetHeight: popupHeight} = popupNode;
    const [xTargetOrigin = 'left', yTargetOrigin = 'bottom'] = targetOrigin.split(' ');
    const [xPopupOrigin = 'left', yPopupOrigin = 'top'] = popupOrigin.split(' ');

    const targetX = xTargetOrigin === 'right' ? targetRect.right : targetRect.left;
    const targetY = yTargetOrigin === 'bottom' ? targetRect.bottom : targetRect.top;
    const popupX = xPopupOrigin === 'right' ? popupWidth : 0;
    const popupY = yPopupOrigin === 'bottom' ? popupHeight : 0;

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
