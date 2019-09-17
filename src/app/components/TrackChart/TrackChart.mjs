/** @jsx createElement */

import {createElement, Component, createRef, Fragment} from 'react';
import {cn, memoize} from 'helpers';
import {getSpeedByPase, compressValues, getPaseBySpeed} from 'helpers/track';
import {addWindowEvent, removeWindowEvent} from 'env';
import css from './TrackChart.styl';
import TrackLines from '../TrackLines';
import TrackGrid from '../TrackGrid';


const getMaxSpeed = (maxValue) => {
    let minutes = 20;
    let speed = getSpeedByPase([minutes, 0]);

    while (speed < maxValue) {
        minutes--;
        speed = getSpeedByPase([minutes, 0]);
    }

    return speed;
};

const getGridCountByMinutes = (minutes) => {
    switch (minutes) {
    case 1:
    case 2:
    case 3:
        return 4;

    case 4:
        return 3;

    default:
        return 4;
    }
};

const calcLines = memoize((speed, heartrate, width) => {
    const lines = [];
    let minutes;

    if (speed) {
        const speedValues = compressValues(speed, width);
        const maxValue = getMaxSpeed(Math.max(...speedValues));
        [minutes] = getPaseBySpeed(maxValue);

        lines.push({
            id: 'speed',
            values: speedValues,
            color: '#0000ee',
            maxValue,
        });
    }

    const gridCount = getGridCountByMinutes(minutes);

    if (heartrate) {
        const heartrateValues = compressValues(heartrate, width);
        const maxValue = Math.ceil(Math.max(...heartrateValues) / 20) * 20;

        lines.push({
            id: 'heartrate',
            values: heartrateValues,
            color: '#ee0000',
            maxValue,
        });
    }

    return [gridCount, lines];
});

class TrackChart extends Component {
    constructor(props) {
        super(props);

        this.chartRef = createRef();

        this.lines = null;
        this.initialized = false;
    }

    componentDidMount() {
        this.calcLines();

        this.initialized = true;

        this.forceUpdate();

        addWindowEvent('resize', this.onResize);
    }

    componentWillUnmount() {
        removeWindowEvent('resize', this.onResize);
    }

    calcLines() {
        const {width, props} = this;

        const {speed, heartrate} = props.track;

        const [gridCount, lines] = calcLines(speed, heartrate, width);

        this.lines = lines;
        this.gridCount = gridCount;
    }

    onResize = () => {
        this.calcLines();
        this.forceUpdate();
    }

    renderContent() {
        if (!this.initialized) {
            return null;
        }

        this.calcLines();

        const {width, height, lines, gridCount} = this;

        return createElement(Fragment, null,
            createElement(TrackLines, {width, height, lines, className: css.trackLines}),
            createElement(TrackGrid, {width, height, lines, gridCount, className: css.trackGrid}),
        );
    }

    render() {
        const {className} = this.props;

        return (
            <div
                className={cn(css.trackChart, className)}
                ref={this.chartRef}
            >
                {
                    this.renderContent()
                }
            </div>
        );
    }

    get width() {
        return this.chartRef.current.offsetWidth;
    }

    get height() {
        return this.chartRef.current.offsetHeight;
    }
}

export default TrackChart;
