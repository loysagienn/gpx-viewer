/** @jsx createElement */

import {createElement} from 'react';
import {ROUTES_IDS} from 'router';
import css from './App.styl';
// import TrackMap from '../TrackMap';
// import TrackChart from '../TrackChart';
import NotFound from '../NotFound';
import StravaAuth from '../StravaAuth';

const renderActivity = ({name, distance, startDate}) => (
    <div className={css.activity}>
        {`${name}, ${distance} метров, дата: ${startDate}`}
    </div>
);

const renderContent = ({route, athlete}) => {
    if (route.id === ROUTES_IDS.NOT_FOUND) {
        return (
            <NotFound route={route}/>
        );
    }

    if (athlete) {
        return (
            <div>
                <img src={athlete.info.profile} alt="user"/>
                <div>
                    {`Добро пожаловать, ${athlete.info.firstname} ${athlete.info.lastname}`}
                </div>
                <div>
                    Последние 10 активностей:
                </div>
                {athlete.activities.map(renderActivity)}
            </div>
        );
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
