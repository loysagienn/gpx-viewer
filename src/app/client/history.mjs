import {getUrlByRoute} from 'router';
import {selectRoute} from 'app/selectors';
import {pushRoute} from 'app/actions';


const {history} = window;

const onPopState = listener => window.addEventListener('popstate', listener);


export const initHistory = ({subscribe, getState, dispatch}) => {
    let currentRoute = selectRoute(getState());

    onPopState((event) => {
        const route = event.state;

        if (route) {
            currentRoute = route;
            dispatch(pushRoute(route));
        }
    });

    history.replaceState(currentRoute, '', getUrlByRoute(currentRoute));

    const callback = () => {
        const route = selectRoute(getState());

        if (route === currentRoute) {
            return;
        }

        const url = getUrlByRoute(route);

        history.pushState(route, '', url);

        currentRoute = route;
    };

    return subscribe(callback);
};
