/** @jsx createElement */

import {createElement} from 'react';
import {cn} from 'helpers';
import {
    getTimeStr,
    getDistanceStr,
    getHeartrateStr,
    getActivityTypeStr,
    getSpeedStr,
    getPaseStr,
    decodePolyline,
} from 'helpers/activity';
import Button from '../Button';
import css from './ActivityInfo.styl';


const renderSpeed = (speed) => {
    if (!speed) return null;

    return (<div>{`Средняя скорость: ${getSpeedStr(speed)}`}</div>);
};

const renderPace = (speed) => {
    if (!speed) {
        return null;
    }

    return (<div>{`Средний темп: ${getPaseStr(speed)} мин/км`}</div>);
};

const renderElevationGain = (elevationGain) => {
    if (!elevationGain) return null;

    return (<div>{`Общий набор высоты: ${elevationGain} метров`}</div>);
};

const renderPolyline = (encodedPolyline) => {
    console.log(encodedPolyline);
    const polyline = decodePolyline(encodedPolyline);
    console.log(polyline);

    return null;
};

const Modal = ({
    id,
    name,
    distance,
    elapsedTime,
    movingTime,
    averageHeartrate,
    type,
    averageSpeed,
    totalElevationGain,
    map: {summaryPolyline},
}) => (
    <div className={css.activityInfo}>
        <div className={css.activityName}>
            {name}
            <span className={css.activityType}>{` (${getActivityTypeStr(type)})`}</span>
        </div>

        <div className={css.activityParams}>
            <div>
                {`Общее расстояние: ${getDistanceStr(distance)}`}
            </div>
            <div>
                {`Общее время: ${getTimeStr(elapsedTime)}`}
            </div>
            <div>
                {`Время в движении: ${getTimeStr(movingTime)}`}
            </div>
            {
                averageHeartrate && (<div>{`Средний пульс: ${getHeartrateStr(averageHeartrate)}`}</div>)
            }
            {type === 'Ride' ? renderSpeed(averageSpeed) : renderPace(averageSpeed)}
            {renderElevationGain(totalElevationGain)}
        </div>

        <div className={css.buttons}>
            <Button
                href={`https://www.strava.com/activities/${id}`}
                target="_blank"
                size="s"
            >
                Посмотреть в Strava
            </Button>
        </div>
    </div>
);

export default Modal;
