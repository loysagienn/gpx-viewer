import {createSelector} from 'reselect';
import {stringifyDateDay} from 'helpers/date';
import {memoizeByStringParam} from 'helpers';


export const selectActivities = monthKey => state => state.activities[monthKey];


export const selectMonthActivities = memoizeByStringParam(monthKey => createSelector(
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
