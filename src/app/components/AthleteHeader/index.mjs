
import {connect} from 'react-redux';
import {compose} from 'recompose';
import AthleteHeader from './AthleteHeader';


const mapStateToProps = ({
    athlete: athleteInfo,
}) => ({
    athleteInfo,
});


export default compose(
    connect(mapStateToProps),
)(AthleteHeader);
