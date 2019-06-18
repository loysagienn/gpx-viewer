/** @jsx createElement */

import {createElement} from 'react';
import {getTimeStr, getDistanceStr} from './helpers';
import css from './Day.styl';


const Activity = ({name, distance, elapsedTime}) => (
    <div className={css.activity}>
        <div className={css.activityName}>
            {name}
        </div>
        <div className={css.activityDistance}>
            {`${getDistanceStr(distance)} / ${getTimeStr(elapsedTime)}`}
        </div>
        {/* <div className={css.activityTime}>
            {getTimeStr(elapsedTime)}
        </div> */}
    </div>
);


export default Activity;
