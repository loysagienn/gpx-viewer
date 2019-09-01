/** @jsx createElement */

import {createElement} from 'react';
import css from './TrackMap.styl';
import {cn} from '../../../helpers';


const EmptyPlaceholder = ({className}) => (
    <div
        className={cn(css.emptyPlaceholder, className)}
    />
);


export default EmptyPlaceholder;
