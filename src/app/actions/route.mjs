import {ROUTES_IDS} from 'router';
import {loadError, DEFAULT_MONTH_COUNT} from 'constants';
import {selectActivityInfo, selectMonthsKeysCount} from 'app/selectors';
import {getActivityInfo, pushMonth} from 'app/actions';


export const PUSH_ROUTE = 'PUSH_ROUTE';


const loadPageData = (route, state, dispatch) => {
    if (route.id === ROUTES_IDS.ACTIVITY) {
        const {activityId} = route.params;

        const activityInfo = selectActivityInfo(activityId)(state);

        if (!activityInfo || activityInfo[loadError]) {
            dispatch(getActivityInfo(activityId));
        }
    }

    if (route.id === ROUTES_IDS.INDEX) {
        let monthsKeysCount = selectMonthsKeysCount(state);

        while (monthsKeysCount < DEFAULT_MONTH_COUNT) {
            dispatch(pushMonth());

            monthsKeysCount++;
        }
    }
};

export const pushRoute = route => async (dispatch, getState) => {
    loadPageData(route, getState(), dispatch);

    dispatch({type: PUSH_ROUTE, route});
};
