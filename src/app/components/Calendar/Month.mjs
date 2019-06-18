/** @jsx createElement */

import {createElement, PureComponent} from 'react';
import {compose, withProps} from 'recompose';
import {connect} from 'react-redux';
import {selectMonthActivities} from 'app/selectors';
import {memoizedGetMonth} from './helpers';
import Day from '../Day';
import css from './Calendar.styl';


const mapStateToProps = (state, {monthKey}) => ({
    activities: selectMonthActivities(monthKey)(state),
});

const enhance = compose(
    withProps(({offset}) => memoizedGetMonth(offset)),
    connect(mapStateToProps),
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
                            ...day,
                        }))
                    }
                </div>
            </div>
        );
    }
}

export default enhance(Month);
