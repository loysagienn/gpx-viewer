import {ROUTES_IDS} from 'router';


const isDemoRoute = route => (
    route.id === ROUTES_IDS.DEMO ||
    route.id === ROUTES_IDS.DEMO_ACTIVITY
);


export default isDemoRoute;
