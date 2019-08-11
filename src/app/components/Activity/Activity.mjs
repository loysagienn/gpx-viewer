/** @jsx createElement */

import {createElement} from 'react';
import {cn} from 'helpers';
import TrackMap from '../TrackMap';
import css from './Activity.styl';


const Activity = ({activity, className}) => (
    <div className={cn(css.activity, className)}>
        <TrackMap
            className={css.map}
            polyline={activity.map.summaryPolyline}
        />
    </div>
);


export default Activity;
