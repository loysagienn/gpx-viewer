
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {withRoute} from 'app/hocs';
import App from './App';

const mapStateToProps = ({athlete}) => ({athlete});

export default compose(
    withRoute,
    connect(mapStateToProps),
)(App);
