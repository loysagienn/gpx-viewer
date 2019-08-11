
import {connect} from 'react-redux';
import {compose, branch, renderNothing, withProps} from 'recompose';
import {decodePolyline} from 'helpers/activity';
import TrackMap from './TrackMap';

const mapStateToProps = ({
    ymaps: {
        initialized,
        map,
    },
}) => ({
    initialized,
    map,
});

const withPolylineProps = withProps(({polyline}) => ({polylinePoints: decodePolyline(polyline)}));

export default compose(
    connect(mapStateToProps),
    branch(
        ({initialized}) => !initialized,
        renderNothing,
    ),
    withPolylineProps,
)(TrackMap);
