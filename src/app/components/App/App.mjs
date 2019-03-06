/** @jsx createElement */

import {createElement} from 'react';
import css from './App.styl';
import AppContent from './AppContent';

const App = () => (
    <div className={css.app}>
        <AppContent/>
    </div>
);

export default App;
