import {createSelector} from 'reselect';
import {stringifyDateDay, stringifyDateMonth, getDateFromDayKey} from 'helpers/date';
import {memoize} from 'helpers';


export const selectActivities = monthKey => state => state.activities[monthKey];

export const selectMonthActivities = memoize(monthKey => createSelector(
    [selectActivities(monthKey)],
    (activities) => {
        if (!activities) {
            return {};
        }

        return activities.reduce((acc, activity) => {
            const activityDate = new Date(activity.startDate);

            const monthDayKey = stringifyDateDay(activityDate);

            if (!acc[monthDayKey]) {
                acc[monthDayKey] = [];
            }

            acc[monthDayKey].push(activity);

            return acc;
        }, {});
    },
));

export const selectActiveDayKey = state => state.activeDayKey;

export const selectDayActivities = dayKey => (state) => {
    const monthKey = stringifyDateMonth(getDateFromDayKey(dayKey));

    const monthActivities = selectMonthActivities(monthKey)(state);

    return monthActivities[dayKey] || [];
};

export const selectActiveDayActivities = (state) => {
    const activeDayKey = selectActiveDayKey(state);

    if (!activeDayKey) {
        return null;
    }

    return selectDayActivities(activeDayKey)(state);
};

export const selectTodayKey = state => state.todayKey;
