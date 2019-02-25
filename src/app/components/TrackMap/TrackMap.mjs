/** @jsx createElement */

import {createElement, Component, createRef} from 'react';
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
                gpxContent: {track},
            },
            mapRef: {current: node},
        } = this;

        const [{lat: startLat, lon: startLon}] = track;

        this.map = new Map(node, {
            center: [startLat, startLon],
            zoom: 14,
        });

        const trackLine = new Polyline(
            track.map(({lat, lon}) => ([lat, lon])),
            {},
            {
                strokeWidth: 3,
                strokeOpacity: 0.8,
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
