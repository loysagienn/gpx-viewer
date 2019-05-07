/** @jsx createElement */

import {createElement} from 'react';
import {cn} from 'helpers';
import Text from '../Text';
import {SvgTimer, SvgDistance} from '../Svg';
import Calendar from '../Calendar';
import css from './AthleteLayout.styl';


const renderDistance = (distance) => {
    distance = Math.round(distance);

    if (distance < 1000) {
        return `${distance} метров`;
    }

    const val = Math.round(distance / 10) / 100;

    return `${val} км`;
};

const renderTime = (time) => {
    const totalTimeInSeconds = Math.round(time);

    const seconds = totalTimeInSeconds % 60;

    const leftTimeInMinutes = Math.round((time - seconds) / 60);

    const minutes = leftTimeInMinutes % 60;

    const hours = Math.round((leftTimeInMinutes - minutes) / 60);

    const totalStr = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

    if (!hours) {
        return totalStr;
    }

    return `${hours}:${totalStr}`;
};


const renderActivity = ({name, id, distance, elapsedTime}) => (
    <a
        href={`https://www.strava.com/activities/${id}`}
        className={css.activity}
        key={id}
    >
        <div className={css.activityInner}>
            <div className={css.activityName}>{ name }</div>
            <div className={css.activityDistance}>
                {renderDistance(distance)}
            </div>
            <div className={css.activityTime}>
                {renderTime(elapsedTime)}
            </div>
        </div>
    </a>
);

const Header = ({athleteInfo}) => (
    <div className={css.header}>
        <div className={css.headerInner}>
            <div className={css.leftButtons}/>
            <div className={css.rightButtons}>
                <div className={css.headerButton}>
                    {
                        athleteInfo.username
                    }
                </div>
            </div>
        </div>
    </div>
);

const ActitityList = ({activities}) => (
    <div className={css.activities}>
        <Text size="2" className={css.title}>Последние 10 активностей</Text>
        {
            activities.map(renderActivity)
        }
    </div>
);

const AthleteLayout = ({athleteInfo, activities}) => (
    <div
        className={css.athleteLayout}
    >
        <Header athleteInfo={athleteInfo}/>
        {/* <ActitityList activities={activities}/> */}
        <div className={css.calendar}>
            <Calendar />
        </div>
    </div>
);

export default AthleteLayout;
