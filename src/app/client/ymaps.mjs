
import {YMAPS_JSONP_CALLBACK} from '../../config';
import {initYmaps} from '../actions';

const initYmapsCallback = ({dispatch}) => ymaps => dispatch(initYmaps(ymaps));

export default (store) => {
    window[YMAPS_JSONP_CALLBACK] = initYmapsCallback(store);
};
