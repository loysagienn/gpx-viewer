
import {connect} from 'react-redux';
import {compose, withHandlers} from 'recompose';
import {ROUTES_IDS} from 'router';
import {selectActivityUrl} from 'app/selectors';
import {pushRoute as pushRouteAction} from 'app/actions';
import ActivityInfo from './ActivityInfo';

const mapStateToProps = (state, {id}) => ({
    activityUrl: selectActivityUrl(id)(state),
});

const mapDispatchToProps = {pushRoute: pushRouteAction};

const withShowActivity = withHandlers({
    showActivity: ({pushRoute, id: activityId}) => () => pushRoute({
        id: ROUTES_IDS.ACTIVITY,
        params: {activityId},
    }),
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withShowActivity,
)(ActivityInfo);
