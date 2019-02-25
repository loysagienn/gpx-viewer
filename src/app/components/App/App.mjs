/** @jsx createElement */

import {createElement} from 'react';
import css from './App.styl';
import TrackMap from '../TrackMap';
import TrackChart from '../TrackChart';

const App = () => (
    <div className={css.app}>
        <TrackMap className={css.trackMap}/>
        <TrackChart className={css.trackChart}/>
    </div>
);

export default App;
