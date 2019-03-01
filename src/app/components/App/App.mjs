/** @jsx createElement */

import {createElement} from 'react';
import {ROUTES_IDS} from 'router';
import css from './App.styl';
// import TrackMap from '../TrackMap';
// import TrackChart from '../TrackChart';
import NotFound from '../NotFound';
import StravaAuth from '../StravaAuth';

const renderContent = (route) => {
    if (route.id === ROUTES_IDS.NOT_FOUND) {
        return (
            <NotFound route={route}/>
        );
    }

    return (
        <StravaAuth/>
    );
};

const App = ({route}) => (
    <div className={css.app}>
        {/* <TrackMap className={css.trackMap}/>
        <TrackChart className={css.trackChart}/> */}
        {
            renderContent(route)
        }
    </div>
);

export default App;
