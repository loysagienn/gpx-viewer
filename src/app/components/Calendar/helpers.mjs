
import {stringifyDateDay, getDateFromDayKey, getDateFromMonthKey} from 'helpers/date';
import {memoize} from 'helpers';
import {MONTH_NAMES, MONTH_NAMES_GENITIVE} from 'constants';


const setWeekStart = (date) => {
    while (date.getDay() !== 1) {
        date.setHours(-24);
    }

    return date;
};

const getMonthDay = (date, currentYear, currentMonth, currentMonthDay, isEmpty = false) => {
    const dayKey = stringifyDateDay(date);
    const weekDay = date.getDay();
    const monthDay = date.getDate();
    const year = date.getFullYear();
    const month = date.getMonth();
    const isCurrentYear = year === currentYear;
    const isCurrentMonth = isCurrentYear && month === currentMonth;

    // Не показываем будущие недели
    if (isCurrentMonth && (weekDay === 1) && monthDay > currentMonthDay) {
        return null;
    }

    const isFutureDay = !isEmpty && isCurrentMonth && monthDay > currentMonthDay;
    const monthGenitive = MONTH_NAMES_GENITIVE[month];

    return {
        dayKey,
        monthDay,
        monthGenitive,
        isFutureDay,
        // суббота или воскресенье
        isWeekEnd: weekDay === 6 || weekDay === 0,
        month: date.getMonth(),
        isEmpty,
    };
};

export const getMonth = (monthKey, todayKey) => {
    const todayDate = getDateFromDayKey(todayKey);

    const currentYear = todayDate.getFullYear();
    const currentMonth = todayDate.getMonth();
    const currentMonthDay = todayDate.getDate();

    const date = getDateFromMonthKey(monthKey);

    const title = `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;

    const activeMonth = date.getMonth();

    const days = [];

    // устанавливаем начало недели
    setWeekStart(date);

    while (activeMonth !== date.getMonth()) {
        days.push(getMonthDay(date, currentYear, currentMonth, currentMonthDay, true));

        date.setHours(24);
    }

    while (activeMonth === date.getMonth()) {
        const day = (getMonthDay(date, currentYear, currentMonth, currentMonthDay));

        if (day === null) {
            break;
        }

        days.push(day);

        date.setHours(24);
    }

    return {title, days};
};

// кэшируем на сутки
const memoizeTimeout = 1000 * 60 * 60 * 24;

export const memoizedGetMonth = memoize(getMonth, memoizeTimeout);
