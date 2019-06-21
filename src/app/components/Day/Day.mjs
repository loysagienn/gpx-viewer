/** @jsx createElement */

import {createElement, PureComponent} from 'react';
import {cn} from 'helpers';
import {connect} from 'react-redux';
import {showDay as showDayAction} from 'app/actions';
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

class Day extends PureComponent {
    render() {
        const {dayKey, monthDay, monthGenitive, isWeekEnd, isFutureDay, isEmpty, activities, showDay} = this.props;

        const activitiesNode = renderActivities(activities);

        if (isEmpty) {
            return (
                <div className={css.dayWrapper}><div className={css.spacer}/></div>
            );
        }

        const dayClassName = cn(
            css.day,
            isWeekEnd && css.isWeekEnd,
            (isFutureDay || !activities) && css.disabled,
        );

        return (
            <div className={css.dayWrapper} key={dayKey}>
                <div className={css.spacer}/>
                <div
                    className={dayClassName}
                    onClick={() => showDay(dayKey)}
                >
                    <div className={css.dayTitle}>
                        <span>{monthDay}</span>
                        <span className={css.monthGenitive}>{` ${monthGenitive}`}</span>
                    </div>
                    <div className={css.activities}>
                        {activitiesNode}
                    </div>
                </div>
            </div>
        );
    }
}


const enhance = connect(null, {showDay: showDayAction});

export default enhance(Day);
