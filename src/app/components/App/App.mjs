/** @jsx createElement */

import {createElement} from 'react';
import css from './App.styl';
import TrackMap from '../TrackMap';
import TrackChart from '../TrackChart';
import StravaAuth from '../StravaAuth';

const App = () => (
    <div className={css.app}>
        {/* <TrackMap className={css.trackMap}/>
        <TrackChart className={css.trackChart}/> */}
        <StravaAuth/>
    </div>
);

export default App;
