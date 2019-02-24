
import {connect} from 'react-redux';
import {compose, branch, renderNothing} from 'recompose';
import TrackMap from './TrackMap';

const mapStateToProps = ({
    gpxContent,
    ymaps: {
        initialized,
        map,
    },
}) => ({
    gpxContent,
    initialized,
    map,
});

export default compose(
    connect(mapStateToProps),
    branch(
        ({initialized}) => !initialized,
        renderNothing,
    ),
)(TrackMap);
