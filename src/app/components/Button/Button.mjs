/** @jsx createElement */

import {createElement} from 'react';
import {cn} from '../../../helpers';
import css from './Button.styl';

const Button = ({
    className,
    children,
    href,
    onClick = () => {},
    target,
    size = 'm',
    theme = 'action',
}) => {
    const buttonClassName = cn(css.button, className, css[`size_${size}`], css[`theme_${theme}`]);

    if (href) {
        return (
            <a
                href={href}
                className={buttonClassName}
                onClick={onClick}
                target={target}
            >
                {children}
            </a>
        );
    }

    return (
        <div
            className={buttonClassName}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Button;
