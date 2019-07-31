/** @jsx createElement */

import {createElement} from 'react';
import {cn} from 'helpers';
import css from './Day.styl';
import Activity from './Activity';


const renderActivities = (activities) => {
    if (!activities || activities.length === 0) {
        return (
            <div className={css.emptyPlaceholder}>
                <div>Нет</div>
                <div>тренировок</div>
            </div>
        );
    }

    return activities.map(activity => (
        <Activity key={activity.id} {...activity}/>
    ));
};

const DayContent = ({dayInfo, activities, onClick, disabled}) => {
    const {monthDay, monthGenitive, isWeekEnd} = dayInfo;

    const dayClassName = cn(
        css.day,
        isWeekEnd && css.isWeekEnd,
        disabled && css.disabled,
    );

    const activitiesNode = renderActivities(activities);

    return (
        <div className={dayClassName} onClick={() => !disabled && onClick()}>
            <div className={css.dayTitle}>
                <span>{monthDay}</span>
                <span className={css.monthGenitive}>{` ${monthGenitive}`}</span>
            </div>
            <div className={css.activities}>
                {activitiesNode}
            </div>
        </div>
    );
};


export default DayContent;
