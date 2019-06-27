/** @jsx createElement */

import {createElement} from 'react';
import {cn} from 'helpers';
import css from './Popup.styl';


const Popup = ({children, className}) => (
    <div className={cn(css.popup, className)}>
        {children}
    </div>
);


export default Popup;
