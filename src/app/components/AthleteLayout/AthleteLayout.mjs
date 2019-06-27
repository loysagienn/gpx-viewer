/** @jsx createElement */

import {createElement} from 'react';
import Calendar from '../Calendar';
import AthleteHeader from '../AthleteHeader';
import css from './AthleteLayout.styl';


const AthleteLayout = () => (
    <div
        className={css.athleteLayout}
    >
        <AthleteHeader />

        <div className={css.calendar}>
            <Calendar />
        </div>
    </div>
);

export default AthleteLayout;
