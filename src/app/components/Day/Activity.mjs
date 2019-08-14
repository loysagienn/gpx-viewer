/** @jsx createElement */

import {createElement} from 'react';
import {getDistanceStr} from 'helpers/activity';
import css from './Day.styl';


const Activity = ({name, distance}) => (
    <div className={css.activity}>
        <div className={css.activityName}>
            {name}
        </div>
        <div className={css.activityDistance}>
            {`${getDistanceStr(distance).join(' ')}`}
        </div>
        {/* <div className={css.activityTime}>
            {getTimeStr(elapsedTime)}
        </div> */}
    </div>
);


export default Activity;
