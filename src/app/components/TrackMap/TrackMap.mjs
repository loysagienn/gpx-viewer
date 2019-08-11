/** @jsx createElement */

import {createElement, Component, createRef} from 'react';
import {calculateBounds} from 'helpers/activity';
import css from './TrackMap.styl';
import {cn} from '../../../helpers';

class TrackMap extends Component {
    constructor(props) {
        super(props);

        this.mapRef = createRef();
    }

    componentDidMount() {
        const {
            props: {
                map: {Map, Polyline},
                polylinePoints,
            },
            mapRef: {current: node},
        } = this;

        const bounds = calculateBounds(polylinePoints);

        this.map = new Map(node, {bounds});

        const trackLine = new Polyline(
            polylinePoints,
            {},
            {
                strokeWidth: 3,
                strokeOpacity: 0.8,
                strokeColor: '#ff0000',
            },
        );

        this.map.geoObjects.add(trackLine);
    }

    render() {
        const {className} = this.props;

        return (
            <div
                className={cn(css.trackMap, className)}
                ref={this.mapRef}
            />
        );
    }
}

export default TrackMap;
