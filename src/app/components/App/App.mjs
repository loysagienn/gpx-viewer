/** @jsx createElement */

import {createElement} from 'react';
import {ROUTES_IDS} from 'router';
import css from './App.styl';
// import TrackMap from '../TrackMap';
// import TrackChart from '../TrackChart';
import NotFound from '../NotFound';
import StravaAuth from '../StravaAuth';

const renderContent = ({route, athlete}) => {
    if (route.id === ROUTES_IDS.NOT_FOUND) {
        return (
            <NotFound route={route}/>
        );
    }

    if (athlete) {
        return `Добро пожаловать, ${athlete.firstname} ${athlete.lastname}`;
    }

    return (
        <StravaAuth/>
    );
};

const App = props => (
    <div className={css.app}>
        {/* <TrackMap className={css.trackMap}/>
        <TrackChart className={css.trackChart}/> */}
        {
            renderContent(props)
        }
    </div>
);

export default App;
