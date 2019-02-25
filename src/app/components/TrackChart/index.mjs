
import {connect} from 'react-redux';
import {compose} from 'recompose';
import TrackChart from './TrackChart';

const mapStateToProps = ({
    gpxContent: {track},
}) => ({
    track,
});

export default compose(
    connect(mapStateToProps),
)(TrackChart);
