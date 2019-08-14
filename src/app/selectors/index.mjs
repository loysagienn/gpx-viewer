import {createSelector} from 'reselect';
import {last, length} from 'ramda';
import {stringifyDateDay, stringifyDateMonth, getDateFromDayKey} from 'helpers/date';
import {memoize} from 'helpers';
import {ROUTES_IDS, getUrlByRoute} from 'router';


export const selectActivitiesSummary = state => state.activitiesSummary;

export const selectActivitiesInfo = state => state.activitiesInfo;

export const selectActivitiesByMonth = state => state.activitiesByMonth;

export const selectRoute = state => state.route;

export const selectMonthsKeys = state => state.monthsKeys;

export const selectLastMonthKey = createSelector(selectMonthsKeys, last);

export const selectMonthsKeysCount = createSelector(selectMonthsKeys, length);

export const selectActivitySummaryById = memoize(activityId => createSelector(
    selectActivitiesSummary,
    activities => activities[activityId],
));

export const selectActivityInfo = memoize(activityId => createSelector(
    selectActivitiesInfo,
    activitiesInfo => activitiesInfo[activityId],
));

export const selectMonthActivitiesIds = memoize(monthKey => createSelector(
    selectActivitiesByMonth,
    activitiesByMonth => activitiesByMonth[monthKey],
));

// memoize - для того чтобы для одинаковых monthKey переиспользовать уже созданный селектор
// и не создавать новый
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

export const selectDayActivities = memoize(dayKey => (state) => {
    const monthKey = stringifyDateMonth(getDateFromDayKey(dayKey));

    const monthActivitiesSummary = selectMonthActivitiesSummary(monthKey)(state);

    return monthActivitiesSummary[dayKey] || [];
});

export const selectTodayKey = state => state.todayKey;

export const selectActivityUrl = activityId => () => getUrlByRoute(
    ROUTES_IDS.ACTIVITY,
    {activityId},
);
