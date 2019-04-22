/** @jsx createElement */

import {createElement} from 'react';
import {ROUTES_IDS} from 'router';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRoute} from 'app/hocs';
import NotFound from '../NotFound';
import StravaAuth from '../StravaAuth';
import AthleteLayout from '../AthleteLayout';


const mapStateToProps = ({athlete}) => ({athlete});

const enhance = compose(
    withRoute,
    connect(mapStateToProps),
);

const AppContent = ({route, athlete}) => {
    if (route.id === ROUTES_IDS.NOT_FOUND) {
        return (
            <NotFound route={route}/>
        );
    }

    if (route.id === ROUTES_IDS.ACTIVITY) {
        return route.params.activityId;
    }

    if (athlete) {
        return (
            <AthleteLayout/>
        );
    }

    return (
        <StravaAuth/>
    );
};

export default enhance(AppContent);
