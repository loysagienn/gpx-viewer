/** @jsx createElement */

import {createElement} from 'react';
import {cn} from 'helpers';
import css from './TrackGrid.styl';


const getValue = ({maxValue}, part) => Math.round(maxValue * part);

const renderValue = ({id, unit, color}, value) => (
    <div
        key={id}
        className={css.value}
        style={{color}}
    >
        {
            `${value} ${unit}`
        }
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
