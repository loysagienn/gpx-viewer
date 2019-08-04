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

    return (
        <div className={css.option}>
            <div className={css.optionValue}>
                {getSpeedStr(speed)}
                <span className={css.optionValueUnit}>
                    {' км/ч'}
                </span>
            </div>
            <div className={css.optionTitle}>
                средняя скорость
            </div>
        </div>
    );
};

const renderPace = (speed) => {
    if (!speed) {
        return null;
    }

    // return (<div>{`Средний темп: ${getPaseStr(speed)} мин/км`}</div>);
    return (
        <div className={css.option}>
            <div className={css.optionValue}>
                {`${getPaseStr(speed)}`}
                <span className={css.optionValueUnit}>
                    {' мин/км'}
                </span>
            </div>
            <div className={css.optionTitle}>
                средний темп
            </div>
        </div>
    );
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

const ActivityInfo = ({
    id,
    name,
    distance,
    className,
    elapsedTime,
    movingTime,
    averageHeartrate,
    type,
    averageSpeed,
    totalElevationGain,
    map: {summaryPolyline},
}) => (
    <div className={className}>
        <div className={css.activityName}>
            {name}
            <span className={css.activityType}>{` (${getActivityTypeStr(type)})`}</span>
        </div>
        <div className={css.params}>
            <div className={css.option}>
                <div className={css.optionValue}>
                    {getDistanceStr(distance)}
                </div>
                <div className={css.optionTitle}>
                    общее расстояние
                </div>
            </div>
            {
                type === 'Ride' ? renderSpeed(averageSpeed) : renderPace(averageSpeed)
            }
            <div className={css.option}>
                <div className={css.optionValue}>
                    {getTimeStr(elapsedTime)}
                </div>
                <div className={css.optionTitle}>
                    общее время
                </div>
            </div>
            <div className={css.option}>
                <div className={css.optionValue}>
                    {getTimeStr(movingTime)}
                </div>
                <div className={css.optionTitle}>
                    время в движении
                </div>
            </div>
            {
                Boolean(totalElevationGain) && (
                    <div className={css.option}>
                        <div className={css.optionValue}>
                            {getHeartrateStr(averageHeartrate)}
                        </div>
                        <div className={css.optionTitle}>
                            средний пульс
                        </div>
                    </div>
                )
            }
            {
                Boolean(totalElevationGain) && (
                    <div className={css.option}>
                        <div className={css.optionValue}>
                            {totalElevationGain}
                            <span className={css.optionValueUnit}>
                                {' метров'}
                            </span>
                        </div>
                        <div className={css.optionTitle}>
                            общий набор высоты
                        </div>
                    </div>
                )
            }
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

export default ActivityInfo;
