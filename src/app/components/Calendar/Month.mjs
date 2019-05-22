/** @jsx createElement */

import {createElement, PureComponent} from 'react';
import {getMonth} from './helpers';
import Day from './Day';
import css from './Calendar.styl';

class Month extends PureComponent {
    render() {
        const {offset} = this.props;
        const {title, days} = getMonth(offset);

        return (
            <div className={css.month}>
                <div className={css.monthTitle}>
                    {title}
                </div>
                <div className={css.monthDays}>
                    {
                        days.map(day => createElement(Day, {key: day.timestamp, ...day}))
                    }
                </div>
            </div>
        );
    }
}

export default Month;
