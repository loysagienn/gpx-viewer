
import {connect} from 'react-redux';
import {compose} from 'recompose';
import StravaAuth from './StravaAuth';

const mapStateToProps = ({
    meta: {origin},
}) => ({
    origin,
});

export default compose(
    connect(mapStateToProps),
)(StravaAuth);
