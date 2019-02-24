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
            props: {map: {Map}},
            mapRef: {current: node},
        } = this;

        this.map = new Map(node, {
            center: [55.76, 37.64],
            zoom: 10,
        });
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
