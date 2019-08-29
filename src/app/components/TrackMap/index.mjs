
import {connect} from 'react-redux';
import {compose, branch, renderComponent, withProps} from 'recompose';
import {decodePolyline} from 'helpers/activity';
import TrackMap from './TrackMap';
import EmptyPlaceholder from './EmptyPlaceholder';


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
        renderComponent(EmptyPlaceholder),
    ),
    withPolylineProps,
)(TrackMap);
