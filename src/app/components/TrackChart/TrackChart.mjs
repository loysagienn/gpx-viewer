/** @jsx createElement */

import {createElement, Component, createRef} from 'react';
import css from './TrackChart.styl';
import {cn} from '../../../helpers';
import getTrackMetrics from './helpers/getTrackMetrics';
import getPolylinePoints from './helpers/getPolylinePoints';


class TrackChart extends Component {
    constructor(props) {
        super(props);

        this.chartRef = createRef();
    }

    componentDidMount() {
    }

    render() {
        const {className, track} = this.props;
        const svgWidth = 1000;
        const svgHeight = 300;
        const trackMetrics = getTrackMetrics(track);
        const polylinePoints = getPolylinePoints(trackMetrics, svgWidth, svgHeight);

        return (
            <div
                className={cn(css.trackChart, className)}
                ref={this.chartRef}
            >
                <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className={css.svg}
                >
                    <polyline
                        points={polylinePoints}
                    />
                </svg>
            </div>
        );
    }
}

export default TrackChart;
