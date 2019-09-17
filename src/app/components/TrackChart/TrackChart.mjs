/** @jsx createElement */

import {createElement, Component, createRef, Fragment} from 'react';
import {cn, memoize} from 'helpers';
import {addWindowEvent, removeWindowEvent} from 'env';
import {compressValues} from 'helpers/track';
import css from './TrackChart.styl';
import TrackLines from '../TrackLines';
import TrackGrid from '../TrackGrid';


const calcLines = memoize((speed, heartrate, width) => {
    const lines = [];

    if (speed) {
        const speedValues = compressValues(speed, width);
        const maxValue = Math.ceil(Math.max(...speedValues));

        lines.push({
            id: 'speed',
            values: speedValues,
            color: '#0000ee',
            unit: 'м/с',
            maxValue,
        });
    }

    if (heartrate) {
        const heartrateValues = compressValues(heartrate, width);
        const maxValue = Math.ceil(Math.max(...heartrateValues) / 20) * 20;

        lines.push({
            id: 'heartrate',
            values: heartrateValues,
            color: '#ee0000',
            unit: 'уд/мин',
            maxValue,
        });
    }

    return lines;
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

        this.lines = calcLines(speed, heartrate, width);
    }

    onResize = () => {
        this.calcLines();
        this.forceUpdate();
    }

    renderContent() {
        if (!this.initialized) {
            return null;
        }

        const {width, height, lines} = this;

        this.calcLines();

        return createElement(Fragment, null,
            createElement(TrackLines, {width, height, lines, className: css.trackLines}),
            createElement(TrackGrid, {width, height, lines, gridCount: 4, className: css.trackGrid}),
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
