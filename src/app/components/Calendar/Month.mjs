/** @jsx createElement */

import {createElement, PureComponent} from 'react';
import {compose, withProps} from 'recompose';
import {connect} from 'react-redux';
import {getMonth} from './helpers';
import Day from './Day';
import css from './Calendar.styl';


const getActivitiesByTimestamp = (activities) => {
    if (!activities) {
        return {};
    }

    return activities.reduce((acc, activity) => {
        const activityDate = new Date(activity.startDate);

        activityDate.setHours(0, 0, 0, 0);

        const timestamp = activityDate.getTime();

        acc[timestamp] = activity;

        return acc;
    }, {});
};

const mapStateToProps = ({athlete: {activities}}, {monthKey}) => ({
    activities: getActivitiesByTimestamp(activities[monthKey]),
});

const enhance = compose(
    withProps(({offset}) => getMonth(offset)),
    connect(mapStateToProps),
);

class Month extends PureComponent {
    render() {
        const {title, days, activities} = this.props;

        console.log(`render month ${this.props.monthKey}`);

        return (
            <div className={css.month}>
                <div className={css.monthTitle}>
                    {title}
                </div>
                <div className={css.monthDays}>
                    {
                        days.map(day => createElement(Day, {key: day.timestamp, activities, ...day}))
                    }
                </div>
            </div>
        );
    }
}

export default enhance(Month);
