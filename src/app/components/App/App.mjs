/** @jsx createElement */

import {createElement} from 'react';
import css from './App.styl';
import TrackMap from '../TrackMap';

const App = () => (
    <div className={css.app}>
        <TrackMap className={css.trackMap}/>
    </div>
);

export default App;
