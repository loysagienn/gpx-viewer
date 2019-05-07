/** @jsx createElement */

import {createElement} from 'react';
import {getMonth} from './helpers';
import Day from './Day';
import css from './Calendar.styl';


const renderMonth = (offset) => {
    const {title, days} = getMonth(offset);

    return (
        <div className={css.month} key={offset}>
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
};

const Calendar = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
        months.push(i);
    }

    return (
        <div className={css.wrapper}>
            <div className={css.calendar}>
                {
                    months.map(renderMonth)
                }
            </div>
        </div>
    );
};

export default Calendar;
