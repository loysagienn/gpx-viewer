
import {YMAPS_JSONP_CALLBACK} from 'config';
import {initYmaps as initYmapsAction} from '../actions';

const initYmapsCallback = ({dispatch}) => ymaps => dispatch(initYmapsAction(ymaps));

export const initYmaps = (store) => {
    window[YMAPS_JSONP_CALLBACK] = initYmapsCallback(store);
};
