import {createSelector} from 'reselect';
import {stringifyDateDay, stringifyDateMonth, getDateFromDayKey} from 'helpers/date';
import {memoize} from 'helpers';
import {ROUTES_IDS, getUrlByRoute} from 'router';


export const selectActivitiesSummary = state => state.activitiesSummary;

export const selectActivitiesByMonth = state => state.activitiesByMonth;

export const selectActivityById = memoize(activityId => createSelector(
    selectActivitiesSummary,
    activities => activities[activityId],
));

export const selectMonthActivitiesIds = memoize(monthKey => createSelector(
    selectActivitiesByMonth,
    activitiesByMonth => activitiesByMonth[monthKey],
));

export const selectMonthActivitiesSummary = memoize(monthKey => createSelector(
    selectMonthActivitiesIds(monthKey),
    selectActivitiesSummary,
    (activitiesIds, activities) => {
        if (!activitiesIds) {
            return {};
        }

        return activitiesIds.reduce((acc, activityId) => {
            const activity = activities[activityId];

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

export const selectRoute = state => state.route;

export const selectActiveDayKey = state => state.activeDayKey;

export const selectDayActivities = memoize(dayKey => (state) => {
    const monthKey = stringifyDateMonth(getDateFromDayKey(dayKey));

    const monthActivitiesSummary = selectMonthActivitiesSummary(monthKey)(state);

    return monthActivitiesSummary[dayKey] || [];
});

export const selectActiveDayActivities = (state) => {
    const activeDayKey = selectActiveDayKey(state);

    if (!activeDayKey) {
        return null;
    }

    return selectDayActivities(activeDayKey)(state);
};

export const selectTodayKey = state => state.todayKey;

export const selectActivityUrl = activityId => () => getUrlByRoute(
    ROUTES_IDS.ACTIVITY,
    {activityId},
);
