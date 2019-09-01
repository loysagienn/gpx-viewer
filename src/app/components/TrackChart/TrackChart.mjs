/** @jsx createElement */

import {createElement, Component, createRef} from 'react';
import {cn} from 'helpers';
import {compressValues} from 'helpers/track';
import css from './TrackChart.styl';
import TrackLines from '../TrackLines';


class TrackChart extends Component {
    constructor(props) {
        super(props);

        this.chartRef = createRef();

        this.lines = null;
    }

    componentDidMount() {
        this.updateLines();
        this.forceUpdate();
    }

    updateLines() {
        const {offsetWidth: width} = this.chartRef.current;

        const {speed, heartrate} = this.props.track;

        const lines = [];

        if (speed) {
            const speedValues = compressValues(speed, width);
            const maxValue = Math.max(...speedValues);

            lines.push({
                values: speedValues,
                color: '#0000ff',
                maxValue,
            });
        }

        if (heartrate) {
            const heartrateValues = compressValues(heartrate, width);
            const maxValue = Math.max(...heartrateValues);

            lines.push({
                values: heartrateValues,
                color: '#ff0000',
                maxValue,
            });
        }

        this.lines = lines;
    }

    renderContent() {
        if (!this.lines) {
            return null;
        }

        this.updateLines();

        return (
            <TrackLines
                className={css.trackLines}
                lines={this.lines}
            />
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
}

export default TrackChart;
