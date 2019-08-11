/** @jsx createElement */

import {createElement} from 'react';
import {ROUTES_IDS} from 'router';
import Calendar from '../Calendar';
import Activity from '../Activity';
import AthleteHeader from '../AthleteHeader';
import css from './AthleteLayout.styl';


const AthleteLayout = ({route}) => (
    <div
        className={css.athleteLayout}
    >
        <AthleteHeader />

        <div className={css.content}>
            {
                route.id === ROUTES_IDS.INDEX && <Calendar />
            }
            {
                route.id === ROUTES_IDS.ACTIVITY && <Activity />
            }
        </div>
    </div>
);

export default AthleteLayout;
