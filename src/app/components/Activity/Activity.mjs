/** @jsx createElement */

import {createElement} from 'react';
import {loading, loadError} from 'constants';
import {cn} from 'helpers';
import TrackMap from '../TrackMap';
import TrackLines from '../TrackLines';
import css from './Activity.styl';


const Activity = ({activity, className}) => {
    if (activity[loading]) {
        return 'loading';
    }

    if (activity[loadError]) {
        return 'load error';
    }

    return (
        <div className={cn(css.activity, className)}>
            <div className={css.header}>
                {activity.name}
            </div>
            <TrackMap
                className={css.map}
                polyline={activity.map.polyline}
            />
            <TrackLines
                className={css.trackLines}
                track={activity.track}
            />
        </div>
    );
};


export default Activity;
