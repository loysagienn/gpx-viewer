
import {connect} from 'react-redux';
import {compose} from 'recompose';
import AthleteLayout from './AthleteLayout';

const mapStateToProps = ({
    athlete: athleteInfo,
    activities,
}) => ({
    athleteInfo,
    activities,
});

export default compose(
    connect(mapStateToProps),
)(AthleteLayout);
