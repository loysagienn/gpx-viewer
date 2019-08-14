/** @jsx createElement */

import {createElement, PureComponent} from 'react';
import {compose, withProps} from 'recompose';
import {connect} from 'react-redux';
import {selectMonthActivitiesSummary, selectTodayKey} from 'app/selectors';
import {memoizedGetMonth} from './helpers';
import Day from '../Day';
import css from './Calendar.styl';


const mapStateToProps = (state, {monthKey}) => ({
    activities: selectMonthActivitiesSummary(monthKey)(state),
    todayKey: selectTodayKey(state),
});

const enhance = compose(
    connect(mapStateToProps),
    withProps(({monthKey, todayKey}) => memoizedGetMonth(monthKey, todayKey)),
);

class Month extends PureComponent {
    render() {
        const {title, days, activities} = this.props;

        return (
            <div className={css.month}>
                <div className={css.monthTitle}>
                    {title}
                </div>
                <div className={css.monthDays}>
                    {
                        days.map(day => createElement(Day, {
                            key: day.dayKey,
                            activities: activities[day.dayKey],
                            dayInfo: day,
                        }))
                    }
                </div>
            </div>
        );
    }
}

export default enhance(Month);
