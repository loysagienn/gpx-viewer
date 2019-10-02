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
    getPolylineMapUrl,
} from 'helpers/activity';
import Button from '../Button';
import OutlineText, {OutlineTextGroup} from '../OutlineText';
import css from './ActivityInfo.styl';


const renderOption = (desc, value, unit) => (
    <div className={css.option}>
        <OutlineTextGroup className={css.optionValue}>
            <OutlineText
                style={{
                    color: '#202020',
                    outlineColor: '#ffffff',
                    fontSize: 40,
                    lineHeight: 50,
                    fontWeight: 300,
                }}
                text={value}
            />
            {
                unit && (
                    <OutlineText
                        style={{
                            color: '#202020',
                            outlineColor: '#ffffff',
                            fontSize: 14,
                            lineHeight: 33,
                        }}
                        text={unit}
                    />
                )
            }
        </OutlineTextGroup>

        <div className={css.optionTitle}>
            <OutlineText
                style={{
                    color: '#202020',
                    outlineColor: '#ffffff',
                    fontSize: 12,
                    lineHeight: 15,
                }}
                text={desc}
            />
        </div>

        {/* <div className={css.optionTitle}>
            {desc}
        </div> */}
    </div>
);

const renderDistance = (distance) => {
    const [value, unit] = getDistanceStr(distance);

    return renderOption('общее расстояние', value, ` ${unit}`);
};

const renderSpeed = (speed) => {
    if (!speed) return null;

    return renderOption('средняя скорость', getSpeedStr(speed), ' км/ч');
};

const renderPace = (speed) => {
    if (!speed) {
        return null;
    }

    return renderOption('средний темп', getPaseStr(speed), ' мин/км');
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
    showActivity,
}) => (
    <div
        className={cn(className, css.activityInfo)}
    >
        <div
            className={css.image}
            style={{backgroundImage: `url(${getPolylineMapUrl(summaryPolyline)})`}}
        />
        <OutlineTextGroup>
            <OutlineText
                style={{
                    color: '#000000',
                    outlineColor: '#ffffff',
                    fontSize: 18,
                    lineHeight: 21,
                }}
                text={name}
            />
            <OutlineText
                style={{
                    color: '#000000',
                    outlineColor: '#ffffff',
                    fontSize: 14,
                    lineHeight: 17,
                }}
                text={` (${getActivityTypeStr(type)})`}
            />
        </OutlineTextGroup>

        <div className={css.params}>
            {
                Boolean(distance) && renderDistance(distance)
            }
            {
                type === 'Ride' ? renderSpeed(averageSpeed) : renderPace(averageSpeed)
            }
            {
                renderOption('общее время', getTimeStr(elapsedTime))
            }
            {
                renderOption('время в движении', getTimeStr(movingTime))
            }
            {
                Boolean(averageHeartrate) && renderOption('средний пульс', getHeartrateStr(averageHeartrate))
            }
            {
                Boolean(totalElevationGain) && renderOption('общий набор высоты', totalElevationGain, ' метров')
            }
        </div>

        <div className={css.buttons}>
            <Button
                className={css.activityBtn}
                onClick={showActivity}
                size="s"
                theme="action"
            >
                Подробнее
            </Button>
            <Button
                href={`https://www.strava.com/activities/${id}`}
                target="_blank"
                size="s"
                theme="strava"
            >
                Открыть в Strava
            </Button>
        </div>
    </div>
);

export default ActivityInfo;
