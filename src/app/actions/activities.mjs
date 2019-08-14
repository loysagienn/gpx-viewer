
export const ADD_ACTIVITIES_SUMMARY = 'ADD_ACTIVITIES_SUMMARY';
export const LOAD_ACTIVITY_INFO = 'LOAD_ACTIVITY_INFO';
export const LOAD_ACTIVITY_INFO_DONE = 'LOAD_ACTIVITY_INFO_DONE';
export const LOAD_ACTIVITY_INFO_FAIL = 'LOAD_ACTIVITY_INFO_FAIL';


export const addActivitiesSummary = (monthKey, activities) => ({
    type: ADD_ACTIVITIES_SUMMARY,
    monthKey,
    activities,
});

export const getActivityInfo = activityId => async (dispatch, getState, api) => {
    dispatch({type: LOAD_ACTIVITY_INFO, activityId});

    return api.getActivityInfo(activityId)
        .then(activityInfo => dispatch({type: LOAD_ACTIVITY_INFO_DONE, activityId, activityInfo}))
        .catch(error => dispatch({type: LOAD_ACTIVITY_INFO_FAIL, activityId, error}));
};
