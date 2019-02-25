/** @jsx createElement */

import {createElement, Component, createRef} from 'react';
import css from './TrackChart.styl';
import {cn} from '../../../helpers';
import {prepareSvgData} from './helpers';


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
        const points = prepareSvgData(track)
            .map(({timePart, pase}) => `${timePart * svgWidth},${(pase / 10) * svgHeight}`)
            .join(' ');

        return (
            <div
                className={cn(css.trackChart, className)}
                ref={this.chartRef}
            >
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={css.svg}>
                    <polyline
                        points={points}
                    />
                </svg>
            </div>
        );
    }
}

export default TrackChart;
