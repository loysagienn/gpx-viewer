import {withProps} from 'recompose';


const parseOrigin = (origin = '') => {
    let [first = 'center', second = 'center'] = origin.trim().split(/\s+/);

    const reversed = (
        first === 'bottom' ||
        first === 'top' ||
        (first === 'center' && (
            second === 'left' ||
            second === 'right'
        ))
    );

    if (reversed) {
        [first, second] = [second, first];
    }

    if (first !== 'center' && first !== 'auto') {
        if (first !== 'start' && first !== 'end') {
            if (first === 'left') {
                first = 'start';
            } else if (first === 'right') {
                first = 'end';
            } else {
                first = 'auto';
            }
        }
    }

    if (second !== 'center' && second !== 'auto') {
        if (second !== 'start' && second !== 'end') {
            if (second === 'top') {
                second = 'start';
            } else if (second === 'bottom') {
                second = 'end';
            } else {
                second = 'auto';
            }
        }
    }

    return [first, second];
};

const withOrigins = withProps(({targetOrigin, popupOrigin}) => {
    targetOrigin = parseOrigin(targetOrigin);
    popupOrigin = parseOrigin(popupOrigin);

    if (targetOrigin[0] === 'auto' || popupOrigin[0] === 'auto') {
        targetOrigin[0] = 'center';
    }

    if (targetOrigin[1] === 'auto' || popupOrigin[1] === 'auto') {
        targetOrigin[1] = 'center';
    }

    return {targetOrigin, popupOrigin};
});


export default withOrigins;
