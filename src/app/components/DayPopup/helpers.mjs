import {getDateFromDayKey} from 'helpers/date';
import {MONTH_NAMES_GENITIVE, WEEK_DAYS} from 'constants';

export const getDateStr = (dayKey) => {
    const date = getDateFromDayKey(dayKey);
    const year = date.getFullYear();
    const monthDay = date.getDate();
    const month = date.getMonth();
    const monthStr = MONTH_NAMES_GENITIVE[month];
    const weekDay = date.getDay();
    const weekDayStr = WEEK_DAYS[weekDay];

    const currentYear = (new Date()).getFullYear();

    if (currentYear !== year) {
        return `${monthDay} ${monthStr} ${year}, ${weekDayStr}`;
    }

    return `${monthDay} ${monthStr}, ${weekDayStr}`;
};
