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
    getPolylineSvg,
} from 'helpers/activity';
import Button from '../Button';
import css from './ActivityInfo.styl';


const renderDistance = (distance) => {
    const [value, unit] = getDistanceStr(distance);

    return (
        <div className={css.option}>
            <div className={css.optionValue}>
                {value}
                <span className={css.optionValueUnit}>
                    {` ${unit}`}
                </span>
                <div className={css.optionTitle}>
                    общее расстояние
                </div>
            </div>
        </div>
    );
};

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

const renderPolyline = (encodedPolyline) => {
    const polyline = getPolylineSvg(encodedPolyline);
    console.log(polyline);

    return polyline;
};

const renderSvg = (polyline) => {
    // const [width, height, points] = getPolylineSvg(polyline);
    const str = getPolylineSvg(polyline);

    return (
        <div className={css.trackImage} style={{backgroundImage: str}}>
            {/* <svg width={width} height={height}>
                <polyline stroke="red" strokeWidth="2px" fill="none" points={points}/>
            </svg> */}
        </div>
    );
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
    <div
        className={cn(className, css.activityInfo)}
    >
        <div
            className={css.image}
            style={{backgroundImage: getPolylineSvg(summaryPolyline)}}
        />
        <div className={css.activityName}>
            <span className={css.activityNameText}>
                {name}
                <span className={css.activityType}>{` (${getActivityTypeStr(type)})`}</span>
            </span>
        </div>
        <div className={css.params}>
            {
                Boolean(distance) && renderDistance(distance)
            }
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
                Boolean(averageHeartrate) && (
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
                Открыть в Strava
            </Button>
        </div>
    </div>
);

export default ActivityInfo;
