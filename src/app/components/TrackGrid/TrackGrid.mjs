/** @jsx createElement */

import {createElement} from 'react';
import {cn} from 'helpers';
import {getPaseBySpeed} from 'helpers/track';
import OutlineText from '../OutlineText';
import css from './TrackGrid.styl';


const getValue = ({maxValue, id}, part) => {
    if (id === 'speed') {
        const [minutes, seconds] = getPaseBySpeed(maxValue * part);

        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds} мин/км`;
    }

    return `${Math.round(maxValue * part)} уд/мин`;
};

const renderValue = ({id, color}, value) => (
    <div
        key={id}
        className={css.value}
    >
        <OutlineText
            style={{
                color,
                outlineColor: '#f0f0f0',
                fontSize: 14,
                lineHeight: 20,
            }}
            text={`${value}`}
        />
    </div>
);

const renderGrids = (gridCount, lines, height) => {
    const grids = [];
    let counter = 1;

    while (counter <= gridCount) {
        const part = counter / gridCount;
        const bottom = Math.round(height * part);
        const values = lines.map(line => getValue(line, part));

        grids.push(
            <div
                className={css.line}
                style={{bottom}}
                key={counter}
            >
                {
                    lines.map((line, index) => renderValue(line, values[index]))
                }
            </div>,
        );

        counter++;
    }

    return grids;
};

const TrackGrid = ({className, width, height, lines, gridCount}) => (
    <div
        className={cn(className, css.grid)}
        style={{width, height}}
    >
        {
            renderGrids(gridCount, lines, height)
        }
    </div>
);

export default TrackGrid;
