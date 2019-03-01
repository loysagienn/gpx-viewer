/** @jsx createElement */

import {createElement} from 'react';
import {cn} from 'helpers';
import css from './Text.styl';

const Text = ({children, className, size = 4}) => (
    <div className={cn(className, css.text, css[`size-${size}`])}>
        {
            children
        }
    </div>
);

export default Text;
