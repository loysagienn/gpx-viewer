
import {connect} from 'react-redux';


export const withRoute = connect(({route}) => ({route}));
