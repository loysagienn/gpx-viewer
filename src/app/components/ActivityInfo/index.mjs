
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {selectActivityUrl} from 'app/selectors';
import ActivityInfo from './ActivityInfo';

const mapStateToProps = (state, {id}) => ({
    activityUrl: selectActivityUrl(id)(state),
});

export default compose(
    connect(mapStateToProps),
)(ActivityInfo);
