import {DEFAULT_MONTH_COUNT} from 'constants';
import {stringifyDateMonth} from 'helpers/date';


const getMonthKeys = (monthCount) => {
    const date = new Date();
    const months = [];

    while (monthCount--) {
        months.push(stringifyDateMonth(date));

        date.setMonth(date.getMonth() - 1);
    }

    return months;
};

const normalizeActivities = (monthsKeys, activities) => activities.reduce(
    ({activitiesSummary, activitiesByMonth}, monthActivities, index) => {
        const monthKey = monthsKeys[index];
        const monthActivitiesIds = [];

        monthActivities.forEach((activity) => {
            activitiesSummary[activity.id] = activity;
            monthActivitiesIds.push(activity.id);
        });

        activitiesByMonth[monthKey] = monthActivitiesIds;

        return {activitiesSummary, activitiesByMonth};
    },
    {activitiesSummary: {}, activitiesByMonth: {}},
);

const getActivitiesSummary = async (api, credentials, route, monthCount = DEFAULT_MONTH_COUNT) => {
    const monthsKeys = getMonthKeys(monthCount);

    const activities = await Promise.all(
        monthsKeys.map(month => api.getAthleteActivities(credentials, month, route.queryParams.ignoreCache)),
    );

    return normalizeActivities(monthsKeys, activities);
};


export default getActivitiesSummary;
