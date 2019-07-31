/** @jsx createElement */

import {createElement} from 'react';
import {SvgCross} from '../Svg';
import ActivityInfo from '../ActivityInfo';
import {getDateStr} from './helpers';
import css from './DayActivities.styl';


const renderActivity = activity => createElement(ActivityInfo, {key: activity.id, ...activity});

const DayActivities = ({dayKey, activities, close}) => {
    if (!dayKey) {
        return null;
    }

    return (
        <div className={css.popup}>
            <div className={css.header}>
                <div>
                    {getDateStr(dayKey)}
                </div>
                <div
                    className={css.closeBtn}
                    onClick={close}
                >
                    <SvgCross className={css.crossIcon}/>
                </div>
            </div>
            {activities.map(renderActivity)}
        </div>
    );
};


export default DayActivities;
