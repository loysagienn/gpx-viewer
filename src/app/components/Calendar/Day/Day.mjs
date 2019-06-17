/** @jsx createElement */

import {createElement, PureComponent, Fragment} from 'react';
import {cn} from 'helpers';
import {connect} from 'react-redux';
import {changeMonth as changeMonthAction} from 'app/actions';
import css from './Day.styl';

const renderDistance = (distance) => {
    distance = Math.round(distance);

    if (distance < 1000) {
        return `${distance} метров`;
    }

    const val = Math.round(distance / 10) / 100;

    return `${val} км`;
};

const renderTime = (time) => {
    const totalTimeInSeconds = Math.round(time);

    const seconds = totalTimeInSeconds % 60;

    const leftTimeInMinutes = Math.round((time - seconds) / 60);

    const minutes = leftTimeInMinutes % 60;

    const hours = Math.round((leftTimeInMinutes - minutes) / 60);

    const totalStr = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    if (!hours) {
        return totalStr;
    }

    return `${hours}:${totalStr}`;
};

const enhance = connect(null, {changeMonth: changeMonthAction});

const renderActivity = (activity) => {
    if (!activity) {
        return (
            <div className={css.activity}>
                Нет тренировок
            </div>
        );
    }
    const {name, distance, elapsedTime} = activity;

    return (
        <div className={css.activity}>
            <div className={css.activityName}>
                {name}
            </div>
            <div className={css.activityDistance}>
                {renderDistance(distance)}
            </div>
            <div className={css.activityTime}>
                {renderTime(elapsedTime)}
            </div>
        </div>
    );
};

class Day extends PureComponent {
    render() {
        const {dayKey, title, isWeekEnd, isFutureDay, isEmpty, activities} = this.props;

        const dayActivities = activities[dayKey];

        const activity = dayActivities ? dayActivities[0] : null;

        const activityNode = renderActivity(activity);

        if (isEmpty) {
            return (
                <div className={css.dayWrapper}><div className={css.spacer}/></div>
            );
        }

        const dayNode = createElement(
            activity ? 'a' : 'div',
            {
                className: cn(
                    css.day,
                    isWeekEnd && css.isWeekEnd,
                    (isFutureDay || !activity) && css.disabled,
                ),
                href: activity ? `https://www.strava.com/activities/${activity.id}` : undefined,
            },
            (
                <Fragment>
                    <div className={css.dayTitle}>
                        {title}
                    </div>
                    {activityNode}
                </Fragment>
            ),
        );

        return (
            <div className={css.dayWrapper} key={dayKey}>
                <div className={css.spacer}/>
                {dayNode}
            </div>
        );
    }
}


export default enhance(Day);
