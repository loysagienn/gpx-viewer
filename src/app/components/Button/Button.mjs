/** @jsx createElement */

import {createElement} from 'react';
import {cn} from '../../../helpers';
import css from './Button.styl';

const Button = ({className, children, href, onClick = () => {}}) => {
    if (href) {
        return (
            <a
                href={href}
                className={cn(css.button, className)}
                onClick={onClick}
            >
                {children}
            </a>
        );
    }

    return (
        <div
            className={cn(css.button, className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Button;
